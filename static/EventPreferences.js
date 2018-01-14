$( document ).ready(function() {
	console.log("about js working");
	$("#aboutProfileImg").hide();
});


$("#continue-button").click(function() {
	console.log("continue click working");
	var category = null;
	if ($("#restaurants-button").val()) {
		category = "restaurants";
	} else if ($("#bars-button").val()) {
		category = "bars";
	} else if ($("#cafes-button").val()) {
		category = "cafes";
	} else if ($("desserts-button").val()) {
		category = "desserts";
	}	

	var kmDistance = 0;
	if ($("#one-km-button").val()) {
		kmDistance = 1;
	} else if ($("#two-km-button").val()) {
		kmDistance = 2;
	} else if ($("#five-km-button").val()) {
		kmDistance = 5;
	} else if ($("#ten-km-button").val()) {
		kmDistance = 10;
	} else if ($("#thirty-km-button").val()) {
		kmDistance = 30;
	}

	var priceOne = $("#price-one-button").val();
	var priceTwo = $("#price-two-button").val();
	var priceThree = $("#price-three-button").val();
	var priceFour = $("#price-four-button").val();
	var priceFive = $("#price-five-button").val();

	var postObj = {"category": category, "distance": kmDistance, "priceOne": priceOne, "priceTwo": priceTwo, "priceThree": priceThree, "priceFour": priceFour, "priceFive": priceFive};

	console.log(postObj);
	//post with post object here
});
