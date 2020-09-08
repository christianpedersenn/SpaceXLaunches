fetch('https://api.spacexdata.com/v4/launches/next').then(response => {
  return response.json();
}).then(data => {

  // Convert ISO date to a more readable format
  var date = new Date(data.date_utc);
  convertedDate = date.toDateString()

  document.getElementById('next-launch').insertAdjacentHTML('beforeend', '<div class="card" style="max-width:90%;margin-left:5%;"><div style="overflow: left;"><h1>' + data.name + ' - FLIGHT #' + data.flight_number + '</h1><p id="details">' + data.details + '</p><br><div class="card-container"><div class="left"><p class="">LAUNCH STATUS: <span id="status-header' + data.flight_number + '"></span></p><p>LAUNCH DATE: <span>' + convertedDate + '</span></p></div><div class="right"><br></div></div></div></div>');

  if (data.success === null) {
    document.getElementById('status-header' + data.flight_number).classList.add("status-header-orange");
    document.getElementById('status-header' + data.flight_number).innerHTML = "NOT LAUNCHED YET"
  } else {

  }
  if (data.details === null) {
    document.getElementById('details').innerHTML = "No details available"
  } else {

  }

}).catch(err => {
  console.log(err);
});
