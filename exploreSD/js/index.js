// initializes map and sets center coordinates and zoom level
var map = L.map('map').setView([32.716, -117.161], 11);

// mapbox tile layer, can also adjust max zoom level
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdhdGJvbnRvbiIsImEiOiJjajF2ZTFoYXMwMDA5MzJtdzZpNjN3dTZnIn0._REegf1q-yPULYDHXmQNeQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(map);

var seaWorldMarker = L.marker([32.764107, -117.226265]).addTo(map);
var ucsdMarker = L.marker([32.876093, -117.235436]).addTo(map);
var balboaParkMarker = L.marker([32.734148, -117.144553]).addTo(map);

seaWorldMarker.bindPopup("<b>Sea World</b><br><u>Description</u><br> Sea World San Diego is an animal theme park, oceanarium, outside aquarium, and marine mammal park, located in San Diego, California, United States. The park is owned by SeaWorld Entertainment.<br>"
+ "<u>Price</u><br> $50+ ");

ucsdMarker.bindPopup("<b>UCSD</b><br><u>Description</u><br>" +
"The University of California, San Diego is a public research university located in the La Jolla neighborhood of San Diego, California, in the United States.<br>" +
"<u>Price</u><br>Free ");

balboaParkMarker.bindPopup("<b>Balboa Park</b><br><u>Description</u><br>" +
"Balboa Park is a 1,200-acre urban cultural park in San Diego, California, United States.<br>" +
"<u>Price</u><br>Free ");

var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);
