from flask import Flask, abort, request, render_template, Response, redirect, url_for
import urllib.parse
import urllib.request
import json
import pyrebase
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

config = {
  "apiKey": "AIzaSyCuqbzhR4xHDP1L5sun9JZe57Jpndu72j8",
  "authDomain": "weeatruffles.firebaseapp.com",
  "databaseURL": "https://weeatruffles.firebaseio.com",
  "storageBucket": "weeatruffles.appspot.com",
  "serviceAccount": "static/WeEatRuffles-bfa3023c5afe.json"
}

firebase = pyrebase.initialize_app(config)
database = firebase.database()

auth = firebase.auth()
# authenticate a user
user = auth.sign_in_with_email_and_password("user@user.com", "useruser")

# GET here to retrieve the main landing page
@app.route('/')
def index():
    return render_template('index.html')


# GET here to retrieve the create-event options page,
# POST here to create a new event
@app.route('/options', methods=['GET', 'POST'])
def options():
    if request.method == 'GET':
        return render_template('EventPreferencesForm.html'), 200
    if request.method == 'POST':
        # parse emails from JSON
        emails = request.get_json()['emails']
        # parse out parameters from POST request
        event_id = request.args.get("event_id")
        location = request.args.get("location")
        radius = request.args.get("radius")
        categories = request.args.get("categories")
        limit = request.args.get("limit")
        price = request.args.get("price")
        open_at = request.args.get("open_at")

        params = urllib.parse.urlencode({'location': location, 'radius': radius, 'categories': categories, 'limit': limit, 'price': price, 'open_at': open_at})

        # make GET request to Yelp API using parameters
        url = urllib.request.Request("https://api.yelp.com/v3/businesses/search?%s" % params)
        url.add_header('Authorization', 'Bearer hJ9D0lMCziUpj-OSDaiqXc2noXKoPylRe76MsfN63jj60RSJzHMf-Fegf_rJOLQ_eN1zebXB-3E7aO0ZLTx8aeYTnqfr8halD7Te8PES9OD8_9CTWsLhPDy9a6JaWnYx')
        json_response = json.loads(urllib.request.urlopen(url).read())

        restaurants = json_response["businesses"]
        for restaurant in restaurants:
            votes_data = {"votes": 0}
            database.child(event_id).child("restaurants").child(restaurant["id"]).set(votes_data)

        for email in emails:
            local_part = email.split('@')[0]
            domain = email.split('@')[1]
            email_data = {"domain": domain}
            database.child(event_id).child("emails").child(local_part).set(email_data)
            for restaurant in restaurants:
                restaurant_data = {restaurant["id"]: True}
                database.child(event_id).child("emails").child(local_part).push(restaurant_data)

        # add event to Firebase
        database.child(event_id).child("location").set(location)
        database.child(event_id).child("radius").set(radius)
        database.child(event_id).child("categories").set(categories)
        database.child(event_id).child("limit").set(limit)
        database.child(event_id).child("price").set(price)
        database.child(event_id).child("open_at").set(open_at)

        emails= []
        send_event_id_email(event_id, emails)
        return Response(status=200, mimetype='application/json')
    abort(405)


# GET here to retrieve voting page,
# POST here to submit votes
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    if request.method == 'POST':
        # parse out parameters from POST request
        user_email = request.args.get("user_email")
        restaurant_id = request.args.get("restaurant_id")
        approval = request.args.get("approval")
        event_id = request.args.get("event_id")

        prev_vote = database.child(event_id).child("restaurants").child(restaurant_id).child("votes").get(user['idToken']).val()

        if approval == "true":
            vote = 1
        else:
            vote = 0


# remove restaurant_id from user...
        database.child(event_id).child("restaurants").child(restaurant_id).child("votes").set(prev_vote + vote)

    if request.method == 'GET':
        return render_template('votingPage.html'), 200
        # return voting status, for every restaurant
    abort(405)


# GET here to retrieve event page
@app.route('/event')
def event():
    event_id = request.args.get("event_id")
    event_details = database.child(event_id).get(user['idToken']).val()
    if hasattr(event_details, "winner"):
        return render_template('ConfirmedEventPage.html')
    else:
        return render_template('votingPage.html')
    abort(405)


# GET here to retrieve voting details
@app.route('/detail/vote')
def detail_vote():
    # return list of resto_id, and valid
    # return json representing votes
    if request.method == 'GET':
        event_id = request.args.get("event_id")
        return json.dumps(database.child(event_id).child("restaurants").get(user['idToken']).val()), 200
    abort(405)


# GET here to retrieve event details
# after voting ends, go through restaurants, return restaurant with most votes
@app.route('/detail/event')
def detail_event():
    event_id = request.args.get("event_id")
    event_details = database.child(event_id).get(user['idToken']).val()

    # if all users no longer have restaurants attached to them, voting has ended
    users = event_details["users"]
    is_voting_finished = True
    for email in users:
        if len(users[email]["restaurants"]) != 0:
            is_voting_finished = False

    if is_voting_finished:
        if hasattr(event_details, "winner"):
            # if winner has already been found, return it
            return json.dumps(event_details["winner"])
        else:
            # if winner hasn't been found yet,
            # loop through restaurants to figure out which restaurant has the most votes,
            # update event on Firebase with winner and return it
            restaurants = event_details["restaurants"]
            current_winner = ""
            current_winner_votes = -1
            for restaurant in restaurants:
                if restaurants[restaurant]["votes"] > current_winner_votes:
                    current_winner = restaurant
                    current_winner_votes = restaurants[restaurant]["votes"]
            database.child(event_id).child("winner").set(current_winner)
            return json.dumps(current_winner)
    else:
        return json.dumps("voting not finished")


# send an email that looks like http://127.0.0.1:5000/event?event_id=123456&email=example@gmail.com
def send_event_id_email(event_id, emails):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("weeatruffles1@gmail.com", "weeatruffles2")

    # server.sendmail("weeattruffles1@gmail.com", "frostyyshadows@gmail.com", event_id_msg_link.as_string())
    for email in emails:
        event_id_msg = "http://127.0.0.1:5000" + "/event?" + "event_id=" + event_id + "&email=" + email
        event_id_msg_link = MIMEText(u'<a href=' + event_id_msg + '>You\'ve been invited to an event!</a>', 'html')
        server.sendmail("weeattruffles1@gmail.com", email, event_id_msg_link.as_string())
    server.quit()
