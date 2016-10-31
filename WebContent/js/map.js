var map;
var markers = [];
var lamps = [
	['Post1', -16.6720788, -49.2716087, 50],
	['Post2', -16.6720000, -49.2716087, 50],
	['Post3', -16.6690000, -49.2716087, 50],
	
];

function setMarkers(locations) {

    for (var i = 0; i < locations.length; i++) {
        var post = locations[i];
        var myLatLng = new google.maps.LatLng(post[1], post[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: post[0]
        });

        // Push marker to markers array
        markers.push(marker);
    }
}


function initialize() {
    var myLatlng = new google.maps.LatLng(-16.673343,-49.2715653);
    
	 var myOptions = {
		      zoom: 5,
		      center: myLatlng,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

	var newMarker = new google.maps.Marker({position: myLatlng, setMap: map, title: "Teste"});	
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    
    setMarkers(lamps);

    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Lampada 1</h1>'+
    '<div id="bodyContent">'+
    '<p>Nome:</p>' +
    '<p>Latitude:</p>' +
    '<p>Longitude:</p>' +
    '<p>Potencia:</p>' +
    '</div>'+
    '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

    
    var marker = new google.maps.Marker({
        position: Latlng, 
        map: map,
        title:"Indra"
    });   

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}



