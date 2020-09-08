function getNextLaunch() {
  fetch('https://api.spacexdata.com/v4/launches/next').then(response => {
    return response.json();
  }).then(data => {
      //https://www.w3schools.com/howto/howto_js_countdown.asp
      var launchDate = new Date(data.date_utc).getTime();
      var todayDate = new Date().getTime();
      document.getElementById('next-launch-name').innerHTML = "NEXT LAUNCH: " + data.name + " - FLIGHT #" + data.flight_number;

      if (launchDate < todayDate) {
        document.getElementById("next-launch-countdown").innerHTML = 'Date has passed.'
      } else {
        
        setInterval(() => {
          document.getElementById("next-launch-countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
          var now = new Date().getTime();
          var distance = launchDate - now;
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          document.getElementById("next-launch-countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
          console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
          // console.log(data.date_utc);
          console.log(launchDate);
          console.log(todayDate);
        }, 1000);
      }
  }).catch(err => {
    document.getElementById('result').innerHTML = 'Couldnt fetch JSON .. Check console for more information.'
    console.log(err);
  });
}
getNextLaunch();

function getUpcomingLaunches() {
  fetch('https://api.spacexdata.com/v4/launches/upcoming').then(response => {
    return response.json();
  }).then(data => {
  // Remove first entry as this will be the same as the countdown launch
  firstElement = data[0];
  setTimeout(function () {
    document.getElementById('#' + data[0].flight_number).remove();
  }, 10);
for (var value in data) {
  firstElement = data[value].flight_number;
  // Convert ISO date to a more readable format
  var date = new Date(data[value].date_utc);
  convertedDate = date.toDateString()
    document.getElementById('upcoming-launches').insertAdjacentHTML('beforeend', '<div class="card" id="#' + data[value].flight_number + '"><div style="overflow: left;"><h1>' + data[value].name + ' - FLIGHT #' + data[value].flight_number + '</h1><br><div class="card-container"><div class="left"><p class="">LAUNCH STATUS: <span id="status-header' + data[value].flight_number + '"></span></p><p>LAUNCH DATE: <span>' + convertedDate + '</span></p></div><div class="right"><br></div></div></div></div><br>');
    if (data[value].success === true) {
      document.getElementById('status-header' + data[value].flight_number).classList.add("status-header");
      document.getElementById('status-header' + data[value].flight_number).innerHTML = "SUCCESS"
    } else if (data[value].success === false) {
      document.getElementById('status-header' + data[value].flight_number).classList.add("status-header-failure");
      document.getElementById('status-header' + data[value].flight_number).innerHTML = "FAILURE"
    }

    if (data[value].success === null) {
      document.getElementById('status-header' + data[value].flight_number).classList.add("status-header-orange");
      document.getElementById('status-header' + data[value].flight_number).innerHTML = "NOT LAUNCHED YET"
    } else {

    }
}
  }).catch(err => {
    console.log(err);
  });
}
getUpcomingLaunches();
