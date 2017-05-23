// Global variables
var route;
var filters = ["Attractions", "Museums", "Parks", "College Campuses", "Landmarks", "Beaches", "Historical Buildings", "FREE", "9", "10", "21", "51"];
var displayedmarkers = [];
var displayed;
var map;

$(document).ready(function() {



    $.getJSON( "./locations", function( data ) {
      //initializeList(data);
      initializeMapMarkers(data);
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
    });
  } else {
    // Get index of filter being removed and remove it from array
    var index = filters.indexOf(checkbox.name);
    var removedFilter = filters[index];
    filters.splice(index, 1);
    // reinitialize markers
    $.getJSON( "./locations", function( data ) {
      applyFilters(data);
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

function drawRoute(start, end, map) {
  // Review why this works exactly
  return function(e) {
    if(route != null) {
      // removes route
      map.removeControl(route);
      // Re-create new route
      route = L.Routing.control({
        waypoints: [
            start,
            end
        ],
        routeWhileDragging: false
      }).addTo(map);
    }
    else {
      // Create new route
      route = L.Routing.control({
        waypoints: [
            start,
            end
        ],
        routeWhileDragging: true
      }).addTo(map);
    }
  }
}

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

function startEnd(map, control) {
  return function(e) {
      var container = L.DomUtil.create('div'),
          startBtn = createButton('Start from this location', container),
          destBtn = createButton('Go to this location', container);

      L.DomEvent.on(startBtn, 'click', function() {
          control.spliceWaypoints(0, 1, e.latlng);
          map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });

      L.popup()
          .setContent(container)
          .setLatLng(e.latlng)
          .openOn(map);
  }
}

function initializeList(locationsArray, map) {
  for(i = 0; i < locationsArray.length; i++) {
    var place = locationsArray[i];

    var freePlaceHTML = '<div id="location' + i + '">' + '<div class="row"><div class="col-md-7">' + place.name + '<br>' +
    'Free' + '<br>' + place.category + '</div><div class="col-md-5">' + place.address +
    '</div></div><div style="text-align: center"><button type="button" id="view-map-button' +
    + i + '"' + ' class="btn btn-default">View on Map</button><button type="button" id="view-details-button' +
    + i + '"' + ' class="btn btn-default" data-toggle="modal" data-target="#location-modal">View Details</button><button type="button" id="location-button' +
    + i + '"' + ' class="btn btn-default">Save</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

    var placeHTML = '<div id="location' + i + '">' + '<div class="row"><div class="col-md-7">' + place.name + '<br>' +
    '$' + place.price[0] + ' to $' + place.price[1] + '<br>' + place.category + '</div><div class="col-md-5">' + place.address +
    '</div></div><div style="text-align: center"><button type="button" id="view-map-button' +
    + i + '"' + ' class="btn btn-default">View on Map</button><button type="button" id="view-details-button' +
    + i + '"' + ' class="btn btn-default" data-toggle="modal" data-target="#location-modal">View Details</button><button type="button" id="location-button' +
    + i + '"' + ' class="btn btn-default">Save</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

    if(place.price[0] === place.price[1])
      $('#locations-list').append(freePlaceHTML);
    else
      $('#locations-list').append(placeHTML);

    $('#location' + i).attr('style', 'font-size: 16px; margin: 1px auto; ');

    $('#view-map-button' + i).click(centerOnMap(map, place.marker));

    // When View Details button clicked
    $('#view-details-button' + i).click(fillLocationModal(place));

    $('#location-button' + i).click(initializeSavedList(place, i, map));

  }
}

function initializeSavedList(savedPlace, i, map) {
  return function(e) {
    // When there's no saved location div created yet
    if($('#saved-location' + i).length === 0) {
      var savedPlaceFreeHTML = '<div id="saved-location' + i + '">' + '<div class="row"><div class="col-md-7">' + savedPlace.name + '<br>' +
      'Free' + '<br>' + savedPlace.category + '</div><div class="col-md-5">' + savedPlace.address +
      '</div></div><div style="text-align: center"><button type="button" id="saved-view-map-button' +
      + i + '"' + ' class="btn btn-default">View on Map</button><button type="button" id="saved-view-details-button' +
      + i + '"' + ' class="btn btn-default" data-toggle="modal" data-target="#location-modal">View Details</button><button type="button" id="saved-button' +
      + i + '"' + ' class="btn btn-default">Remove</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

      var savedPlaceHTML = '<div id="saved-location' + i + '">' + '<div class="row"><div class="col-md-7">' + savedPlace.name + '<br>' +
      '$' + savedPlace.price[0] + ' to $' + savedPlace.price[1] + '<br>' + savedPlace.category + '</div><div class="col-md-5">' +
      savedPlace.address + '</div></div><div style="text-align: center"><button type="button" id="saved-view-map-button' +
      + i + '"' + ' class="btn btn-default">View on Map</button><button type="button" id="saved-view-details-button' +
      + i + '"' + ' class="btn btn-default" data-toggle="modal" data-target="#location-modal">View Details</button><button type="button" id="saved-button' +
      + i + '"' + ' class="btn btn-default">Remove</button></div><hr style="border-top: 1px solid #8c8b8b;"></div>';

      if(savedPlace.price[0] === savedPlace.price[1])
        $('#saved-list').append(savedPlaceFreeHTML);
      else
        $('#saved-list').append(savedPlaceHTML);

      $('#saved-location' + i).attr('style', 'font-size: 16px; margin: 1px auto; ');

      $('#saved-button' + i).click(function(e) {
        $('#saved-location' + i).remove();
      });

      $('#saved-view-map-button' + i).click(centerOnMap(map, savedPlace.marker));

      $('#saved-view-details-button' + i).click(fillLocationModal(savedPlace));
    }


  }
}

function initializeMapMarkers(locationsArray) {
  // initializes map and sets center coordinates and zoom level
  map = L.map('map').setView([32.716, -117.161], 11);

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

    // create custom icon practice
    // parks
/*    L.marker([32.64701, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'tree', prefix: 'fa', markerColor: 'green', iconColor: 'white'}) }).addTo(map);
    // museums
    L.marker([32.67, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'institution', prefix: 'fa', markerColor: 'red', iconColor: 'white'}) }).addTo(map);
    // college campuses
    L.marker([32.70, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', prefix: 'fa', markerColor: 'cadetblue', iconColor: 'white'}) }).addTo(map);
    // attractions
    L.marker([32.73, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'star', prefix: 'fa', markerColor: 'purple', iconColor: 'white'}) }).addTo(map);
    // beaches
    L.marker([32.75, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'anchor', prefix: 'fa', markerColor: 'darkblue', iconColor: 'white'}) }).addTo(map);
    // historical buildings
    L.marker([32.77, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'building', prefix: 'fa', markerColor: 'darkpurple', iconColor: 'white'}) }).addTo(map);
    // landmarks
    L.marker([32.80, -117.39425], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'orange', iconColor: 'white'}) }).addTo(map);
*/


  var i, locMarker;

  for(i = 0; i < locationsArray.length; i++) {
    //var locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude]).bindPopup('<b>' + locationsArray[i].name + '</b>');

    // trying to use these if-statements to access locations.json categories
    // to see which marker to create
    if(locationsArray[i].category == "Attractions") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'star', prefix: 'fa', markerColor: 'purple', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else if(locationsArray[i].category == "Parks") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'tree', prefix: 'fa', markerColor: 'green', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else if(locationsArray[i].category == "Landmarks") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'orange', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else if(locationsArray[i].category == "Historical Buildings") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'building', prefix: 'fa', markerColor: 'darkpurple', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else if(locationsArray[i].category == "Museums") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'institution', prefix: 'fa', markerColor: 'red', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else if(locationsArray[i].category == "College Campuses") {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', prefix: 'fa', markerColor: 'cadetblue', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }
    else {
      locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude], {icon: L.AwesomeMarkers.icon({icon: 'anchor', prefix: 'fa', markerColor: 'darkblue', iconColor: 'white'}) }).bindPopup('<b>' + locationsArray[i].name + '</b>');
    }


    locMarker.on('mouseover', onHover);
    locMarker.on('mouseout', closePopup);
    locMarker.on('click', startEnd(map, control));
    displayedmarkers.push(locMarker);
    //locMarker.on('click', drawRoute(startLocation.getLatLng(), locMarker.getLatLng(),map));
    locationsArray[i].marker = locMarker;
    // Push markers to displayed markers array
  }
  displayed = L.layerGroup(displayedmarkers);
  displayed.addTo(map);

  initializeList(locationsArray, map);
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

function fillLocationModal(place) {
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
    $("#image1").html("<img src = " + place.imageURL1 + ">");
  }
}
