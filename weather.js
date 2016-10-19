$(document).ready(function() {
  function getWeather(coords) {
    var lat = coords.latitude,
        lon = coords.longitude,
        units=$('select').val(),
        url = 'http://api.openweathermap.org/data/2.5/weather?';
      console.log(coords);
      url += 'appid=3f6bb064130db59aeba7ff3cf098246a';
      url += '&lat='+lat;
      url += '&lon='+lon;
      url += '&units='+units;
      $.ajax({
        url:url,
        jsonp:'callback',
        dataType:'jsonp',
        success: function(res){
          console.log(res);
          $('.city').html(res.name);
          $('.temperature').html(Math.roud(res.main.temp)+'&deg');
          $('.description').html(res.weather[0].description);
          $('.weatherIcon').attr('src','icons/'+res.weather[0].icon+'.png');
        }
      });
  }

function loadLocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    getWeather(position.coords);
  });
}

$('select').on('change', loadLocation);

loadLocation();

});
