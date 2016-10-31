//class de conexão do sofia2
var Connection = function() {
	var sessionKey = null;
	
	this.getSessionKey = function() {
		return sessionKey;
	}
	
	this.connect = function( ontology, kp, token, retrollamadaIfOk ) {
		sofia2.joinToken( token, kp, function( mensajeSSAP ) {			
			if ( mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true ) {
				sessionKey = mensajeSSAP.sessionKey;
				
				if (typeof( retrollamadaIfOk )==='undefined' ) {
				}
				else {
					retrollamadaIfOk( sessionKey );
				}
			}
			else {
					alert( "Error\n" +  mensajeSSAP.body.error );
			}
		} );
	}
	
	this.leave = function( retrollamadaIfOk ) {
		sofia2.leave( function( mensajeSSAP ) {			
			sessionKey = null;
			if ( mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true ) {
			  retrollamadaIfOk();
			}
			else {
				alert( "Error\n" +  mensajeSSAP.body.error );
			}

		} );
	}
}
