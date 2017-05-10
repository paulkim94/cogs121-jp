// Global variables
var route;

$(document).ready(function() {

    $.getJSON( "./locations", function( data ) {
      initializeMapMarkers(data);
    });
});

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
        routeWhileDragging: true
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

function onClick(e) {
  $("#name").text("Name: " + this.name);
  $("#description").text("Description: " + this.description);
  $("#address").text("Address: " + this.address);
  $("#price").text("Price: " + "$" + this.price[0] + " - " + "$" + this.price[1]);
  $("#category").text("Category: " + this.category);
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

function initializeMapMarkers(locationsArray) {
  // initializes map and sets center coordinates and zoom level
  var map = L.map('map').setView([32.716, -117.161], 11);

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
  // geosearch stuff
  var searchControl = L.esri.Geocoding.geosearch().addTo(map);
  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    //for (var i = data.results.length - 1; i >= 0; i--) {
      //results.addLayer(L.marker(data.results[i].latlng));
    //}
    results.addLayer(L.marker(data.results[data.results.length - 1].latlng))
  });

  // Added a fixed start location marker for now
  var startLocation = L.marker([32.872891,-117.215663]).addTo(map).bindPopup('<b>Start Location</b>').openPopup();

  var i, locMarker;

  for(i = 0; i < locationsArray.length; i++) {
    var locMarker = L.marker([locationsArray[i].lat, locationsArray[i].longitude]).addTo(map).bindPopup('<b>' + locationsArray[i].name + '</b>');
    locMarker.on('mouseover', onHover);
    locMarker.on('mouseout', closePopup);
    locMarker.on('click', onClick, locationsArray[i]);
    locMarker.on('click', startEnd(map, control));
    //locMarker.on('click', drawRoute(startLocation.getLatLng(), locMarker.getLatLng(),map));

    locationsArray[i].marker = locMarker;
  }
}
