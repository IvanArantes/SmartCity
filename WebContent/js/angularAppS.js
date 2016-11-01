var app =  angular.module("SmartCityApp",[]);
app.controller("mapacontroller", function($scope){


$scope.kp = "Sensor:Sensor1";
$scope.ontology = "SensoresArduino";
$scope.token = "26e75ce8b75f4323bfd2657677911e55";
$scope.resultados = Array();
$scope.markers = [];
$scope.sessionKey = null;
$scope.connection;

$scope.querySens = "select * from SensoresArduino";

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
				
				if (typeof( retrollamadaIfOk )==='undefined' ) {
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
	

$scope.queryResultCall = function( mensajeSSAP ) {
	if ( mensajeSSAP != null ) {
		if (  mensajeSSAP.body != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true ) {
			console.log( "Mensagem Enviada com Sucesso!" + mensajeSSAP.body );
			
			
			for ( var i = 0; i < mensajeSSAP.body.data.length; i++ ) {
				result = JSON.stringify( mensajeSSAP.body.data[ i ], undefined, 2 );
                $scope.resultados.push(JSON.parse(result));
                $scope.markers.push($scope.resultados[i].SensoresArduino);
                //console.log($scope.resultados[i].SensoresArduino);
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
	console.log("Entrou para enviar query");
	if ( connection != null ) {
		 //console.log($scope.getSessionKey());
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
		$scope.sendCustomMessage($scope.ontology, $scope.querySens, $scope.queryResultCall);
	console.log("executado action");	
}

$scope.map;   
$scope.marker;
$scope.mapOptions = {
    zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: {lat: -16.68189, lng: -49.255539}
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
        position: $scope.results[0].geometry.location
      });
    } else {
      alert('Não foram encontrados resultados: ' + $scope.status);
    }
  });
}


$scope.setMarkers = function () {
 var icon = "img/icosensor.png";
 var infowindow = new google.maps.InfoWindow();

 for(var i = 0; i < $scope.markers.length; i++) {

 	var lat = $scope.markers[i].geometry.coordinates[0];
 	var lng = $scope.markers[i].geometry.coordinates[1];
 	var latlngset = new google.maps.LatLng(lat,lng);
	$scope.marker = new google.maps.Marker({
    position: latlngset,
    map: $scope.map,
	title: $scope.markers[i].sensor,
	icon: icon
  });
  	var content = '<p>Nome do Sensor: ' + $scope.markers[i].sensor  + '</p>' +  
	  '<p>Latitude: '+ lat + '</p>' +
	  '<p>Longitude: '+ lng + '</p>' +
	  '<p>Data da modificação: ' + $scope.markers[i].data_disparo.$date.substring(0,10) + '</p>';

	google.maps.event.addListener($scope.marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open($scope.map, marker);
            }
        })($scope.marker, content));
 
 	} 
	$scope.resultados = [];
	$scope.markers = [];
}



window.setTimeout($scope.conectar(),500);
window.setTimeout($scope.action,1000);
window.setInterval($scope.conectar(),1500);
window.setInterval($scope.action,2000);


});