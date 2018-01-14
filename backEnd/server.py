from flask import Flask, abort, request, render_template, redirect, url_for
from firebase import firebase
import urllib
import urllib2

app = Flask(__name__)


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
        response = urllib2.urlopen('https://api.yelp.com/v3/businesses/search?%s' % params).read()
        print(response)
        return
    if request.method == 'GET':
        abort(404)
    abort(404)


# GET here to retrieve voting options,
# POST here to submit votes
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    abort(404)