$(document).ready(function(){

	function getWeather(coord){
		var lat = coord.latitude,
				long = coord.longitude,
				units = $('select').val(),
				url = 'http://api.openweathermap.org/data/2.5/weather?';
		url = url + 'appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
		url += '&lat='+lat;
		url += '&lon='+long;
		url += '&units='+units;
		$.ajax({
			url:url,
			dataType: 'jsonp',
			success: function(res){
				console.log(res);
				var date = new Date();
				console.log(date.toLocaleTimeString());
				$('.temperature').html(res.main.temp+('&deg;'));
				$('.city').html(res.name);
				$('.description').html(res.weather[0].description);
				$('.tempMax').html('Temp Max: ' + res.main.temp_max + '&deg');
				$('.tempMin').html('Temp Min: ' + res.main.temp_min + '&deg');
				$('.weatherIcon').attr('src', 'icons/' + res.weather[0].icon + '.png');
				console.log(res.weather[0].icon);
				var temp1 = new Date(res.sys.sunrise * 1000);
				var sunRise = temp1.toLocaleTimeString();
				$('.sunrise').html('Sunrise: ' + sunRise);
				var temp2 = new Date(res.sys.sunset * 1000);
				var sunset = temp2.toLocaleTimeString();
				$('.sunset').html('Sunset: ' + sunset);
			}
		});
	}

	function otherWeather(city){
		var url = 'http://api.openweathermap.org/data/2.5/weather?',
				$cityName = $('.cityName').val(),
				units = $('select').val();
				url += 'appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f';
				url += '&q=' + $cityName;
				url += '&units=' + units;
		$.ajax({
			url:url,
			dataType: 'jsonp',
			success: function(res){
				$('.temperature').html(res.main.temp+('&deg;'));
				$('.city').html(res.name);
				$('.description').html(res.weather[0].description);
				$('.tempMax').html('Temp Max: ' + res.main.temp_max + '&deg');
				$('.tempMin').html('Temp Min: ' + res.main.temp_min + '&deg');
				var sunRise = (res.sys.sunrise).toLocaleTimeString();
				$('.sunrise').html('Sunrise: ' + sunRise);
				var sunset = (res.sys.sunset).toLocaleTimeString();
				$('.sunset').html('Sunset: ' + sunset);
			}
		});
	}
	function loadLocation(){
		navigator.geolocation.getCurrentPosition(function(position) {
	  		getWeather(position.coords);
		});
	}

	$('.current').click(loadLocation);

	$('select').on('change', loadLocation);

	loadLocation();

	$('.lookCity').on('submit', function(e, cityName){
		e.preventDefault();
		//get the name of the city
		otherWeather(cityName);
		console.log($('.cityName').val());
	});
});