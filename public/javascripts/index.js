$(document).ready(function () {
  $('#searchterm').submit(function (event) {
    event.preventDefault();
    $('#results').html("");

    var searchTerm = $('#query').val();
    var typeEl = document.getElementById('type');
    var type = typeEl.options[typeEl.selectedIndex].value;

    if (type === 'youtube') {
      getRequestForYouTube(searchTerm);
    } else if (type === 'flickr') {
    //  getRequestForFlickr(searchTerm);
    } // else if...
  });
});

function getRequestForYouTube(searchTerm) {
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyCsJxPieXjWm2p5Ba8M187SjbGfq47OCTw',
    q: searchTerm
  };

  $.getJSON(url, params, function (results) {
    showResultsForYouTube(results);
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

    html += '<div class= "item">';
    html += '<h2>' + title + '</h2>';
    html += '<p>' + description + '<p>';
    html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    html += '</div>';

  });

  $('#results').html(html);
}

// flickr
/*function getRequestForFlickr(searchTerm) {
  var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
  var params = {
    part: 'snippet',
    type: 'image',
    key: '8714c197ab22db5849dcfe152e7e9a57',
    q: searchTerm
  };

  $.getJSON(url, params, function (results) {
    showResultsForFlickr(results);
  });
}

function showResultsForFlickr(results) {
  var html = "";
  var entries = results.items;

  $.each(entries, function (index, value) {
    var title = value.snippet.title;
    var thumbnail = value.snippet.thumbnails.medium.url;
    var description = value.snippet.description;
    var imageId = value.id.imageId;

    html += '<h2>' + title + '</h2>';
    html += '<p>' + description + '<p>';
    html += '<a data-flickr-embed="true"  href="https://www.flickr.com/photos/<img src="https://farm3.staticflickr.com/' + imageId + '" width="400" height="325" alt=""></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>';
    html += '<hr>';
  });

  $('#results').html(html);
}

*/
/* var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
$.getJSON(flickerAPI, {
tags: $("#query").val(),
tagmode: "any",
format: "json"
}).done(function (result, status, xhr) {
$.each(result.items, function (i, item) {
$("<img>").attr("src", item.media.m).appendTo("#results").wrap("<a href='" + item.link + "'></a>");
if (i === 5) {
return false;
}
});
}).fail(function (xhr, status, error) {
alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
});
*/
/*
var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + $("#query").val();
$.ajax({
url: flickerAPI,
dataType: "jsonp", // jsonp
jsonpCallback: 'jsonFlickrFeed', // add this property
success: function (result, status, xhr) {
$.each(result.items, function (i, item) {
$("<img>").attr("src", item.media.m).appendTo("#results").wrap("<a href='" + item.link + "'></a>");
if (i === 5) {
return false;
}
});
},
error: function (xhr, status, error) {
console.log(xhr)
$("#results").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
}
});
*/
/*
var FlickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

$.getJSON(FlickrAPI, {
tags: $("#query").val(),
tagmode: "any",
format: "json"
}).done(function(result) {
  $.each(result.items, function(i,item){
    $("<img/>").attr("src", item.media.m).appendTo("#results").wrap("<a href='" + item.link + "'></a>");
  });
});
*/
$(function() {
   //store public feed in URL
   var URL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
   //create searchInfo object
  var searchInfo = {

     tags : $('#query').val(),
     tagmode : "any",
     format : "json"
   };
   //when search button is clicked
   $('#search').click(function(){
     //update the search info object
     searchInfo.tags = $('#query').val();
     //get JSON
     $.getJSON(URL,searchInfo,function(data){
         var photoHTML = '';
         //loop through each photo object
         $.each(data.items, function(i, photo) {
        //   photoHTML += '<span class ="image">';
           photoHTML += '<div class= "item">';
           photoHTML += '<h2>' + data.items[i].title + '</h2>';
           photoHTML += '<a href="' + photo.link + '">';
           photoHTML += '<img src ="' + photo.media.m.replace('_m','_b')+'"></a></span>';
           photoHTML += '</div>';


        });// end each

       //add the HTML to the page
      $('#results').append(photoHTML);


     }); // end get JSON

   }); //end click

 }); //end ready
