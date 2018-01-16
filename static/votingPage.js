/**
 * Created by sherryuan on 2018-01-14.
 */
$(document).ready(function () {
    console.log("votingPage.js file is working");

    var event_id = document.getElementById("event_id").innerHTML;
    var user_email = document.getElementById("user_email").innerHTML;

    var url = "http://127.0.0.1:5000/detail/vote?event_id=" + event_id + "&user_email=" + user_email;
    var http = new XMLHttpRequest();
    http.onload = function () {
        populate_page(event_id, user_email, http.response);
    };
    http.open("GET", url, false);
    http.send();
    console.log("Made the http request");
});

function populate_page(event_id, user_email, restaurant_details_json) {
    console.log("In populate_page");
    restaurant_details = JSON.parse(restaurant_details_json);
    console.log(restaurant_details_json);
    if (restaurant_details["restaurant"]["valid"]) {
        document.getElementById("restaurant_name").innerHTML = restaurant_details["restaurant"]["name"];
        document.getElementById("img1").src = restaurant_details["restaurant"]["photos"][0];
        document.getElementById("img2").src = restaurant_details["restaurant"]["photos"][1];
        document.getElementById("img3").src = restaurant_details["restaurant"]["photos"][2];
    }
    else {
        window.location.href = "/event?event_id=" + event_id + "&user_email=" + user_email;
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