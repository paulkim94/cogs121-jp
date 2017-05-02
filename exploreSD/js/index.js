// initializes map and sets center coordinates and zoom level
var map = L.map('map').setView([32.716, -117.161], 11);

// mapbox tile layer, can also adjust max zoom level
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdhdGJvbnRvbiIsImEiOiJjajF2ZTFoYXMwMDA5MzJtdzZpNjN3dTZnIn0._REegf1q-yPULYDHXmQNeQ', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
}).addTo(map);

// markers for college campuses and landmarks
var seaWorldMarker = L.marker([32.764107, -117.226265]).addTo(map);
var ucsdMarker = L.marker([32.876093, -117.235436]).addTo(map);
var balboaParkMarker = L.marker([32.734148, -117.144553]).addTo(map);
var sdsuMarker = L.marker([32.772133, -117.072665]).addTo(map);
var usdMarker = L.marker([32.771658, -117.191568]).addTo(map);
var sanDiegoCityCollegeMarker = L.marker([32.717491, -117.152771]).addTo(map);
var nationalUniversityMarker = L.marker([32.829303, -117.127357]).addTo(map);
var sanDiegoMesaCollegeMarker = L.marker([32.804756, -117.169058]).addTo(map);
var ashfordUniversityMarker = L.marker([32.827258, -117.14203]).addTo(map);
var pointLomaNazareneUniversityMarker = L.marker([32.716987, -117.251021]).addTo(map);
var cabrilloNationalMonumentMarker = L.marker([32.674495, -117.239492]).addTo(map);
var fortRosecransCemeteryMarker = L.marker([32.674495, -117.239492]).addTo(map);
var mountSoledadMarker = L.marker([32.839800, -117.252300]).addTo(map);
var coronadoBridgeMarker = L.marker([32.689253, -117.153740]).addTo(map);
var pointLomaLighthouseMarker = L.marker([32.672000, -117.241000]).addTo(map);
var unconditionalSurrenderStatueMarker = L.marker([32.712900, -117.175200]).addTo(map);
var torreyPinesGliderportMarker = L.marker([32.889900, -117.251200]).addTo(map);
var mormonBattalionHistoricalSiteMarker = L.marker([32.754200, -117.194200]).addTo(map);
var missionBasilicaSanDiegoDeAlcalaMarker = L.marker([32.784600, -117.106000]).addTo(map);
var nationalSaluteToBobHopeAndTheMilitaryMarker = L.marker([32.712700, -117.175500]).addTo(map);
var SanDiegoCaliforniaTempleMarker = L.marker([32.866400, -117.228800]).addTo(map);
var SalkInstituteMarker = L.marker([32.887047, -117.244785]).addTo(map);

seaWorldMarker.on('click', function(e) {
  // $("#instruction").toggle();
  $("#name").text("Name: Sea World");
  $("#description").text("Description: Sea World San Diego is an animal theme park, oceanarium, outside aquarium, and marine mammal park, located in San Diego, California, United States. The park is owned by SeaWorld Entertainment.");
  $("#address").text("Address: Mission Bay Park, 500 Sea World Dr, San Diego, CA 92109");
  $("#price").text("Price: $50 - $70");
  $("#category").text("Category: Attraction");
});
seaWorldMarker.bindPopup("<b>Sea World</b>").openPopup();

ucsdMarker.bindPopup("<b>UCSD</b><br><u>Description</u><br>" +
"The University of California, San Diego is a public research university located in the La Jolla neighborhood of San Diego, California, in the United States.<br>" +
"<u>Price</u><br>Free ");

balboaParkMarker.bindPopup("<b>Balboa Park</b><br><u>Description</u><br>" +
"Balboa Park is a 1,200-acre urban cultural park in San Diego, California, United States.<br>" +
"<u>Price</u><br>Free ");

sdsuMarker.bindPopup("<b>SDSU</b><br><u>Description</u><br>" +
"San Diego State University is a public research university in San Diego, California, and is the largest and oldest higher education institution in San Diego County.<br>" +
"<u>Price</u><br>Free ");

usdMarker.bindPopup("<b>USD</b><br><u>Description</u><br>" +
"The University of San Diego is a private Roman Catholic university in San Diego, California, United States. The university offers 42 baccalaureate degrees, and several degrees in law, nursing, and other doctorate programs.<br>" +
"<u>Price</u><br>Free ");

sanDiegoCityCollegeMarker.bindPopup("<b>San Diego City College</b><br><u>Description</u><br>" +
"San Diego City College is a public, two-year community college located in San Diego, California. City College is part of the San  Diego Community College District along with San Diego Mesa College.<br>" +
"<u>Price</u><br>Free ");

nationalUniversityMarker.bindPopup("<b>National University</b><br><u>Description</u><br>" +
"National University is a private, nonprofit institution of higher education in California. Founded in 1971, National University is headquartered in La Jolla, California, United States.<br>" +
"<u>Price</u><br>Free ");

sanDiegoMesaCollegeMarker.bindPopup("<b>San Diego Mesa College</b><br><u>Description</u><br>" +
"San Diego Mesa College is a public, two year community college located in the community of Clairemont Mesa in the City of San Diego, California in the United States.<br>" +
"<u>Price</u><br>Free ");

ashfordUniversityMarker.bindPopup("<b>Ashford University</b><br><u>Description</u><br>" +
"Ashford University is an online for-profit university headquartered in San Diego, California. It is the largest educational holding of Bridgepoint Education.<br>" +
"<u>Price</u><br>Free ");

pointLomaNazareneUniversityMarker.bindPopup("<b>Point Loma Nazarene University</b><br><u>Description</u><br>" +
"Point Loma Nazarene University is a Christian liberal arts college. Its main campus is located on the Point Loma oceanfront in San Diego, California, United States. It was founded in 1902Nazarene.<br>" +
"<u>Price</u><br>Free ");

cabrilloNationalMonumentMarker.bindPopup("<b>Cabrillo National Monument</b><br><u>Description</u><br>" +
"Cabrillo National Monument is at the southern tip of the Point Loma Peninsula in San Diego, California. It commemorates the landing of Juan Rodríguez Cabrillo at San Diego Bay on September 28, 1542.<br>" +
"<u>Price</u><br>Free ");

fortRosecransCemeteryMarker.bindPopup("<b>Fort Rosecrans Cemetery</b><br><u>Description</u><br>" +
"Fort Rosecrans National Cemetery is a federal military cemetery in the city of San Diego, California.<br>" +
"<u>Price</u><br>Free ");

mountSoledadMarker.bindPopup("<b>Mount Soledad</b><br><u>Description</u><br>" +
"Mount Soledad is a prominent landmark in the city of San Diego, California, United States. The mountaintop is the site of the Mount Soledad cross<br>" +
"<u>Price</u><br>Free ");

coronadoBridgeMarker.bindPopup("<b>Coronado Bridge</b><br><u>Description</u><br>" +
"The San Diego Coronado Bridge, locally referred to as the Coronado Bridge, is a prestressed concrete/steel girder bridge, crossing over San Diego Bay in the United States, linking San Diego with Coronado, California.<br>" +
"<u>Price</u><br>Free ");

pointLomaLighthouseMarker.bindPopup("<b>Point Loma Lighthouse</b><br><u>Description</u><br>" +
"The original Point Loma Lighthouse is a historic lighthouse located on the Point Loma peninsula at the mouth of San Diego Bay.<br>" +
"<u>Price</u><br>Free ");

unconditionalSurrenderStatueMarker.bindPopup("<b>'Unconditional Surrender' Statue</b><br><u>Description</u><br>" +
"If the photograph of raising the American flag on Iwo Jima is the quintessential World War II iconfor triumph in a just war, then 'Unconditional Surrender' is the icon for the just rewards of victory.<br>" +
"<u>Price</u><br>Free ");

torreyPinesGliderportMarker.bindPopup("<b>Torrey Pines Gliderport</b><br><u>Description</u><br>" +
"The Torrey Pines Gliderport is a city-owned private-use glider airport located in La Jolla<br>" +
"<u>Price</u><br>Free ");

mormonBattalionHistoricalSiteMarker.bindPopup("<b>Mormon Battalion Historical Site</b><br><u>Description</u><br>" +
"This newly remodeled center evokes Old San Diego and includes hands-on exhibits and resources for learning more about those who served in the Battalion.<br>" +
"<u>Price</u><br>Free ");

missionBasilicaSanDiegoDeAlcalaMarker.bindPopup("<b>Mission Basilica San Diego de Alcala</b><br><u>Description</u><br>" +
"Visitors can explore the grounds of this 18th-century, still-active mission, the state's first. <br>" +
"<u>Price</u><br>Free ");

nationalSaluteToBobHopeAndTheMilitaryMarker.bindPopup("<b>National Salute to Bob Hope and the Military</b><br><u>Description</u><br>" +
"On the plaza, there are 15 life-sized bronze statues, arranged as if attending a Bob Hope show. Each figure represents a serviceman from a different conflict. <br>" +
"<u>Price</u><br>Free ");

SanDiegoCaliforniaTempleMarker.bindPopup("<b>San Diego California Temple</b><br><u>Description</u><br>" +
"The San Diego California Temple is the 47th constructed and 45th operating temple of The Church of Jesus Christ of Latter-day Saints.<br>" +
"<u>Price</u><br>Free ");

SalkInstituteMarker.bindPopup("<b>Salk Institute for Biological Studies</b><br><u>Description</u><br>" +
"The Salk Institute for Biological Studies is an independent, non-profit, scientific research institute located in La Jolla, San Diego, California, United States.<br>" +
"<u>Price</u><br>Free ");




// markers for museums and stadiums
var ussMidwayMuseumMarker = L.marker([32.7137, -117.1751]).addTo(map);
var natHistMuseumMarker = L.marker([32.7321, -117.1475]).addTo(map);
var museumOfManMarker = L.marker([32.7318, -117.1523]).addTo(map);
var airSpaceMuseumMarker = L.marker([32.7263, -117.1543]).addTo(map);
var modelRailroadMuseumMarker = L.marker([32.7311, -117.1486]).addTo(map);
var photoArtsMuseumMarker = L.marker([32.7311, -117.1488]).addTo(map);
var musContArtSDMarker = L.marker([32.84444, -117.27806]).addTo(map);
var mingeiIntMuseumMarker = L.marker([32.7311, -117.1510]).addTo(map);
var maritimeMuseumMarker = L.marker([32.7209, -117.1740]).addTo(map);
var museumOfArtMarker = L.marker([32.7322, -117.1504]).addTo(map);
var automotiveMuseumMarker = L.marker([32.7275, -117.1539]).addTo(map);
var newChildrenMuseumMarker = L.marker([32.7106, -117.1652]).addTo(map);
var starOfIndiaMarker = L.marker([32.7203, -117.1736]).addTo(map);
var qualcommMuseumMarker = L.marker([32.897290, -117.195714]).addTo(map);
var birchAquariumScrippsMarker = L.marker([32.8678, -117.2496]).addTo(map);
var fleetScienceCenterMarker = L.marker([32.7308, -117.1470]).addTo(map);
var wellsFargoHistMuseumMarker = L.marker([32.7541, -117.1973]).addTo(map);

var qualcommStadiumMarker = L.marker([32.7831, -117.1196]).addTo(map);
var petcoParkMarker = L.marker([32.7072, -117.1571]).addTo(map);
var delMarRaceTrackMarker = L.marker([32.9757, -117.2614]).addTo(map);
var valleyViewCenterMarker = L.marker([32.7553, -117.2122]).addTo(map);

ussMidwayMuseumMarker.bindPopup("<b>USS Midway Museum</b>");
natHistMuseumMarker.bindPopup("<b>San Diego Natural History Museum</b>");
museumOfManMarker.bindPopup("<b>San Diego Museum of Man</b>");
airSpaceMuseumMarker.bindPopup("<b>San Diego Air & Space Museum</b>");
modelRailroadMuseumMarker.bindPopup("<b>San Diego Model Railroad Museum</b>");
photoArtsMuseumMarker.bindPopup("<b>Museum of Photographic Arts</b>");
musContArtSDMarker.bindPopup("<b>Museum of Contemporary Art San Diego</b>");
mingeiIntMuseumMarker.bindPopup("<b>Mingei International Museum</b>");
maritimeMuseumMarker.bindPopup("<b>Maritime Museum of San Diego</b>");
museumOfArtMarker.bindPopup("<b>San Diego Museum of Art</b>");
automotiveMuseumMarker.bindPopup("<b>San Diego Automotive Museum</b>");
newChildrenMuseumMarker.bindPopup("<b>The New Children's Museum</b>");
starOfIndiaMarker.bindPopup("<b>Star of India</b>");
qualcommMuseumMarker.bindPopup("<b>Qualcomm Museum</b>");
birchAquariumScrippsMarker.bindPopup("<b>Birch Aquarium at Scripps</b>");
fleetScienceCenterMarker.bindPopup("<b>Fleet Science Center</b>");
wellsFargoHistMuseumMarker.bindPopup("<b>Wells Fargo History Museum</b>");

qualcommStadiumMarker.bindPopup("<b>Qualcomm Stadium</b><br><u>Description</u><br>" +
"The Salk Institute for Biological Studies is an independent, non-profit, scientific research institute located in La Jolla, San Diego, California, United States.<br>" +
"<u>Price</u><br>Free ");
petcoParkMarker.bindPopup("<b>Petco Park</b>");
delMarRaceTrackMarker.bindPopup("<b>Del Mar Racetrack</b>");
valleyViewCenterMarker.bindPopup("<b>Valley View Casino Center</b>");






var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);
