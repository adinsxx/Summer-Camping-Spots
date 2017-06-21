//Variables
var map;
var markers = [];
var polygon = null;
var placeMarkers = [];
function initMap() {
  var styles = [
{
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#a36634"
        }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#034436"
        }
    ]
},
{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#025241"
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#07382d"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#034436"
        },
        {
            "weight": 4.63
        }
    ]
},
{
    "featureType": "administrative.neighborhood",
    "elementType": "all",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#034436"
        }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#a6ce39"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#2db56e"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit.station.airport",
    "elementType": "geometry",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#d19c3a"
        }
    ]
},
{
    "featureType": "administrative.province",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#034436"
        },
        {
            "weight": 4.73
        }
    ]
},
{
    "featureType": "administrative.province",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#f58220"
        }
    ]
},
{
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#febe3f"
        },
        {
            "weight": 1.55
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#0c4d3f"
        }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "off"
        },
        {
            "color": "#034436"
        },
        {
            "weight": 6.32
        }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#a6ce39"
        }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#f2f2f2"
        }
    ]
},
{
    "featureType": "landscape.natural",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "color": "#034436"
        }
    ]
},
{
    "featureType": "landscape.natural",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "color": "#f2f2f2"
        }
    ]
}
  ];


    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.78444, lng: -88.787868 },
      zoom: 8,
      styles: styles,
      mapTypeControl: false
    });

    var timeAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('search-within-time-text'));
    var zoomAutoComplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text'));
    zoomAutoComplete.bindTo('bounds', map);
    var searchBox = new google.maps.places.SearchBox(
      document.getElementById('places-search'));
    searchBox.setBounds(map.getBounds());

    var locations = [
       {title: "Devil's Lake State Park", location: {lat:43.428447, lng:-89.731368}},
       {title: "High Cliff State Park", location: {lat:44.163103, lng:-88.29097}},
       {title: "Rock Island State Park", location: {lat:45.409337, lng:-86.829068 }},
       {title: "Newport State Park", location: {lat:45.245478, lng:-86.998189}},
       {title: "Devil's Lake Campgrounds", location: {lat:45.148943, lng:-87.210988}}

    ];
    
    var largeInfowindow = new google.maps.InfoWindow();

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawningControl: true,
      drawningControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });

    var defaultIcon = makeMarkerIcon('0091ff');

    var highlightedIcon = makeMarkerIcon('FFFF24');
    function marker_click() {
        populateInfoWindow(this, largeInfowindow);
    }
  
    for (var i = 0; i < locations.length; i++){
      var position = locations[i].location;
      var title = locations[i].title;
      var marker = new google.maps.Marker({
        //map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });

      markers.push(marker);
      marker.addListener('click');
    }
    document.getElementById('show-campsites').addEventListener('click', showCampsites);
    document.getElementById('hide-campsites').addEventListener('click', function(){
      hideMarkers(markers);
    });
    document.getElementById('toggle-drawing').addEventListener('click', function() {
      toggleDrawing(drawingManager);
    });

    document.getElementById('zoom-to-area').addEventListener('click', function() {
      zoomToArea();
    });

    document.getElementById('search-within-time').addEventListener('click', function() {
      searchWithinTime();
    });

    searchBox.addListener('places_changed', function(){
      searchBoxPlaces(this);
    });

    document.getElementById('go-places').addEventListener('click', textSearchPlaces);

    drawingManager.addListener('overlaycomplete', function(event){
      if (polygon){
        polygon.setMap(null);
        hideMarkers(markers);
      }
      drawingManager.setDrawingMode(null);
      polygon = event.overlay;
      polygon.setEditable(true);
      searchWithinPolygon(polygon);
      polygon.getPath().addListener('set_at', searchWithinPolygon);
      polygon.getPath().addListener('insert_at', searchWithinPolygon);
    });

    //function toggleBounce(){
      //if (marker.getAnimation() !== null) {
        //marker.setAnimation(null);
      //} else {
        //marker.setAnimation(google.maps.Animation.BOUNCE);
      //}
    //}
  }

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function(){
        infowindow.setMarker = null;
      });
      var streetViewService = new google.maps.streetViewService();
      var radius = 50;
  
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
    }
  function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latlng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
          infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
        }
      }
  }

  function showCampsites() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  function hideCampsites() {
    for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null); 
    }
  }

  function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function toggleDrawing(drawingManager) {
  if (drawingManager.map) {
    drawingManager.setMap(null);
    if (polygon !== null) {
      polygon.setMap(null);
    }
  } else {
    drawingManager.setMap(map);
  }
}


function searchWithinPolygon() {
  for (var i = 0; i < markers.length; i++) {
    if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
}

function zoomToArea() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('zoom-to-area-text').value;
  if (address === '') {
    window.alert('You must enter an area, or address.');
  } else {
    geocoder.geocode(
      { address: address,
        componentRestrictions: {locality: 'New York'}
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      });
    }
  }

function searchWithinTime() {
  var distanceMatrixService = new google.maps.DistanceMatrixService();
  var address = document.getElementById('search-within-time-text').value;
  if (address === '') {
    window.alert('You must enter an address.');
  } else {
    hideMarkers(markers);
    var origins = [];
    for (var i = 0; i < markers.length; i++) {
      origins[i] = markers[i].position;
    }
    var destination = address;
    var mode = document.getElementById('mode').value;
    distanceMatrixService.getDistanceMatrix({
      origins: origins,
      destinations: [destination],
      travelMode: google.maps.TravelMode[mode],
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        window.alert('Error was: ' + status);
      } else {
        displayMarkersWithinTime(response);
      }
    });
  }
}

function displayMarkersWithinTime(response) {
  var maxDuration = document.getElementById('max-duration').value;
  var origins = response.originAddresses;
  var destinations = response.destinationAddresses;
  var atLeastOne = false;
  for (var i = 0; i < origins.length; i++) {
    var results = response.rows[i].elements;
    for (var j = 0; j < results.length; j++) {
      var element = results[j];
      if (element.status === "OK") {
        
        var distanceText = element.distance.text;
      
        var duration = element.duration.value / 60;
        var durationText = element.duration.text;
        if (duration <= maxDuration) {
          markers[i].setMap(map);
          atLeastOne = true;
          
          var infowindow = new google.maps.InfoWindow({
            content: durationText + ' away, ' + distanceText +
              '<div><input type=\"button\" value=\"View Route\" onclick =' +
              '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
          });
          infowindow.open(map, markers[i]);
          markers[i].infowindow = infowindow;
          google.maps.event.addListener(markers[i], 'click', function() {
            this.infowindow.close();
          });
        }
      }
    }
  }
  if (!atLeastOne) {
    window.alert('We could not find any locations within that distance!');
  }
}


function displayDirections(origin) {
  hideMarkers(markers);
  var directionsService = new google.maps.DirectionsService();
  var destinationAddress =
      document.getElementById('search-within-time-text').value;
  var mode = document.getElementById('mode').value;
  directionsService.route({
    origin: origin,
    destination: destinationAddress,
    travelMode: google.maps.TravelMode[mode]
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        draggable: true,
        polylineOptions: {
          strokeColor: 'green'
        }
      });
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function searchBoxPlaces(searchBox) {
  hideMarkers(placeMarkers);
  var places = searchBox.getPlaces();
  if (places.length === 0) {
    window.alert('We did not find any places matching that search!');
  } else {
    createMarkersForPlaces(places);
  }
}

function textSearchPlaces() {
  var bounds = map.getBounds();
  hideMarkers(placeMarkers);
  var placesService = new google.maps.places.PlacesService(map);
  placesService.textSearch({
    query: document.getElementById('places-search').value,
    bounds: bounds
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkersForPlaces(results);
    }
  });
}

function marker_place() {
  if (placeInfoWindow.marker == this) {
    console.log("This infowindow already is on this marker!");
} else {
    getPlacesDetails(this, placeInfoWindow);
   }
    }

function createMarkersForPlaces(places) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < places.length; i++) {
    var place = places[i];
    var icon = {
      url: place.icon,
      size: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    var marker = new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location,
      id: place.place_id
    });
    
    var placeInfoWindow = new google.maps.InfoWindow();

    marker.addListener('click');
    placeMarkers.push(marker);
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  }
  map.fitBounds(bounds);
}


function getPlacesDetails(marker, infowindow) {
var service = new google.maps.places.PlacesService(map);
service.getDetails({
  placeId: marker.id
}, function(place, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    infowindow.marker = marker;
    var innerHTML = '<div>';
    if (place.name) {
      innerHTML += '<strong>' + place.name + '</strong>';
    }
    if (place.formatted_address) {
      innerHTML += '<br>' + place.formatted_address;
    }
    if (place.formatted_phone_number) {
      innerHTML += '<br>' + place.formatted_phone_number;
    }
    if (place.opening_hours) {
      innerHTML += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6];
    }
    if (place.photos) {
      innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
          {maxHeight: 100, maxWidth: 200}) + '">';
    }
    innerHTML += '</div>';
    infowindow.setContent(innerHTML);
    infowindow.open(map, marker);
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
});
}

