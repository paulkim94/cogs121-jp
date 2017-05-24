Team Member Work Done

Paul Kim:
- Modified code to display the list of San Diego places without hiding it when
the application's loaded initially
- Added "View on Map" and "View Details" buttons for each place in the sidebar
- Implemented a function that centers the map around a place and displays a
popup message of its name when the "View on Map" button is clicked for that
place in the sidebar.
- Added a modal that displays information for each individual place
- Implemented a function that fills in the modal body of a place with its
information when the "View Details" button is clicked. The modal pops up when
the button is clicked.
- Made saved places section scrollable too
- Fixed a bug (cannot save the same place multiple times anymore)
- The screenshots below show what I worked on

![Map Screenshot](/milestone13_images/milestone13_screenshot1.jpg?raw=true)
![Map Screenshot](/milestone13_images/milestone13_screenshot2.jpg?raw=true)
![Map Screenshot](/milestone13_images/milestone13_screenshot3.jpg?raw=true)

Judd Gatbonton:
- Created custom markers for each category on the map utilizing FontAwesome for their iconkit.
- Implemented code that initializes these markers instead of the old markers onto the map.
- Added a "Get Your Location" button underneath the map.
- Implemented functions that will utilizes Leaflet's locate() method in order to get the current location of the user. When the user clicks on the "Get Your Location" button, the map will create a marker and zoom in around the user's current location.

![Map Screenshot](/milestone13_images/milestone13_screenshot4.jpg?raw=true)
![Map Screenshot](/milestone13_images/milestone13_screenshot5.jpg?raw=true)
