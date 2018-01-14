$( document ).ready(function() {
	console.log("js file is working");
	
	//get thing from firebase here
	var WinningEventJson = httpGet("http://127.0.0.1:5000/detail/event");
	
	console.log(winningEventJson);
	
	$("#restaurant-name").text(winningEventJson.name);
	$("#price-range").text(winningEventJson.price);
	$("#restaurant-location").text(winningEventJson.location.display_address);
	$("#event-confirmed-image").attr("src", winningEventJson.photos[1]);
});

function httpGet(theUrl)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}


function getJsonFile() {
	var winningEvent
}


