var app =  angular.module("SmartCityApp",[]);
app.controller("mapacontroller", function($scope){


$scope.kp = "Led:Led1";
$scope.ontology = "LedArduino";
$scope.token = "963332f6a53f41e5b639a14e653eb694";
$scope.markers = [];
$scope.markersBkp = [];
$scope.sessionKey = null;
$scope.connection;
$scope.markerMap = [];

$scope.queryLamp = "select * from LedArduino";

$( function() {
    dwr.engine.setActiveReverseAjax( false );
    dwr.engine.setTimeout(0);
		dwr.engine.setErrorHandler( function( arg ){ alert( arg ) } );
		
		connection = new Connection();
});

//class de conexão do sofia2
var Connection = function() {
$scope.sessionKey;
	
	$scope.getSessionKey = function() {
		return $scope.sessionKey;
	}
}
$scope.connect = function( ontology, kp, token, retrollamadaIfOk ) {
		sofia2.joinToken( token, kp, function( mensajeSSAP ) {		
			if ( mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true ) {
				$scope.sessionKey = mensajeSSAP.sessionKey;
				
				if (typeof( retrollamadaIfOk )==='undefineddis' ) {
				}
				else {
					retrollamadaIfOk( $scope.sessionKey );
				}
			}
			else {
					alert( "Error\n" +  mensajeSSAP.body.error );
			}
		} );
	}
	
$scope.addInArray = function(elemento){
	console.log("Tamanho do markers: " + $scope.markers.length);
	var diferente = true;
	var i = 0;
	while(i < $scope.markers.length && diferente) {
		console.log(elemento.led + ' ' + $scope.markers[i].led);
		if(elemento.led = $scope.markers[i].led){
 			diferente = false;
		}
	i++;}
		if(diferente){
			 $scope.markers.push(JSON.parse(result).LedArduino);
		}
		else{
			$scope.markers[i] = elemento;
		}
}

$scope.queryResultCall = function( mensajeSSAP ) {
	if ( mensajeSSAP != null ) {
		if (  mensajeSSAP.body != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true ) {
			console.log( "Mensagem Enviada com Sucesso!" + mensajeSSAP.body );
			
			var result = null;
			for ( var i = 0; i < mensajeSSAP.body.data.length; i++ ) {
				result = JSON.stringify( mensajeSSAP.body.data[ i ], undefined, 2 );
				if($scope.markers.length == 0){
					$scope.markers.push(JSON.parse(result).LedArduino);}
				else{
					$scope.addInArray(JSON.parse(result).LedArduino);
					console.log(JSON.parse(result).LedArduino);
				}
			}
            $scope.setMarkers();
		}
		else {
		  $scope.resultbox = mensajeSSAP.body.error;
		}
	}
	else {
		$scope.resultbox = "Sem resultado";	
	}
}

// Funciones SIB sofia2
$scope.sendCustomMessage = function( ontologia, query, retrollamada ) {
	if ( connection != null ) {
		 $scope.sessionKey = $scope.getSessionKey();
		if ( $scope.sessionKey != null ) {
			sofia2.queryWithQueryType( query.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ''), ontologia, "SQLLIKE", null, retrollamada );
		}
		else {
			$scope.resultbox = "por favor realiza um join";
		}		 
	}
	else {
		$scope.resultbox = "por favor realiza um join(connection)";
	}
}

$scope.conectar = function() {
		$scope.connect($scope.ontology, $scope.kp, $scope.token, function( session ) {
			  console.log(session);
			}	
		);
	}

$scope.desconectar = function() {
	if ( connection != null ) {
		connection.leave(function( arg ) {$scope.resultbox = "desconectado";    });
	}
}

$scope.action = function() {
		$scope.sendCustomMessage($scope.ontology, $scope.queryLamp, $scope.queryResultCall);		
}

$scope.clonaArray = function() {
	for(var i = 0; i < $scope.markers.length; i++){
		$scope.markersBkp[i] = $scope.markers[i];
	}
}

 $scope.map;   
 $scope.marker;
 $scope.mapOptions = {
    zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: -16.673624 , lng: -49.269078}
  };

$scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
$scope.geocoder = new google.maps.Geocoder();
  
$scope.geocodeAddress = function(address) {
  $scope.address = address;
  $scope.geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      $scope.map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: $scope.map,
		animation: google.maps.Animation.DROP,
        position: $scope.results[0].geometry.location
      });
    } else {
      alert('Não foram encontrados resultados: ' + $scope.status);
    }
  });
}

$scope.calcularDiferenca = function(){
	return $scope.markers.length - $scope.markersBkp.length;
}

$scope.setMarkers = function () {

 var infowindow = new google.maps.InfoWindow();

		var icon = "img/lampadablue.png";
	
	if($scope.calcularDiferenca() != 0) {
		console.log($scope.calcularDiferenca());
		console.log("Markers: " + $scope.markers.length);
		console.log("MarkersBKP: " + $scope.markersBkp.length);
		for(var j = $scope.markers.length - $scope.calcularDiferenca(); j < $scope.markers.length; j++){
			var lat = $scope.markers[j].geometry.coordinates[0];
 			var lng = $scope.markers[j].geometry.coordinates[1];
			var latlngset = new google.maps.LatLng(lat,lng);
			$scope.marker = new google.maps.Marker({
    		position: latlngset,
    		map: $scope.map,
			title: $scope.markers[j].led,
			icon: icon
  			});
		
	
  	var content = '<p>Nome do Sensor: ' + $scope.markers[j].led  + '</p>' +  
	  '<p>Latitude: '+ lat + '</p>' +
	  '<p>Longitude: '+ lng + '</p>' +
	  '<p>Data da modificação: ' + $scope.markers[j].data_carga.$date.substring(0,10) + ' ' + $scope.markers[j].data_carga.$date.substring(11,19) + '</p>' + 
	  '<p>Potência: ' + $scope.markers[j].carga + '</p>';


	google.maps.event.addListener($scope.marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open($scope.map, marker);
            }
        })($scope.marker, content));

		$scope.markerMap.push($scope.marker);
		console.log("Vetor de marcação: " + $scope.markerMap);
		}
	}

	$scope.clonaArray();	
	}	



window.setTimeout($scope.conectar(),500);
window.setTimeout($scope.action,1000);
window.setInterval($scope.conectar(),5000);
window.setInterval($scope.action,6000);


});