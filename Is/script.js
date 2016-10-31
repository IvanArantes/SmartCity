angular.module("crud", ["sofia2"/*, firebase*/]);
angular.module("crud", []).controller("crudCtrl", function ($scope/*, $window, $firebaseArray*/) {
	$scope.app = "CRUD AngularJS";
	$scope.contatos = [
		{nome: "Pedro", email: "djfo@gflakds.com"},
		{nome: "Ana", email: "dsaf@kkg.com.br"},
		{nome: "Maria", email: "gggm@fkls.com.net"}
	];
	$scope.adicionarContato = function (contato) {
		$scope.contatos.push(angular.copy(contato));
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	};
	$scope.enviarContato = function (temperatura){
			var ontologyInstance='"Sensor": { "geometry": {"coordinates": [40.512967, -3.67495 ],"type": "Point" },"assetId": "S_Temperatura_00066", "measure": '+temperatura+', "timestamp": {"$date": "2014-04-29T08:24:54.005Z" }}';
			sofia2.insert(ontologyInstance, 'SensorTemperaturaEjBienvenida', function(mensajeSSAP){
				if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
					$("#infoSensorTemperatura").text("Temperatura Enviada").show();
				}else{
					$("#infoSensorTemperatura").text("Error Enviando Temperatura").show();
				}
			}, sessionKey);
		}
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if(!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	};
	$scope.classe = "selecionado";





	var sessionKey;
			
		$(function(){
			 dwr.engine.setActiveReverseAjax(true);
			 dwr.engine.setErrorHandler(errorHandler);
			 dwr.engine.setTimeout(0);
		});

		function errorHandler(message, ex){   
			log( "ERROR:" + ex.message );
		}
    var token = "19c0b76e273645dcb9d9a66f5bce87cc";
    var instance = "KP_TestPJ:TestJP";
	$scope.conectarSIB =  function (token, instance){
			sofia2.joinToken(token, instance, function(mensajeSSAP){
				if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
					sessionKey = mensajeSSAP.sessionKey;
					alert($("#infoConexion").text("Conectado al sib con sessionkey: "+mensajeSSAP.sessionKey).show());
				}else{
					alert($("#infoConexion").text("Error conectando del sib").show());
				}
			});
		}

		function desconectarSIB() {
			sofia2.leave(function(mensajeSSAP){
				if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
					$("#infoConexion").text("Desconectado del sib").show();
				}else{
					$("#infoConexion").text("Error desconectando del sib").show();
				}
			}, sessionKey);
		} 

	/*//////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////
	/////////////////////Conexão com Firebase//////////////////////////
  	var ref = new Firebase("https://crud-2edb3.firebaseio.com/");

  	$scope.contatos = $firebaseArray(ref);

	$scope.adicionarContato = function (contato) {
    	$scope.contatos.$add(contato);
        $window.alert("Contato salvo: " + contato.nome); 
        $scope.clearPage();
  	};/////////////////////////////////////////////////////////////////
  	///////////////////////////////////////////////////////////////////
  	//////////////////////////////////////////////////////////////////*/
});