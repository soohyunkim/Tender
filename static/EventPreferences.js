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

	var kmDistance = 0;
	if ($("#one-km-button").is(':checked')) {
		kmDistance = 1;
	} else if ($("#two-km-button").is(':checked')) {
		kmDistance = 2;
	} else if ($("#five-km-button").is(':checked')) {
		kmDistance = 5;
	} else if ($("#ten-km-button").is(':checked')) {
		kmDistance = 10;
	} else if ($("#thirty-km-button").is(':checked')) {
		kmDistance = 30;
	}

	var priceOne = $("#price-one-button").is(':checked');
	var priceTwo = $("#price-two-button").is(':checked');
	var priceThree = $("#price-three-button").is(':checked');
	var priceFour = $("#price-four-button").is(':checked');
	var priceFive = $("#price-five-button").is(':checked');

	var dateAndTime = Date.parse($("#date-input").val())/1000;
	
	var postObj = {"category": category, "distance": kmDistance, "priceOne": priceOne, "priceTwo": priceTwo, "priceThree": priceThree, "priceFour": priceFour, "priceFive": priceFive,
	"dateAndTime":dateAndTime};
	console.log(postObj);
	//post with post object here
});
