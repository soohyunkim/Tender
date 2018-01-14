from flask import Flask, abort, request, render_template, redirect, url_for
import urllib.parse
import urllib.request
import json
import pyrebase

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
    if request.method == 'POST':
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
        restaurant_ids = []
        for restaurant in restaurants:
            restaurant_ids.append(restaurant["id"])

        # add event to Firebase
        database.child(event_id).child("restaurants").set(restaurant_ids)
        database.child(event_id).child("location").set(location)
        database.child(event_id).child("radius").set(radius)
        database.child(event_id).child("categories").set(categories)
        database.child(event_id).child("limit").set(limit)
        database.child(event_id).child("price").set(price)
        database.child(event_id).child("open_at").set(open_at)

        # returns json representing restaurants
        #return render_template('TODO.html'), 200
        abort(404)
    abort(404)


# GET here to retrieve voting page,
# POST here to submit votes
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    abort(404)


# GET here to retrieve event page
@app.route('/event')
def event():
    abort(404)


# GET here to retrieve voting details
@app.route('/detail/vote')
def detail_vote():
    if request.method == 'GET':
        event_id = request.args.get("event_id")
        return database.child(event_id).child("restaurants").get(user['idToken']).val(), 200
    abort(404)

# GET here to retrieve event details
# after voting ends, go through restaurants, return restaurant with most votes
@app.route('/detail/event')
def detail_event():
    event_id = request.args.get("event_id")
    event_details = database.child(event_id).get(user['idToken']).val()

    if hasattr(event_details, "winner"):
        return event_details["winner"]
    else:
        restaurants = event_details["restaurants"]
        current_winner = {}
        current_winner_votes = -1
        for restaurant in restaurants:
            if restaurant["votes"] > current_winner_votes:
                current_winner = restaurant
                current_winner_votes = restaurant["votes"]
        database.child(event_id).child("winner").set(current_winner)
        return current_winner
    abort(404)
