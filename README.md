# WeEatRuffles

*Note: WeEatRuffles won't be the final name.*

A simple web app that helps you and your friends plan an event by voting on nearby restaurants.

## WeEatRuffles Backend

* Install [Flask](http://flask.pocoo.org): `pip install flask`
* Install [Pyrebase](https://github.com/thisbejim/Pyrebase): `pip install pyrebase`
* Set env variable: `export FLASK_APP=server.py`
* `flask run`

## API

### `/`

GET to retrieve the main landing page.

### `/options`

GET to retrieve the event options page.
POST to create new event.

### `/vote`

GET to retrieve voting page.

### `/event`

GET to retrieve event page.

### `/detail/vote`

GET to retrieve voting details.

### `/detail/event`

GET to retrieve event details.
