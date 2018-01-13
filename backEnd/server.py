from flask import Flask, abort

app = Flask(__name__)


# GET here to retrieve the main landing page
@app.route('/')
def index():
    abort(404)


# GET here to retrieve an event,
# POST here to create a new event
@app.route('/event', methods=['GET', 'POST'])
def event():
    abort(404)


# GET here to retrieve voting options,
# POST here to submit votes
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    abort(404)