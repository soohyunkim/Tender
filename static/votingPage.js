/**
 * Created by sherryuan on 2018-01-14.
 */
$(document).ready(function () {
    console.log("votingPage.js file is working");

    var event_id = document.getElementById("event_id").innerHTML;
    var user_email = document.getElementById("user_email").innerHTML;

    var url = "http://127.0.0.1:5000/detail/vote?event_id=" + event_id + "&user_email=" + user_email;
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send();
    console.log("Made the http request");
    http.onload = function () {
        //TODO this doesn't seem to actually be called
        populate_page(event_id, http.response);
    };
});

function populate_page(event_id, restaurant_details) {
    console.log("In populate_page");
    if (restaurant_details["valid"]) {
        document.getElementById("restaurant_name").innerHTML = restaurant_details["name"];
    }
    else {
        console.log("Didn't get true");
        //TODO redirect to event page
    }
    var restaurants = event_details[event_id]["restaurants"];
    for (var i = 0; i < restaurants.size; i++) {
    }
}

$("#button").click(function () {
    var http = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/event?" + params;
    http.open("GET", url, false);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify({emails: emails}));

    console.log(params);
    //post with post object here
});

function submit_vote(user_email, restaurant_id, approval, event_id) {
    var url = "http://127.0.0.1:5000/vote?" +
        "user_email=" + user_email +
        "&restaurant_id=" + restaurant_id +
        "&approval=" + approval +
        "&event_id=" + event_id;
    var http = new XMLHttpRequest();
    http.open("POST", url, false);
    http.send();
}