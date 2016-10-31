function initialize() {
    var myOptions = {
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var all = [
        ["Location 1", "Summerdale Rd", "Elon", "NC",
        "27253", "36.150491", "-79.5470544"],
        ["Location 2", "7205 Olmstead Dr", "Burlington", "NC",
        "27215", "36.069974", "-79.548101"],
        ["Location 3", "W Market St", "Graham", "NC",
        "27253", "36.0722225", "-79.4016207"],
        ["Location 4", "Mt Hermon Rock Creek Rd", "Graham", "NC",
        "27253", "35.9826328", "-79.4165216"],
        ["Location 5", "415 Spring Garden St", "Greensboro", "NC",
        "27401", "36.06761", "-79.794984"]
    ];
    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    var infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < all.length; i++) {
        var name = all[i][0], 
        address = all[i][1], 
        city = all[i][2],
        state = all[i][3], 
        zip = all[i][4], 
        lat = all[i][5], 
        lng = all[i][6], 
        latlngset = new google.maps.LatLng(lat, lng);
        var content = '<div class="map-content"><h3>' + name + '</h3>' + address + '<br />' + city + ', ' + state + ' ' + zip + '<br /><a href="http://maps.google.com/?daddr=' + address + ' ' + city + ', ' + state + ' ' + zip + '" target="_blank">Get Directions</a></div>';
        var marker = new google.maps.Marker({
            map: map,
            title: city,
            position: latlngset
        });
        google.maps.event.addListener(marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, content));
    }

}
google.maps.event.addDomListener(window, 'load', initialize);