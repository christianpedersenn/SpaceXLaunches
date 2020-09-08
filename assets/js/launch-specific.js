function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
var id = getQueryStringValue("id");

fetch('https://api.spacexdata.com/v4/launches/' + id).then(response => {
  return response.json();
}).then(data => {
  // Change the document title based on which launch viewed
  document.title = "SpaceXLaunches - Flight #" + data.flight_number;
  // Convert ISO date to a more readable format
  var date = new Date(data.date_utc);
  convertedDate = date.toDateString()

  let patch;
  if (data.links.patch.small == null) {
    patch = '../assets/img/no_img_avail.png'   
  } else {
    patch = data.links.patch.small
  }

  document.getElementById('specific-launch').insertAdjacentHTML('beforeend', '<div class="card"><div style="overflow: left;"><img src="' + patch + '" class="launch-img"><h1>' + data.name + ' - FLIGHT #' + data.flight_number + '</h1><p id="details">' + data.details + '</p><br><div class="card-container"><div class="left"><p class="">LAUNCH STATUS: <span id="status-header' + data.flight_number + '"></span></p><p>LAUNCH DATE: <span>' + convertedDate + '</span></p></div><div class="right"><br><a class="btn-blue-small" id="' + data.flight_number + '" href="' + data.links.presskit + '" target="_blank">DOWNLOAD PRESSKIT</a></div></div></div></div>');


  // As the API only provides some information, a lot of earlier launches doesn't include images + some other information.
  // Therefore if statements below
  if (data.success === true) {
    document.getElementById('status-header' + data.flight_number).classList.add("status-header");
    document.getElementById('status-header' + data.flight_number).innerHTML = "SUCCESS"
  } else if (data.success === false) {
    document.getElementById('status-header' + data.flight_number).classList.add("status-header-failure");
    document.getElementById('status-header' + data.flight_number).innerHTML = "FAILURE"
  }
  if (data.details === null) {
    document.getElementById('details').innerHTML = "No details available"
  }

  if (data.links.presskit === null) {
    document.getElementById(data.flight_number).remove();
  }

 

  // Remove image div if no images found in API
  if (data.links.flickr.original.length === 0) {
    document.getElementById('image').remove();
    console.log('NO IMAGES');
    document.getElementById('images').innerHTML = 'No images available from API'
    document.getElementById('images').style = 'color:#fff'
  } else {
    // Get images and create element in HTML
    data.links.flickr.original.forEach(image => {
      // document.getElementById('images').insertAdjacentHTML('beforeend', '<li><img src="' + image + '" class="images-flickr" id="' + image + ' onclick="viewer.show()""></li>');
      document.getElementById('images').insertAdjacentHTML('beforeend', '<img src="' + image + '" class="images-flickr" id="' + image + '">');
      const viewer = new Viewer(document.getElementById('image'), {
        inline: true,
        viewed() {
          viewer.zoomTo(1);
        },
      });
    });
    const gallery = new Viewer(document.getElementById('images'));         
  }

  // LINKS
  let links_node = document.getElementById('links')
  let links_article_node = document.createElement('li')
  let links_reddit_campaign_node = document.createElement('li')
  let links_reddit_launch_node = document.createElement('li')
  let links_reddit_media_node = document.createElement('li')
  let links_youtube_node = document.createElement('li')
  let links_wikipedia_node = document.createElement('li')

  if (data.links.article === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_article_node)
    links_article_node.innerHTML = '<a href="' + data.links.article + '" id="' + data.links.article + '" target="_blank" class="link">Article (' + data.links.article + ')<a/>'
    links_article_node.setAttribute('id', 'article')
  }
  if (data.links.reddit.campaign === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_reddit_campaign_node)
    links_reddit_campaign_node.innerHTML = '<a href="' + data.links.reddit.campaign + '"id="' + data.links.reddit.campaign + '" target="_blank" class="link">Reddit campaign (' + data.links.reddit.campaign + ')<a/>'
    links_article_node.setAttribute('id', 'reddit_campaign')    
  }
  if (data.links.reddit.launch === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_reddit_media_node)
    links_reddit_media_node.innerHTML = '<a href="' + data.links.reddit.media + '" id="' + data.links.reddit.media + '" target="_blank" class="link">Reddit media (' + data.links.reddit.media + ')<a/>'
    links_article_node.setAttribute('id', 'reddit_media')
  } 
  if (data.links.reddit.media === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_reddit_launch_node)
    links_reddit_launch_node.innerHTML = '<a href="' + data.links.reddit.launch + '" id="' + data.links.reddit.launch + '" target="_blank" class="link">Reddit launch (' + data.links.reddit.launch + ')<a/>'
    links_article_node.setAttribute('id', 'reddit_launch')  
  } 
  if (data.links.video_link === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_youtube_node)
    links_youtube_node.innerHTML = '<a href=https://www.youtube.com/watch?v=' + data.links.youtube_id + 'id=' + data.links.youtube_id + '" target="_blank" class="link">Youtube (https://www.youtube.com/watch?v=' + data.links.youtube_id + ')<a/>'
    links_article_node.setAttribute('id', 'youtube_id')
  } 
  if (data.links.wikipedia === null) {
    // Do nothing
  } else {
    links_node.appendChild(links_wikipedia_node)
    links_wikipedia_node.innerHTML = '<a href="' + data.links.wikipedia + '" id="' + data.links.wikipedia + '" target="_blank" class="link">Wikipedia (' + data.links.wikipedia + ')<a/>'
    links_article_node.setAttribute('id', 'wikipedia')
  }

}).catch(err => {
  console.log(err);
});
