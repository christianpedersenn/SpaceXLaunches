function getLatestLaunch() {
  fetch('https://api.spacexdata.com/v4/launches/latest').then(response => {
    return response.json();
  }).then(data => {
  // Convert ISO date to a more readable format
  var date = new Date(data.date_utc);
  convertedDate = date.toDateString()
    document.getElementById('latest-launch').insertAdjacentHTML('beforeend', '<div class="card"><div style="overflow: left;"><img src="' + data.links.patch.small + '" class="launch-img"><h1>' + data.name + ' - FLIGHT #' + data.flight_number + '</h1><p>' + data.details + '</p><br><div class="card-container"><div class="left"><p class="">LAUNCH STATUS: <span id="status-header' + data.flight_number + '"></span></p><p>LAUNCH DATE: <span>' + convertedDate + '</span></p></div><div class="right"><br><a class="btn-blue-small" id="' + data.flight_number + '" href="../launch/?id=' + data.id + '">LEARN MORE</a></div></div></div></div>');
    if (data.success === true) {
      document.getElementById('status-header' + data.flight_number).classList.add("status-header");
      document.getElementById('status-header' + data.flight_number).innerHTML = "SUCCESS"
    } else if (data.success === false) {
      document.getElementById('status-header' + data.flight_number).classList.add("status-header-failure");
      document.getElementById('status-header' + data.flight_number).innerHTML = "FAILURE"
    }
  }).catch(err => {
    console.log(err);
  });
}

  fetch('https://api.spacexdata.com/v4/launches/past').then(response => {
    return response.json();
  }).then(data => {
  lastElement = data.length;
  for (var value in data) {
    // Convert ISO date to a more readable format
    var date = new Date(data[value].date_utc);
    convertedDate = date.toDateString()
    let patch;
      if (data[value].links.patch.small == null) {
      patch = '../assets/img/no_img_avail.png'   
      } else {
        patch = data[value].links.patch.small
      }
      document.getElementById('past-launches').insertAdjacentHTML('afterend', '<div class="card" id="#' + data[value].flight_number + '"><div style="overflow: left;"><img src="' + patch + '" class="launch-img-small"><h1>' + data[value].name + ' - FLIGHT #' + data[value].flight_number + '</h1><br><div class="card-container"><div class="left"><p class="">LAUNCH STATUS: <span id="status-header' + data[value].flight_number + '"></span></p><p>LAUNCH DATE: <span>' + convertedDate + '</span></p></div><div class="right"><br><a class="btn-blue-small" id="' + data[value].flight_number + '" href="../launch/?id=' + data[value].id + '">LEARN MORE</a></div></div></div></div><br>');
      if (data[value].success === true) {
        document.getElementById('status-header' + data[value].flight_number).classList.add("status-header");
        document.getElementById('status-header' + data[value].flight_number).innerHTML = "SUCCESS"
      } else if (data[value].success === false) {
        document.getElementById('status-header' + data[value].flight_number).classList.add("status-header-failure");
        document.getElementById('status-header' + data[value].flight_number).innerHTML = "FAILURE"
      }
  }
  // Remove first entry as this will be the same as the latest launch
  setTimeout(function () {
    document.getElementById('#' + lastElement).remove();
  }, 10);
  }).catch(err => {
    console.log(err);
  });

  getLatestLaunch();