$( document ).ready(function() {
	console.log("js file is working");
	
	//get thing from firebase here
	var eventDetailsJsonFile = getJsonFile();
	
	//var winningEventId = eventDetailsJsonFile.winner;
	var winningEventId = "blue-martini-jazz-cafe-vancouver"
	
	var winningEventJsonFile = httpGet("https://api.yelp.com/v3/businesses/" + winningEventId);
	console.log(winningEventJsonFile);
	
	$("#restaurant-name").text(winningEventJsonFile.name);
	$("#price-range").text(winningEventJsonFile.price);
	$("#restaurant-location").text(winningEventJsonFile.location.display_address);
	$("#event-confirmed-image").attr("src", winningEventJsonFile.photos[1]);
});


function httpGet(theUrl)
{
	//TODO: uncomment when on server
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
	//var jsonObj = turnTOJson(xmlHttp.responseText);
    return xmlHttp.responseText;
	
	//TODO: remove everything after this when above is uncommented
	/*
	var fakeReturnedObject = {
    "id": "blue-martini-jazz-cafe-vancouver",
    "name": "Blue Martini jazz cafe",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/XoVNUnJUSDl6KvDmKQDrCQ/o.jpg",
    "is_claimed": true,
    "is_closed": false,
    "url": "https://www.yelp.com/biz/blue-martini-jazz-cafe-vancouver?adjust_creative=T8KbPmTQmM59UQrEntAAsg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=T8KbPmTQmM59UQrEntAAsg",
    "phone": "+16044282691",
    "display_phone": "+1 604-428-2691",
    "review_count": 39,
    "categories": [
        {
            "alias": "jazzandblues",
            "title": "Jazz & Blues"
        },
        {
            "alias": "salad",
            "title": "Salad"
        },
        {
            "alias": "soup",
            "title": "Soup"
        }
    ],
    "rating": 3.5,
    "location": {
        "address1": "1516 Yew Street",
        "address2": "",
        "address3": "",
        "city": "Vancouver",
        "zip_code": "V6K 3E4",
        "country": "CA",
        "state": "BC",
        "display_address": [
            "1516 Yew Street",
            "Vancouver, BC V6K 3E4",
            "Canada"
        ],
        "cross_streets": ""
    },
    "coordinates": {
        "latitude": 49.2722947,
        "longitude": -123.1548017
    },
    "photos": [
        "https://s3-media1.fl.yelpcdn.com/bphoto/XoVNUnJUSDl6KvDmKQDrCQ/o.jpg",
        "https://s3-media3.fl.yelpcdn.com/bphoto/e4k5ly0fSJHcTJlOBySIpw/o.jpg",
        "https://s3-media3.fl.yelpcdn.com/bphoto/UGgY2sQNRg26MHZ_r0zobA/o.jpg"
    ],
    "price": "$$$",
    "hours": [
        {
            "open": [
                {
                    "is_overnight": false,
                    "start": "1700",
                    "end": "0000",
                    "day": 1
                },
                {
                    "is_overnight": false,
                    "start": "1700",
                    "end": "0000",
                    "day": 2
                },
                {
                    "is_overnight": false,
                    "start": "1700",
                    "end": "0000",
                    "day": 3
                },
                {
                    "is_overnight": true,
                    "start": "1700",
                    "end": "0100",
                    "day": 4
                },
                {
                    "is_overnight": true,
                    "start": "1700",
                    "end": "0100",
                    "day": 5
                },
                {
                    "is_overnight": false,
                    "start": "1700",
                    "end": "0000",
                    "day": 6
                }
            ],
            "hours_type": "REGULAR",
            "is_open_now": false
        }
    ],
    "transactions": []
};
	return fakeReturnedObject;
	*/
}


function getJsonFile() {
	//TODO: implement this
}


