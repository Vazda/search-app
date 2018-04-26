$(document).ready(function () {
  $('#searchterm').submit(function (event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    var typeEl = document.getElementById('type');
    var type = typeEl.options[typeEl.selectedIndex].value;

    if (type === 'youtube') {
      getRequestForYouTube(searchTerm);
    } else if (type === 'flickr') {
      // code
    } // else if...
  });
});

function getRequestForYouTube(searchTerm) {
  url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyCsJxPieXjWm2p5Ba8M187SjbGfq47OCTw',
    q: searchTerm
  };

  $.getJSON(url, params, function (searchTerm) {
    showResultsForYouTube(searchTerm);
  });
}

function showResultsForYouTube(results) {
  var html = "";
  var entries = results.items;

  $.each(entries, function (index, value) {
    var title = value.snippet.title;
    var thumbnail = value.snippet.thumbnails.medium.url;
    var description = value.snippet.description;
    var videoId = value.id.videoId;

    html += '<h2>' + title + '</h2>';
    html += '<p>' + description + '<p>';

    // embed video
    html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    html += '<hr>';

  });

  $('#results').html(html);
}

// flickr
function getRequestForFlickr(searchTerm) {
  // code
}

function showResultsForFlickr(results) {
  // code
}