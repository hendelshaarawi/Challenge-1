// test.js

// JS for Local Weather App
$( document ).ready(function() {

  var lat; var lon; var desc; var hum; var weatherid;
  var temp = []; var wind = [];

  // Request IP address from user to get location & store coordinates
  $.getJSON("https://ipapi.co/json", function(data) {
    //$("#city").html(data.city);
    lat = data.latitude;
    lon = data.longitude;

    // Get weather information
    // Need to add 'https://cors-anywhere.herokuapp.com/' before URL to have HTTPS using a CORS server
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&APPID=44762e241a2c3fc4f616e416abc08f0e", function(weatherData) {

    $("#city").html(weatherData.name);
    // Store temperates (celsius and fahrenheit)
    temp[0] = (weatherData.main.temp - 273.15).toFixed(0) + "&#176";
    temp[1] = (((weatherData.main.temp - 273.15)*1.8) + 32).toFixed(0) + "&#176";

    // Store description, humidity, and wind
    desc = weatherData.weather[0].description;
    hum = weatherData.main.humidity + '%';

    // Store wind (km/h and mi/h)
    wind[0] = (weatherData.wind.speed * 3.6).toFixed(2) + " km/h";
    wind[1] = (weatherData.wind.speed * 2.23).toFixed(2) + " mi/h";

    // Store weather ID for icons; change icon depending on weather conditions
    weatherid = (weatherData.weather[0].id);

    if (weatherid == 800) {
      $("#currenticon").html('<i class="wi wi-day-sunny"</i>').css({"color": "#FFE14A"});
    };

    var rainIcons = [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
    for (i=0; i<rainIcons.length; i++) {
      if (weatherid == rainIcons[i]) {
        $("#currenticon").html('<i class="wi wi-rain"</i>').css({"color": "#244A69"});
      };
    };

    var stormIcons = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    for (i=0; i<stormIcons.length; i++) {
      if (weatherid == stormIcons[i]) {
        $("#currenticon").html('<i class="wi wi-storm-showers"></i>').css({"color": "#244A69"});
      };
    };

    var cloudIcons = [801, 802, 803, 804];
    for (i=0; i<cloudIcons.length; i++) {
      if (weatherid == cloudIcons[i]) {
        $("#currenticon").html('<i class="wi wi-cloudy"></i>').css({"color": "#C1C1C1"});
      }
    }

    var snowIcons = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622];
    for (i=0; i<snowIcons.length; i++) {
      if (weatherid == snowIcons[i]) {
        $("#currenticon").html('<i class="wi wi-snow"></i>').css({"color": "#FFFFFF"});
      }
    }

    var atmosphereIcons = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    for (i=0; i<atmosphereIcons.length; i++) {
      if (weatherid == atmosphereIcons[i]) {
        $("#currenticon").html('<i class="wi wi-dust"></i>').css({"color": "#C1C1C1"});
      }
    }

    var extremeIcons = [900, 901, 902, 903, 904, 905, 906];
    for (i=0; i<extremeIcons.length; i++) {
      if (weatherid == extremeIcons[i]) {
        $("#currenticon").html('<i class="wi wi-storm-warning"></i>').css({"color": "#FFFFFF"});
      }
    }

    var additionalIcons = [951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 961];
    for (i=0; i<additionalIcons.length; i++) {
      if (weatherid == additionalIcons[i]) {
        $("#currenticon").html('<i class="wi wi-hurricane-warning"></i>').css({"color": "#FFFFFF"});
      }
    }

    // Insert weather info temp
    $("#temp").html(temp[1]);
    $("#desc").html(desc);
    $("#hum").html(hum);
    $("#wind").html(wind[1]);
    });

    // Function to switch between units
    $(".fc").click (function() {
      if ($(".fc").text() === "F") {
        $(".fc").text("C");
        $("#temp").html(temp[0]);
        $("#wind").html(wind[0]);
      }
      else {
        $(".fc").text('F');
        $("#temp").html(temp[1]);
        $("#wind").html(wind[1]);
      }
    });

    // Switch weather icons based on description from API
    var weatherIcons = {
      sunny: ["wi-day-sunny", "#FFE14A"],
      cloudy: ["wi-cloudy", "#C1C1C1"],
      rainy: ["wi-rain", "#33436D"],
      storm: ["wi-storm-showers", "#33436D"],
      snow: ["wi-snow", "#FFFFFF"]
    };


  });
});


// -----TIME-----

var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
    var cd = new Date();
    clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}



//-----WATER-----
var colorInc = 100 / 3;

$(function()
{
  $("#percent-box").click(function()
  {
    $(this).select();
  });
  
  $("#percent-box").keyup(function()
  {
    var val = $(this).val();
    
    if(val != ""
      && !isNaN(val)
      && val <= 100
      && val >= 0)
    {
      console.log(val);
      
      var valOrig = val;
      val = 100 - val;
      
      if(valOrig == 0)
      {
        $("#percent-box").val(0);
        $(".progress .percent").text(0 + "%");
      }
      else $(".progress .percent").text(valOrig + "%");
      
      $(".progress").parent().removeClass();
      $(".progress .water").css("top", val + "%");
      
      if(valOrig < colorInc * 1)
        $(".progress").parent().addClass("red");
      else if(valOrig < colorInc * 2)
        $(".progress").parent().addClass("orange");
      else
        $(".progress").parent().addClass("green");
    }
    else
    {
      $(".progress").parent().removeClass();
      $(".progress").parent().addClass("green");
      $(".progress .water").css("top", 100 - 67 + "%");
      $(".progress .percent").text(67 + "%");
      $("#percent-box").val("");
    }
  });
});




//SPEED

var gauge3 = Gauge(
  document.getElementById("gauge3"), {
    max: 100,
    value: 70
  }
);

(function loop() {
  var value1 = Math.random() * 100,
      value2 = Math.random() * 100,
      value3 = Math.random() * 100,
      value4 = Math.random() * 100,
      value5 = Math.random() * 100;

  // setValueAnimated(value, durationInSecs);
  gauge3.setValueAnimated(70 - value2, 5);

  window.setTimeout(loop, 6000);
})();









//AFSTAND

// Line Chart
// var ctx = document.getElementById('myChart').getContext("2d");

// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ["mon", "tue", "wed", "thu", "fri", "sat"],
//         datasets: [{
//             label: "travelled distance",
//             borderColor: "#56CCF2",
//             pointBorderColor: "#56CCF2",
//             pointBackgroundColor: "#80b6f4",
//             pointHoverBorderColor: "#80b6f4",
//             pointBorderWidth: 3,
//             pointHoverRadius: 3,
//             pointHoverBorderWidth: 1,
//             pointRadius: 3,
//             fill: false,
//             borderWidth: 2,
//             data: [103, 120, 160, 150, 180, 170, 160]
//         }]
//     },
//     options: {
//         legend: {
//             position: "bottom"
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     fontColor: "#1f253d",
//                     beginAtZero: true,
//                     maxTicksLimit: 5,
//                     padding: 20
//                 },
//                 gridLines: {
//                     drawTicks: false,
//                     display: false
//                 }

//             }],
//             xAxes: [{
//                 gridLines: {
//                     zeroLineColor: "transparent"
//                 },
//                 ticks: {
//                     padding: 20,
//                     fontColor: "#1f253d",
//                 }
//             }]
//         }
//     }
// });



//COUNTDOWN

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('Aug 21, 2018 00:00:00').getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerHTML = Math.floor(distance / (day)),
        document.getElementById('hours').innerHTML = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerHTML = Math.floor((distance % (hour)) / (minute))
       
      
      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}

    }, second)


   //BUTTON

$(document).ready(function() {
  $('li a').on('click', function() {
    $(this).toggleClass('active');
  });
});



















