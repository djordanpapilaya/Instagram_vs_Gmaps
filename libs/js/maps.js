var map;
var global_markers = [];
var nederland = new google.maps.LatLng(52.2129919, 5.2793703);
var portugal = new google.maps.LatLng(37.2454205, -8.19606);
var my_custom_style = 'custom_style';


var infowindow = new google.maps.InfoWindow({
    maxWidth: 306
});

function addMarker(markers) {
    for (var i = 0; i < markers.length; i++) {
        var lat = parseFloat(markers[i]["latitude"]);
        var lng = parseFloat(markers[i]["longitude"]);
        var title = markers[i]["title"];
        var photo = markers[i]["photo"];
        var video = markers[i]["video"];


        var myLatlng = new google.maps.LatLng(lat, lng);
        if(video){
        var contentString = "<html><body><div><p>" + "<video width='306' height='306' controls><source type='video/mp4' src="+video+"></video></br><h2>" + title + "</h2></p></div></body></html>";
        }else{
           var contentString = "<html><body><div><p>" + "<img src=" + photo + "></img></br><h2>" + title + "</h2></p></div></body></html>";

        }
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: "Coordinates: " + lat + " , " + lng + " | Trailhead name: " + title,
            animation: google.maps.Animation.DROP
        });

        marker['infowindow'] = contentString;

        global_markers[i] = marker;

        google.maps.event.addListener(global_markers[i], 'click', function () {
            infowindow.setContent(this['infowindow']);
            infowindow.open(map, this);
        });
    }
}

function getImagesInfoCallback(data) {
    addMarker(data);
}

function getImagesInfo() {
    $.getJSON(
        "libs/php/getInstaData.php",
        getImagesInfoCallback
    )
}
function NedControl(controlDivNed, map) {
    controlDivNed.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Ga naar Nederland toe';
    controlDivNed.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '20px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.innerHTML = '<b>Nederland</b>';
    controlUI.appendChild(controlText);
    google.maps.event.addDomListener(controlUI, 'click', function () {
        map.setCenter(nederland)
        map.setZoom(8)
    });

}
function PTControl(controlDivPT, map) {
    controlDivPT.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Ga naar Portugal toe';
    controlDivPT.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '20px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.innerHTML = '<b>Portugal</b>';
    controlUI.appendChild(controlText);
    google.maps.event.addDomListener(controlUI, 'click', function () {
        map.setCenter(portugal)
        map.setZoom(8)
    });

}


function initializeMap() {
    geocoder = new google.maps.Geocoder();
    var mapCentre = new google.maps.LatLng(46.71109, 1.7191036);
    var mapDivNed = document.getElementById('map-canvas');
    var mapDivPT = document.getElementById('map-canvas');
    var myOptions = {
        zoom: 5,
        minZoom: 5,
        maxZoom: 20,
        center: mapCentre,
        streetViewControl: false,
        mapTypeControl: false,
        panControl: false,
        mapTypeControlOptions: {
            mapTypeId: [google.maps.MapTypeId.ROADMAP, my_custom_style]
        },
        mapTypeId: my_custom_style,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions, mapDivNed, mapDivPT);
    getImagesInfo();
    var styledMapOptions = {
        name: 'Custom Style'
    };

    var homeControlDivNed = document.createElement('div');
    var homeControlDivPT = document.createElement('div');
    var homeControl = new NedControl(homeControlDivNed, map);
    var homeControlPT = new PTControl(homeControlDivPT, map);


    homeControlDivNed.index = 1;
    homeControlDivPT.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDivNed);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDivPT);

    var featureOpts = [
        {"featureType": "poi", "elementType": "all", "stylers": [
            {"hue": "#000000"},
            {"saturation": -100},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "poi", "elementType": "all", "stylers": [
            {"hue": "#000000"},
            {"saturation": -100},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "administrative", "elementType": "all", "stylers": [
            {"hue": "#000000"},
            {"saturation": 0},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "administrative.country", "elementType": "labels", "stylers": [
            {"hue": "#595F63"},
            {"saturation": 0},
            {"lightness": -100},
            {"visibility": "on"}
        ]},
        {"featureType": "administrative.city", "elementType": "labels", "stylers": [
            {"hue": "#595F63"},
            {"saturation": 0},
            {"lightness": -100},
            {"visibility": "on"}
        ]},
        {"featureType": "road", "elementType": "labels", "stylers": [
            {"hue": "#ffffff"},
            {"saturation": -100},
            {"lightness": 100},
            {"visibility": "off"}
        ]},
        {"featureType": "water", "elementType": "labels", "stylers": [
            {"hue": "#000000"},
            {"saturation": -100},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "road.local", "elementType": "all", "stylers": [
            {"hue": "#ffffff"},
            {"saturation": -100},
            {"lightness": 100},
            {"visibility": "on"}
        ]},
        {"featureType": "water", "elementType": "geometry", "stylers": [
            {"hue": "#ffffff"},
            {"saturation": -100},
            {"lightness": 100},
            {"visibility": "on"}
        ]},
        {"featureType": "transit", "elementType": "labels", "stylers": [
            {"hue": "#000000"},
            {"saturation": 0},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "landscape", "elementType": "labels", "stylers": [
            {"hue": "#000000"},
            {"saturation": -100},
            {"lightness": -100},
            {"visibility": "off"}
        ]},
        {"featureType": "road", "elementType": "geometry", "stylers": [
            {"hue": "#bbbbbb"},
            {"saturation": -100},
            {"lightness": 26},
            {"visibility": "on"}
        ]},
        {"featureType": "landscape", "elementType": "geometry", "stylers": [
            {"hue": "#dddddd"},
            {"saturation": -100},
            {"lightness": -3},
            {"visibility": "on"}
        ]}
    ];
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(my_custom_style, customMapType);


}


google.maps.event.addDomListener(window, 'load', initializeMap);

