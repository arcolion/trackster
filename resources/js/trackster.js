$(document).ready();


$('#startSearch').click(function(){
  Trackster.searchTracksByTitle($("#search input").val());
})


var Trackster = {};

/*
Given an array of track data, create the HTML for a Bootstrap row for each.
Append each "row" to the container in the body to display all tracks. 
*/
Trackster.renderTracks = function(tracks) {
  var $playlist = $('#playlist');

  $playlist.empty();

  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var albumArt = track.image[1]["#text"];
    var htmlElement = 
    '<div id="playlist" class="row">' +
    '<ul>' +
      '<li class="col-xs-1 col-xs-offset-2"><a href="' + track.url + '" target="_blank"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a></li>' +
      '<li class="col-xs-3">' + track.name + '</li>' +
      '<li class="col-xs-2">' + track.artist + '</li>' +
      '<li class="col-xs-1">' + track.listeners + '</li>' +
      '<li class="col-xs-1"><img src="' + albumArt + '"/></li>' +
    '</ul>' +
  '</div>' ;

    $playlist.append(htmlElement);
    
  }
};

/*
Given a search term as a string, query the LastFM API.
Render the tracks given in the API query response.
*/
var API_KEY = "86a2d4c49673b97f1f425ea3d3c1788b";
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json", success: function(response) {
    Trackster.renderTracks(response.results.trackmatches.track);
  }});
};

// Get the input field
var input = document.getElementById("searchInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("startSearch").click();
  }
});