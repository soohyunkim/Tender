/**
 * Created by sherryuan on 2018-01-14.
 */
$(document).ready(function () {
    console.log("votingPage.js file is working");

    var event_id = $("#event_id");
    var user_email = $("#user_email");

    var url = "http://127.0.0.1:5000/detail/event?event_id=" + event_id;
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send();
    http.onload = function () {
        populate_page(event_id, http.response);
    };
});

function populate_page(event_id, event_details) {
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
    var url = "http://127.0.0.1:5000/vote?" + "user_email=" + user_email + "&restaurant_id=" + restaurant_id + "&approval=" + approval + "&event_id=" + event_id;
    var http = new XMLHttpRequest();
    http.open("POST", url, false);
    http.send();
}