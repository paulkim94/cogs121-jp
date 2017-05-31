// Global variables
var route;
var filters = ["Attractions", "Museums", "Parks", "College Campuses", "Landmarks", "Beaches", "Historical Buildings", "FREE", "9", "10", "21", "51"];
var displayedmarkers = [];
var displayed;
var map;
var passedLoc;

$(document).ready(function() {



    $.getJSON( "./locations", function( data ) {
      //initializeList(data);
      initializeMapMarkers(data);

      $('#search').click(function(){
      search(data);
      });
      $('#randomsearch').click(function(){
             randomSearch(data);
      });

    });

    // Check to see what filters are clicked, if so add to filter array
    $(":checkbox").on('click', filterChange);
});

function filterChange(e) {
  var checkbox = this;
  if(checkbox.checked) {
    filters.push(checkbox.name);
    $.getJSON( "./locations", function( data ) {
      applyFilters(data);
      initializeList(data, map);
    });
  } else {
    // Get index of filter being removed and remove it from array
    var index = filters.indexOf(checkbox.name);
    var removedFilter = filters[index];
    filters.splice(index, 1);
    // reinitialize markers
    $.getJSON( "./locations", function( data ) {
      applyFilters(data);
      initializeList(data, map);
    });

  }
}

/*
  map              = our Leaflet map
  allmarkers       = array containing all our markers
  displayedmarkers = layer containing the markers currently shown
  appliedfilters   = array storing the currently selected filters
  data             = data to check against
  */

function applyFilters(locationsArray) {
  displayed.clearLayers();
  for(var i = 0; i < locationsArray.length; i++) {
     if(matchesFilters(locationsArray[i])) {
       displayed.addLayer(displayedmarkers[i]);
     }
  }
}

function matchesFilters(locationsArrayPlace) {
  for(var i = 0; i < filters.length; i++) {
    if(locationsArrayPlace.category == filters[i]) {
      for(var j = 0; j < filters.length; j++) {
        if(filters[j] == "FREE" && locationsArrayPlace.price[0] == 0) {
          return true;
        } else if(filters[j] == "9" && locationsArrayPlace.price[0] < 10 && locationsArrayPlace.price[0] > 0) {
          return true;
        } else if(filters[j] == "10" && locationsArrayPlace.price[0] <= 20 && locationsArrayPlace.price[0] >= 10) {
          return true;
        } else if(filters[j] == "21" && locationsArrayPlace.price[0] > 20 && locationsArrayPlace.price[0] <= 50) {
          return true;
        } else if(filters[j] == "51" && locationsArrayPlace.price[0] > 50) {
          return true;
        }
      }
    }
  }
  return false;
}

function onHover(e) {
  this.openPopup();
}

function closePopup(e) {
  this.closePopup();
}

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.setAttribute('style', 'margin: 0 5px');
    btn.innerHTML = label;
    return btn;
}

function startEnd(map, control, place, i) {
  return function(e) {
      var container = L.DomUtil.create('div'),
          startBtn = createButton('Start', container),
          destBtn = createButton('End', container),
          detailsBtn = createButton('Details', container);

          detailsBtn.setAttribute('data-toggle', 'modal');
          detailsBtn.setAttribute('data-target', '#location-modal');

      L.DomEvent.on(startBtn, 'click', function() {
          control.spliceWaypoints(0, 1, e.latlng);
          $('.leaflet-routing-container').show();
          map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        $('.leaflet-routing-container').show();
        map.closePopup();
      });

      L.DomEvent.on(detailsBtn, 'click', fillLocationModal(place, i, map));

      L.DomEvent.on(detailsBtn, 'click', function() {
        map.closePopup();
      });

      L.popup()
          .setContent(container)
          .setLatLng(e.latlng)
          .openOn(map);
  }
}



//  search function
function search(locations){
var input, filter, s;
var searchArray = [];
input = document.getElementById('search-criteria');
filter = input.value.toUpperCase();
  for (i = 0; i < locations.length; i++){
      s = locations[i].name.toUpperCase();
      t = locations[i].description.toUpperCase();
      v = locations[i].category.toUpperCase();

      if ( t.indexOf(filter) > -1 || v.indexOf(filter) > -1 || s.indexOf(filter) > -1){
        $('#location' +i).show();
        console.log(v);
        console.log(t);
      }
      else if(s.indexOf(filter) < 0 ) {
        $('#location' + i).hide();
      //  searchArray.push(locations[i]);

      }
  }

}

//randomizer function
function randomSearch(locations){
var i, locMarker;
var places = [];
var random = Math.floor((Math.random() * 1000) % locations.length);

for(i=0; i<locations.length; i++){
  places[i]= locations[i];
}

console.log(places[random]);
$('#randomsearch').click(centerOnMap(map, places[random].marker));

// find out why it does not work on first click.
}


function initializeList(locationsArray, map) {
  for(i = 0; i < locationsArray.length; i++) {
    if(matchesFilters(locationsArray[i])) { /* loops through to see what locations match the current filters */
      var place = locationsArray[i];

      // var freePlaceHTML = '<div id="location' + i + '">' + '<div class="row"><div class="col-md-7"><b>' + place.name + '</b><br>' +
      // 'Free' + '<br>' + place.category + '</div><div class="col-md-5"><div><button type="button" id="view-map-button' +
      // + i + '"' + ' class="btn btn-default" style="width: 110px">View on Map</button><br><button type="button" id="view-details-button' +
      // + i + '"' + ' class="btn btn-default" style="margin-top: 10px; width: 110px" data-toggle="modal" data-target="#location-modal">View Details</button></div></div></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

      var freePlaceHTML = '<div id="location' + i + '">' + place.name + '<br>' + 'Free' + '<br>' + place.category +
      '<div style="text-align: center; margin-top: 10px"><button type="button" id="view-map-button' +
       i + '"' + ' class="map-btn">Map</button><button type="button" id="view-details-button' +
      + i + '"' + ' class="details-btn" data-toggle="modal" data-target="#location-modal">Details</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

      var placeHTML = '<div id="location' + i + '">' + place.name + '<br>' + '$' + place.price[0] + ' to $' + place.price[1] + '<br>' + place.category +
      '<div style="text-align: center; margin-top: 10px"><button type="button" id="view-map-button' +
       i + '"' + ' class="map-btn">Map</button><button type="button" id="view-details-button' +
      + i + '"' + ' class="details-btn" data-toggle="modal" data-target="#location-modal">Details</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

      if(place.price[0] === place.price[1])
        $('#locations-list').prepend(freePlaceHTML);
      else
        $('#locations-list').prepend(placeHTML);

      $('#location' + i).attr('style', 'margin: 1px auto; ');

      $('#view-map-button' + i).click(centerOnMap(map, place.marker));

      // When View Details button clicked
      $('#view-details-button' + i).click(fillLocationModal(place, i, map));

      //$('#save-button' + i).click(initializeSavedList(place, i, map));
    } else {
      $('#location' + i).remove(); /* if it doesn't match any current filters remove it from list */
    }
  }
}

function fbPublish() {
  FB.ui(
  {
    method: 'feed',
    name: 'Facebook Dialogs',
    link: passedLoc.websiteURL,
    caption: 'Check out a picture from my intinerary!',
    description: 'Check out a picture from my intinerary!'
  },
  function(response) {
    if (response && response.post_id) {
      alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  }
  );
}

function initializeSavedList(savedPlace, i, map) {
  // Shouldn't return now because a single modal "Save" button handles appending to the list
  return function(e) {
    // When there's no saved location div created yet
    if($('#saved-location' + i).length === 0) {

      passedLoc = savedPlace;

      if(savedPlace.price[0] === savedPlace.price[1]) {
        var savedPlaceFreeHTML = '<div id="saved-location' + i + '">' + savedPlace.name + '<br>' + 'Free' + '<br>' + savedPlace.category +
        '<div style="text-align: center; margin-top: 10px"><button type="button" id="saved-view-map-button' +
         i + '"' + ' class="map-btn">Map</button><button type="button" id="saved-view-details-button' +
        + i + '"' + ' class="details-btn" data-toggle="modal" data-target="#location-modal">Details</button><button type="button" id="remove-button' +
        + i + '"' + ' class="rmvbtn"><span class="glyphicon glyphicon-remove"></span></button><br><a onclick="fbPublish()"><button style="width:75%; margin-top:10px; margin-bottom: 0px !important;" type="button" class="btn btn-facebook btn-lg btn-fb"><i class="fa fa-facebook fa-2"></i> Share on Facebook</button></a></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

        $('#saved-list').append(savedPlaceFreeHTML);
      } else {
        var savedPlaceHTML = '<div id="saved-location' + i + '">' + savedPlace.name + '<br>' +
        '$' + savedPlace.price[0] + ' to $' + savedPlace.price[1] + '<br>' + savedPlace.category +
        '<div style="text-align: center; margin-top: 10px"><i class="icon-remove-sign"></i><button type="button" id="saved-view-map-button' +
         i + '"' + ' class="map-btn">Map</button><button type="button" id="saved-view-details-button' +
        + i + '"' + ' class="details-btn" data-toggle="modal" data-target="#location-modal">Details</button><button type="button" id="remove-button' +
        + i + '"' + ' class="rmvbtn"><span class="glyphicon glyphicon-remove"></span></button><br><a onclick="fbPublish()"><button style="width:75%; margin-top:10px; margin-bottom: 0px !important;" type="button" class="btn btn-facebook btn-fb"><i class="fa fa-facebook fa-2"></i> Share on Facebook</button></a></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

        $('#saved-list').append(savedPlaceHTML);
      }

      /*if($('.btn-facebook').length == 0) {
        $('#saved-list').prepend(shareHTML);
      }*/
      $('#saved-location' + i).attr('style', 'margin: 1px auto; ');

      $('#remove-button' + i).click(function(e) {
        $('#saved-location' + i).remove();
      });

      $('#saved-view-map-button' + i).click(centerOnMap(map, savedPlace.marker));

      $('#saved-view-details-button' + i).click(fillLocationModal(savedPlace, i, map));
    }


  }
}

function initializeMapMarkers(locationsArray) {
  // initializes map and sets center coordinates and zoom level
  map = L.map('map').setView([32.716, -117.161], 11
  );

  // mapbox tile layer, can also adjust max zoom level
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdhdGJvbnRvbiIsImEiOiJjajF2ZTFoYXMwMDA5MzJtdzZpNjN3dTZnIn0._REegf1q-yPULYDHXmQNeQ', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'your.mapbox.project.id',
      accessToken: 'your.mapbox.public.access.token'
  }).addTo(map);

    // Control for start/end routing
    var control = L.Routing.control({
        waypoints: [],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true
    }).addTo(map);

    $('.leaflet-routing-container').hide();

  var i, locMarker;

  for(i = 0; i < locationsArray.length; i++) {
    //var locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude]).bindPopup('<b>' + locationsArray[i].name + '</b>');

    // trying to use these if-statements to access locations.json categories
    // to see which marker to create
    if(locationsArray[i].category == "Attractions") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'star', prefix: 'fa', markerColor: 'purple', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else if(locationsArray[i].category == "Parks") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'tree', prefix: 'fa', markerColor: 'green', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else if(locationsArray[i].category == "Landmarks") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'orange', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else if(locationsArray[i].category == "Historical Buildings") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'building', prefix: 'fa', markerColor: 'darkpurple', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else if(locationsArray[i].category == "Museums") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'institution', prefix: 'fa', markerColor: 'red', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else if(locationsArray[i].category == "College Campuses") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', prefix: 'fa', markerColor: 'cadetblue', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }
    else {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'anchor', prefix: 'fa', markerColor: 'darkblue', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b><br>' + '<img src="' + locationsArray[i].imageURL1 + '" class="img-thumbnail">');
    }


    locMarker.on('mouseover', onHover);
    locMarker.on('mouseout', closePopup);
    locMarker.on('click', startEnd(map, control, locationsArray[i], i));
    displayedmarkers.push(locMarker);

    locationsArray[i].marker = locMarker;
    // Push markers to displayed markers array
  }
  displayed = L.layerGroup(displayedmarkers);
  displayed.addTo(map);

  initializeList(locationsArray, map);
}

// getting current location
function onLocationFound(e) {
   var radius = e.accuracy / 2;
   var location = e.latlng
   L.marker(location).addTo(map)
   L.circle(location, radius).addTo(map);
}
function onLocationError(e) {
   alert(e.message);
}
function getLocationLeaflet() {
   map.on('locationfound', onLocationFound);
   map.on('locationerror', onLocationError);

   map.locate({setView: true, maxZoom: 14});
}

// Open tab function
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = $(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = $(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// On hover over location in sidebar, center map on corresponding marker & display popup message
function centerOnMap(map, placeMarker) {
  return function(e) {

    // Center map on corresponding marker & display popup message
    map.setView(placeMarker.getLatLng());
    placeMarker.openPopup();
  }
}

function fillLocationModal(place, i, map) {
  return function(e) {
    // Fill in place name
    $('#location-name').text(place.name);

    $("#description").text("Description: " + place.description);
    $("#address").text("Address: " + place.address);

    if(place.price[0] === place.price[1])
      $("#price").text("Price: " + "Free");
    else
      $("#price").text("Price: " + "$" + place.price[0] + " - " + "$" + place.price[1]);

    $("#category").text("Category: " + place.category);
    if(place.websiteURL !== null) {
      $("#websiteURL").html("Website URL: <a href= '" + place.websiteURL + "'>" + place.websiteURL + "</a>");
    }
    $(".img_1").html("<img src = " + place.imageURL1 + ">");
    $(".img_2").html("<img src = " + place.imageURL2 + ">");

    $('.modal-footer').empty();
    $('.modal-footer').append('<button type="button" id="modal-save-' + i + '" class="btn btn-default"  data-dismiss="modal">Save</button>');
    $("#modal-save-" + i).click(initializeSavedList(place, i, map));
  }
}

function showHideRouting() {
  var routingButtonText = $('#routing-button').text();

  if(routingButtonText === "Show Routing") {
    // show leaflet routing
    $('.leaflet-routing-container').show();
    $('#routing-button').text("Hide Routing");
  }
  else {
    $('.leaflet-routing-container').hide();
    $('#routing-button').text("Show Routing");
  }
}
