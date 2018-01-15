# Tender

Tinder for Food.

A simple web app that helps you and your friends plan an event by voting on nearby restaurants.

## Tender Backend

* `git clone https://github.com/soohyunkim/WeEatRuffles.git`
* `cd WeEatRuffles/`
* Install [virtualenv](https://virtualenv.pypa.io/en/stable/): `pip install virtualenv`
* Create environment: `virtualenv ruffles` (or whatever you want to name it)
* Activate environemnt: `. ruffles/bin/activate`
* Install [Flask](http://flask.pocoo.org): `pip install flask`
* Install [Pyrebase](https://github.com/thisbejim/Pyrebase): `pip install pyrebase`
* Set env variable: `export FLASK_APP=server.py`
* `flask run`
* If it complains about certificates on Mac OS X: `/Applications/Python\ 3.6/Install\ Certificates.command`

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
    "max_choices": ...,
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
`max_choices` is the maximum number of choices the user wants displayed,
`max_distance` is the maximum search distance away from `location`,
and `emails` is a list of the invitees' emails.

Possible values for `event_type`:
* TODO

### `/vote`

GET to retrieve voting page.
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

### `/event`

GET to retrieve event page.

### `/detail/vote`

GET to retrieve voting details.

GET format in JSON:
```JSON
{
    "choices": [
        {
            "restaurant_id": ...,
            "valid": ...
        },
        ...
    ]
}
```
`choices` is a list containing
`restaurant_id`, the Yelp ID of the restaurant to vote for,
and `valid`, whether the user can vote on this restaurant.

### `/detail/event`

GET to retrieve event details.

GET format in JSON:
```JSON
{
    "event_name": ...,
    "event_type": ...,
    "date": ...,
    "restaurant_id": ...
}
```

Sample response:
```JSON
"{event_id: {\"categories\": \"restaurants\", \"limit\": \"15\", \"location\": \"UBC, Vancouver, British Columbia\", \"open_at\": \"1515918240\", \"price\": \"2,3,4\", \"radius\": \"10000\", \"restaurants\": {\"baru-latino-vancouver\": {\"votes\": 0}, \"blue-martini-jazz-cafe-vancouver\": {\"votes\": 5}, \"corduroy-vancouver\": {\"votes\": 0}, \"darbys-pub-vancouver\": {\"votes\": 0}, \"elwoods-vancouver\": {\"votes\": 0}, \"local-public-eatery-vancouver-3\": {\"votes\": 0}, \"lucky-taco-vancouver-2\": {\"votes\": 0}, \"mahony-and-sons-vancouver-4\": {\"votes\": 0}, \"the-cove-neighbourhood-pub-vancouver\": {\"votes\": 0}, \"the-dunbar-public-house-vancouver\": {\"votes\": 0}, \"the-ellis-vancouver-2\": {\"votes\": 0}, \"the-kitchen-table-vancouver\": {\"votes\": 0}, \"the-naam-vancouver-2\": {\"votes\": 0}, \"the-wolf-and-hound-vancouver\": {\"votes\": 0}, \"yaggers-vancouver-3\": {\"votes\": 0}}, \"winner\": \"blue-martini-jazz-cafe-vancouver\"}}"
```
`event_name` is the user-input name of the event,
`event_type` is a string representing what type of event it is (for possible values see above),
`date` is user-input time and date of the event in Unix epoch time,
and `restaurant_id` is the Yelp ID of the most popular restaurant (if empty, voting has not yet concluded).
