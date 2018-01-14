/**
 * Created by sherryuan on 2018-01-14.
 */
$(document).ready(function () {
    console.log("votingPage.js file is working");

    var event_id = $("#event_id");
    var user_email = $("#user_email");

    var url = "http://127.0.0.1:5000//detail/event?event_id=" + event_id;
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

});
