var tempunit = "C";
var windunit = "km/h";

function getWeather(){
	var city = document.getElementById("cityname").value
	
	if (document.getElementById('r1').checked) {
		units = "metric";
		tempunit = "C";
	}else{
		units = "imperial";
		tempunit = "F";		
	}
	
	var requestUrlCurr = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=1740673665b7459316199db1710c5ca3&units=" + units;
	var requestUrl5day = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&APPID=1740673665b7459316199db1710c5ca3&cnt=5&units=" + units;
	var requestUrlHourly = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=1740673665b7459316199db1710c5ca3&cnt=8&units=" + units;
	
	getCurrentWeather(requestUrlCurr);
	getHourlyWeather(requestUrlHourly);
	get5dayWeather(requestUrl5day);
}

function getCurrentWeather(x) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
	  var weatherObj = JSON.parse(this.responseText);
	  
	  document.getElementById("currCondition").innerHTML = weatherObj.weather[0].main;
	  document.getElementById("currTemp").innerHTML = weatherObj.main.temp + " " + tempunit;
	  if(units == "metric"){
		  document.getElementById("currWind").innerHTML = Math.round(weatherObj.wind.speed * 3.6) + " km/h";
	  }else{
		  document.getElementById("currWind").innerHTML = weatherObj.wind.speed + " mph";
	  }
	  
	  document.getElementById("currHumidity").innerHTML = weatherObj.main.humidity;
	  
	  switch(weatherObj.weather[0].main) {
		case "Snow":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/snow.png' alt='snow'>";
		break;
		
		case "Clouds":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/clouds.png' alt='clouds'>";
		break;
		
		case "Thunderstorm":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/thunder.png' alt='thunder'>";
		break;
		
		case "Drizzle":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/drizzle.png' alt='drizzle'>";
		break;
		
		case "Rain":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/rain.png' alt='rain'>";
		break;
		
		case "Clear":
		document.getElementById("iconcurr").innerHTML = "<img src='icons/clear.png' alt='clear'>";
		break;
		
		default:
		document.getElementById("iconcurr").innerHTML = "<img src='icons/na.png' alt='na'>";
	  }
	  
    }
  };
  xhttp.open("get", x, true);
  xhttp.send();
}

function getHourlyWeather(x) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		//document.getElementById("demo").innerHTML = this.responseText;
		var weatherObj = JSON.parse(this.responseText);
		weatherList = weatherObj.list
		
		for (i = 0; i < weatherList.length; i++) { 
			document.getElementById("h" + i).innerHTML = weatherList[i].dt_txt.split(" ")[1].substring(0, 5) + " - " + weatherList[i].main.temp + " " + tempunit;
		}
    }
  };
  xhttp.open("get", x, true);
  xhttp.send();
}

function get5dayWeather(x) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
		var weatherObj = JSON.parse(this.responseText);
		weatherList = weatherObj.list
		
		var d = new Date();
		var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Mon";
		weekday[2] = "Tues";
		weekday[3] = "Wed";
		weekday[4] = "Thur";
		weekday[5] = "Fri";
		weekday[6] = "Sat";
		
		for (i = 0; i < weatherList.length; i++) { 
			document.getElementById("t" + i ).innerHTML = weekday[(d.getDay() + 1 + i)%7];
			document.getElementById("day" + i + "Condition").innerHTML = weatherList[i].weather[0].main;
			document.getElementById("day" + i + "Temp").innerHTML = weatherList[i].temp.day + " " + tempunit;
			
			if(units == "metric"){
				document.getElementById("day" + i + "Wind").innerHTML = Math.round(weatherList[i].speed * 3.6) + " km/h";
			}else{
				document.getElementById("day" + i + "Wind").innerHTML = weatherList[i].speed + " mph";
			}
			document.getElementById("day" + i + "Humidity").innerHTML = weatherList[i].humidity;
			
			switch(weatherList[i].weather[0].main) {
				case "Snow":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/snow.png' alt='snow'>";
				break;
				
				case "Clouds":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/clouds.png' alt='clouds'>";
				break;
				
				case "Thunderstorm":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/thunder.png' alt='thunder'>";
				break;
				
				case "Drizzle":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/drizzle.png' alt='drizzle'>";
				break;
				
				case "Rain":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/rain.png' alt='rain'>";
				break;
				
				case "Clear":
				document.getElementById("icond" + i).innerHTML = "<img src='icons/clear.png' alt='clear'>";
				break;
				
				default:
				document.getElementById("icond" + i).innerHTML = "<img src='icons/na.png' alt='na'>";
			}
			
			
		}
	  
    }
  };
  xhttp.open("get", x, true);
  xhttp.send();
}