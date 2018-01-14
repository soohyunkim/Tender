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

POST format in JSON:
```JSON
{
    "event_name": ...,
    "event_type": ...,
    "date": ...,
    "location": {
        "lat": ...,
        "lon": ...
    },
    "price": {
        "1": ...,
        "2": ...,
        "3": ...,
        "4": ...,
        "5": ...
    },
    "max_distance": ...,
    "emails": [
        ...
    ]
}
```
`event_name` is the user-input name of the event,
`event_type` is a string representing what type of event it is (with the possible values below),
`date` is user-input time and date of the event in Unix epoch time,
`location` is the latitude and longitude of the desired search location,
`price` contains whether certain price levels are desired (true for desired, false for undesired),
where `1` is the cheapest price level and `5` is the most expensive price level,
`max_distance` is the maximum search distance away from `location`,
and `emails` is a list of the invitees' emails.

Possible values for `event_type`:
* TODO

### `/vote`

GET to retrieve voting page.

### `/event`

GET to retrieve event page.

### `/detail/vote`

GET to retrieve voting details.
POST to submit an individual vote.

POST format in JSON:
```JSON
{
    "restaurant_id": ...,
    "approval": ...,
    "user_email": ...
}
```
`restaurant_id` is the restaurant's ID from Yelp,
`approval` is whether the user approves of the restaurant,
and `user_email` is the user's email.

### `/detail/event`

GET to retrieve event details.
