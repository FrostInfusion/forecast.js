var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var user = process.argv.slice(2);
var api_key = "GOOGLEGEOLOCATIONAPIKEY"; //enter your Google Geolocation API key here
var forecast_key ="FORECASTIOAPIKEY" //enter your Forecast.io API key here
//&key=
//LT-76205
var http = require("https");

function printMessage(name) {
var message = "Weather for: " + name;
	console.log(message);
}

function returnLatLng(lat, lng) {
	//Connect to the API URL
	var request = http.get("https://api.forecast.io/forecast/"+forecast_key+"/"+lat+","+lng, function(response){		
		var body = "";		
		response.on('data', function (chunk) {
		body += chunk;
	});
		
			response.on('end', function(){
			if(response.statusCode === 200){
			try {
				//Parse data
			var profile = JSON.parse(body);
				//Print data
			console.log("Forecast: " +profile.currently.summary+", temperature: "+Math.round(((profile.currently.temperature-32)*5/9) * 100) / 100+" °C, " + Math.round((profile.currently.windSpeed*1.609344/3.6)*100)/100+ " m/s wind.")

			} catch(error) {
				//Parse error here
				printError(error);
			}}
			else {
				//status code error
				printError({message: " The was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"})
			}
		});
	});	
};

function printError(error){
	console.error(error.message);
}


	//Connect to the API URL
	var request = http.get(url + user + "&key=" + api_key, function(response){		
		var body = "";		
		response.on('data', function (chunk) {
		body += chunk;
	});
		
		response.on('end', function(){
			if(response.statusCode === 200){
			try {
				//Parse data
			var profile = JSON.parse(body);
				//Print data
			printMessage(profile.results[0].formatted_address);
			returnLatLng(profile.results[0].geometry.location.lat, profile.results[0].geometry.location.lng);
			} catch(error) {
				//Parse error here
				printError(error);
			}}
			else {
				//status code error
				printError({message: " The was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"})
			}
		});
	});
	
	//Conection Error
	request.on('error', printError);		 
