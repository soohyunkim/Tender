from flask import Flask, abort, request, render_template, redirect, url_for
from firebase import firebase
import urllib
import urllib2
import json

app = Flask(__name__)


# GET here to retrieve the main landing page
@app.route('/')
def index():
    abort(404)


# GET here to retrieve an event,
# POST here to create a new event
@app.route('/event', methods=['GET', 'POST'])
def event():
    if request.method == 'POST':
        # parse out parameters from POST request

        location = request.args.get("location")
        radius = request.args.get("radius")
        categories = request.args.get("categories")
        limit = request.args.get("limit")
        price = request.args.get("price")
        open_at = request.args.get("open_at")

        params = urllib.urlencode({'location': location, 'radius': radius, 'categories': categories, 'limit': limit, 'price': price, 'open_at': open_at})

        # make GET request to Yelp API using parameters
        url = urllib2.Request("https://api.yelp.com/v3/businesses/search?%s" % params)
        url.add_header('Authorization', 'Bearer hJ9D0lMCziUpj-OSDaiqXc2noXKoPylRe76MsfN63jj60RSJzHMf-Fegf_rJOLQ_eN1zebXB-3E7aO0ZLTx8aeYTnqfr8halD7Te8PES9OD8_9CTWsLhPDy9a6JaWnYx')
        json_response = json.loads(urllib2.urlopen(url).read())
        # print(json_response)

        restaurants = json_response["businesses"]
        # add each restaurant to Firebase
        for restaurant in restaurants:
            print(restaurant)
        abort(404)
    if request.method == 'GET':
        abort(404)
    abort(404)


# GET here to retrieve voting options,
# POST here to submit votes
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    abort(404)