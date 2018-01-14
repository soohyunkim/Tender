$( document ).ready(function() {
	console.log("js file is working");
});


$("#button").click(function() {
	console.log("continue click working");
	var category = null;
	if ($("#restaurants-button").is(':checked')) {
		category = "restaurants";
	} else if ($("#bars-button").is(':checked')) {
		category = "bars";
	} else if ($("#cafes-button").is(':checked')) {
		category = "cafes";
	} else if ($("desserts-button").is(':checked')) {
		category = "desserts";
	}	

	var mDistance = 0;
	if ($("#one-km-button").is(':checked')) {
		mDistance = 1000;
	} else if ($("#two-km-button").is(':checked')) {
		mDistance = 2000;
	} else if ($("#five-km-button").is(':checked')) {
		mDistance = 5000;
	} else if ($("#ten-km-button").is(':checked')) {
		mDistance = 10000;
	} else if ($("#thirty-km-button").is(':checked')) {
		mDistance = 30000;
	}

	var priceOne = $("#price-one-button").is(':checked');
	var priceTwo = $("#price-two-button").is(':checked');
	var priceThree = $("#price-three-button").is(':checked');
	var priceFour = $("#price-four-button").is(':checked');

	var priceString = "";
	if (priceOne) {
		priceString += "1";
	}
	if (priceTwo) {
		if (priceString.length > 0) {
			priceString += ", ";
		}
		priceString += "2";
	}
	if (priceThree) {
		if (priceString.length > 0) {
			priceString += ", ";
		}
		priceString += "3";
	}
	if (priceFour) {
		if (priceString.length > 0) {
			priceString += ", ";
		}
		priceString += "4";
	}

	var params =
		"event_id" + 123 +
		"&categories=" + category +
		"&radius=" + mDistance +
		"&location=" + "UBC%2C+Vancouver%2C+British+Columbia" +
		"&limit=" + 15 +
		"&open_at=" + 1515888889;
	if (priceString.length > 0) {
		params += "&price=" + priceString;
	}

	var http = new XMLHttpRequest();
	var url = "http://127.0.0.1:5000/options?"+ params;
	http.open("POST", url, false);
	http.send();

	console.log(params);
	//post with post object here
});
