/*******************************************************************************
 * © Indra Sistemas, S.A.
 * 2013 - 2014  SPAIN
 * 
 * All rights reserved
 ******************************************************************************/
// Use and IIFE according to the pattern described in:
// http://appendto.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
(function(sofia2, $, undefined) {
	window.sessionKey = null;
	var sibServer = null;
	var websocket = null;
	
	try {
		if(pathToWebsocketServer) {
			sibServer=pathToWebsocketServer;
		}
	} catch(e) {}
	
	try {
		if(pathToDwrServlet) {
			sibServer=pathToDwrServlet + '/';
		}
	} catch(e) {}
	
	sofia2.cipherKey = null;
	sofia2.kpName = null;
	
	// JOIN Operation
	sofia2.join = function(user, pass, instance, joinResponse) {
		var queryJoin = '{"body":{"instance":"'
				+ instance
				+ '","password":"'
				+ pass
				+ '","user":"'
				+ user
				+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":null}';
		sendMessage("JOIN", queryJoin, false, joinResponse);
	};
	
	
	// JOIN Operationto renovate session key
	sofia2.joinRenovateSessionKey = function(user, pass, instance, joinResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryJoin = '{"body":{"instance":"'
				+ instance
				+ '","password":"'
				+ pass
				+ '","user":"'
				+ user
				+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":"' + sessionKey + '"}';
		sendMessage("JOIN", queryJoin, false, joinResponse);
	};
	
	
	
	// JOIN Operation to renovate session key
	sofia2.joinCipher = function(user, pass, instance, joinResponse) {
		var queryJoin = '{"body":{"instance":"'
				+ instance
				+ '","password":"'
				+ pass
				+ '","user":"'
				+ user
				+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":null}';
		sendMessage("JOIN", queryJoin, true, joinResponse);
	};
	
	// JOIN Operation to renovate session key
	sofia2.joinRenovateSessionCipher = function(user, pass, instance, joinResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryJoin = '{"body":{"instance":"'
				+ instance
				+ '","password":"'
				+ pass
				+ '","user":"'
				+ user
				+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":"' + sessionKey + '"}';
		sendMessage("JOIN", queryJoin, true, joinResponse);
	};
	
	
	//JOIN By Token
	sofia2.joinToken = function(token, instance, joinResponse) {
		var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","token":"'
			+ token
			+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":null}';
		sendMessage("JOIN", queryJoin, false, joinResponse);
	};
	
	
	//JOIN By Token to renovate session key
	sofia2.joinTokenRenovateSession = function(token, instance, joinResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","token":"'
			+ token
			+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":"' + sessionKey + '"}';
		sendMessage("JOIN", queryJoin, false, joinResponse);
	};
	
	
	//JOIN By Token Operation
	sofia2.joinTokenCipher = function(token, instance, joinResponse) {
		var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","token":"'
			+ token
			+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":null}';
		sendMessage("JOIN", queryJoin, true, joinResponse);
	
	};
	
	//JOIN By Token Operation to renovate session key
	sofia2.joinTokenRenovateSessionCipher = function(token, instance, joinResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","token":"'
			+ token
			+ '"},"direction":"REQUEST","messageType":"JOIN","sessionKey":"' + sessionKey + '"}';
		sendMessage("JOIN", queryJoin, true, joinResponse);
	
	};
	
	// LEAVE Operation
	sofia2.leave = function(leaveResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryLeave = '{"body":{},"direction":"REQUEST","messageType":"LEAVE","sessionKey":"'
				+ sessionKey + '"}';
		sendMessage("LEAVE", queryLeave, false, leaveResponse);
	};
	
	// LEAVE Operation
	sofia2.leaveCipher = function(leaveResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryLeave = '{"body":{},"direction":"REQUEST","messageType":"LEAVE","sessionKey":"'
				+ sessionKey + '"}';
		sendMessage("LEAVE", queryLeave, true, leaveResponse);
	};

	
	//##################################
	// INSERT Operation
	sofia2.insert = function(data, ontology, insertResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		data=addQuotesToData(data);
		data = data.replace(/'/g, '"');
		var queryInsert = '{"body":{"data":'
				+ data
				+ ',"query":null},"direction":"REQUEST","messageType":"INSERT","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';				
		sendMessage("INSERT", queryInsert, false, insertResponse);
	};
	
	// INSERT Operation
	sofia2.insertWithQueryType = function(data, ontology, queryType, insertResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryInsert = '';
		
		if(queryType=="NATIVE"){
			queryInsert = '{"body":{"data":'
					+ data
					+ ',"query":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageType":"INSERT","ontology":"'
					+ ontology + '","sessionKey":"' + sessionKey + '"}';
		}else{
			queryInsert = '{"body":{"query":"'
						+ data
						+ '","data":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageType":"INSERT","ontology":"'
						+ ontology + '","sessionKey":"' + sessionKey + '"}';
		}
		sendMessage("INSERT", queryInsert, false, insertResponse);
	};
	
	// INSERT Operation
	sofia2.insertCipher = function(data, ontology, insertResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		data=addQuotesToData(data);
		data = data.replace(/'/g, '"');
		
		var queryInsert = '{"body":{"data":'
				+ data
				+ ',"query":null},"direction":"REQUEST","messageType":"INSERT","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("INSERT", queryInsert, true, insertResponse);
	};
	
	// INSERT Operation
	sofia2.insertWithQueryTypeCipher = function(data, ontology, queryType, insertResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryInsert = '';
		
		if(queryType=="NATIVE"){
			queryInsert = '{"body":{"data":'
					+ data
					+ ',"query":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageType":"INSERT","ontology":"'
					+ ontology + '","sessionKey":"' + sessionKey + '"}';
		}else{
			queryInsert = '{"body":{"query":"'
						+ data
						+ '","data":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageType":"INSERT","ontology":"'
						+ ontology + '","sessionKey":"' + sessionKey + '"}';
		}
		sendMessage("INSERT", queryInsert, true, insertResponse);
	};
	
	
	//##################################
	// UPDATE Operation
	sofia2.update = function(data, query, ontology, updateResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryUpdate = '{"body":{"data":"'
				+ data
				+ '","query":"'
				+ query
				+ '"},"direction":"REQUEST","messageType":"UPDATE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("UPDATE", queryUpdate, false, updateResponse);
	};
	
	// UPDATE Operation
	sofia2.updateWithQueryType = function(data, query, ontology, queryType, updateResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryUpdate = '{"body":{"data":"'
				+ data
				+ '","query":"'
				+query
				+'","queryType":"'
				+queryType+
				'"},"direction":"REQUEST","messageType":"UPDATE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("UPDATE", queryUpdate, false, updateResponse);
	};
	
	// UPDATE Operation
	sofia2.updateCipher = function(data, query, ontology, updateResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryUpdate = '{"body":{"data":"'
				+ data
				+ '","query":"'
				+ query
				+ '"},"direction":"REQUEST","messageType":"UPDATE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';				
		sendMessage("UPDATE", queryUpdate, true, updateResponse);
	};
	
	// UPDATE Operation
	sofia2.updateWithQueryTypeCipher = function(data, query, ontology, queryType, updateResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryUpdate = '{"body":{"data":"'
				+ data
				+ '","query":"'
				+query
				+'","queryType":"'
				+queryType+
				'"},"direction":"REQUEST","messageType":"UPDATE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';			
		sendMessage("UPDATE", queryUpdate, true, updateResponse);
	};

	//##################################
	//REMOVE Operation
	sofia2.remove = function(query, ontology, removeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryRemove = '{"body":{"data":null,"query":"'
				+ query
				+ '"},"direction":"REQUEST","messageType":"DELETE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("DELETE", queryRemove, false, removeResponse);
	};
	
	//REMOVE Operation
	sofia2.removeWithQueryType = function(query, ontology, queryType, removeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryRemove = '{"body":{"data":null,"query":"'
				+query
				+'","queryType":"'
				+queryType+
				'"},"direction":"REQUEST","messageType":"DELETE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("DELETE", queryRemove, false, removeResponse);
	};
	
	//REMOVE Operation
	sofia2.removeCipher = function(query, ontology, removeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryRemove = '{"body":{"data":null,"query":"'
				+ query
				+ '"},"direction":"REQUEST","messageType":"DELETE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("DELETE", queryRemove, false, removeResponse);
	};
	
	//REMOVE Operation
	sofia2.removeWithQueryTypeCipher = function(query, ontology, queryType, removeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryRemove = '{"body":{"data":null,"query":"'
				+query
				+'","queryType":"'
				+queryType+
				'"},"direction":"REQUEST","messageType":"DELETE","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
		sendMessage("DELETE", queryRemove, false, removeResponse);
	};
	
	
	//##################################
	// QUERY Operation
	sofia2.query = function(query, ontology, queryResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var querySib = '{"body":{"query":"' + query
				+ '"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';
		sendMessage("QUERY", querySib, false, queryResponse);
	};
		
	// QUERY with queryType Operation
	sofia2.queryWithQueryType = function(query, ontology, queryType, queryParams, queryResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var querySib='';		
		if(ontology!=null){
			ontology='"'+ontology+'"';
		}
		
		if(queryParams==null){
			var querySib = '{"body":{"query":"' 
				+ query
				+ '","queryType":"'
				+ queryType+'","queryParams": null},"direction":"REQUEST","ontology":' 
				+ ontology
				+ ',"messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';		
		}else{
			var querySib = '{"body":{"query":"' 
				+ query
				+ '","queryType":"'
				+ queryType+'","queryParams":'
				+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":' 
				+ ontology
				+ ',"messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';
		}
		sendMessage("QUERY", querySib, false, queryResponse);	
	};
		
	// QUERY Operation
	sofia2.queryCipher = function(query, ontology, queryResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var querySib = '{"body":{"query":"' + query
				+ '"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';				
		sendMessage("QUERY", querySib, true, queryResponse);
	};
	
	// QUERY Operation
	sofia2.queryWithQueryTypeCipher = function(query, ontology, queryType, queryParams, queryResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var querySib='';	
		if(ontology!=null){
			ontology='"'+ontology+'"';
		}
		
		if(queryParams==null){
			var querySib = '{"body":{"query":"' 
				+ query
				+ '","queryType":"'
				+ queryType+'","queryParams": null},"direction":"REQUEST","ontology":' 
				+ ontology
				+ ',"messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';	
		}else{
			var querySib = '{"body":{"query":"' 
				+ query
				+ '","queryType":"'
				+ queryType+'","queryParams":'
				+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":' 
				+ ontology
				+ ',"messageType":"QUERY","sessionKey":"'
				+ sessionKey + '"}';
		}
		sendMessage("QUERY", querySib, true, queryResponse);
	};
	
	// Private function
	function subscribeInternal(query, cipher, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		sendMessage("SUBSCRIBE", query, cipher, function(ssapMessage) {
			if (ssapMessage.body.ok) {
				subscribeResponse(ssapMessage.body.data);
			} else {
				subscribeResponse(null);
			}
		});
	}
	
	// SUBSCRIBE Operation
	sofia2.subscribe = function(subscription, ontology, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryMongo = subscription;
		var querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","sessionKey":"'
				+ sessionKey + '"}';	
		subscribeInternal(querySubscribe, false, subscribeResponse);
	};
	
	// SUBSCRIBE Operation
	sofia2.subscribeWithQueryType = function(subscription, ontology, queryType, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
	
		var queryMongo = subscription;
		var querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","sessionKey":"'
				+ sessionKey + '"}';	
		subscribeInternal(querySubscribe, false, subscribeResponse);
	};
	
	// SUBSCRIBE Operation
	sofia2.subscribeWithQueryTypeSibDefinedParams = function(subscription, ontology, queryType, queryParams, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryMongo = subscription;
		var querySubscribe="";
		if(queryParams==null){
			querySubscribe = '{"body":{"query":"' + queryMongo
					+ '","msRefresh":"' + refresh
					+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
					+ '","messageType":"SUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
		}else{
			querySubscribe = '{"body":{"query":"' + queryMongo
					+ '","msRefresh":"' + refresh
					+ '","queryType":"'+queryType+'","queryParams":'
					+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' + ontology
					+ '","messageType":"SUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
		}
		subscribeInternal(querySubscribe, false, subscribeResponse);
	};
		
	// SUBSCRIBE Operation
	sofia2.subscribeCipher = function(subscription, ontology, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryMongo = subscription;
		var querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","sessionKey":"'
				+ sessionKey + '"}';
	
		subscribeInternal(querySubscribe, true, subscribeResponse);
	};
	
	
	// SUBSCRIBE Operation
	sofia2.subscribeWithQueryTypeSibDefinedParamsCipher = function(subscription, ontology, queryType, queryParams, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryMongo = subscription;
		var querySubscribe="";
		if(queryParams==null){
			querySubscribe = '{"body":{"query":"' + queryMongo
					+ '","msRefresh":"' + refresh
					+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
					+ '","messageType":"SUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
		}else{
			querySubscribe = '{"body":{"query":"' + queryMongo
					+ '","msRefresh":"' + refresh
					+ '","queryType":"'+queryType+'","queryParams":'
					+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' + ontology
					+ '","messageType":"SUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
		}	
		subscribeInternal(querySubscribe, true, subscribeResponse);
	};
	
	// SUBSCRIBE Operation
	sofia2.subscribeWithQueryTypeCipher = function(subscription, ontology, queryType, refresh, subscribeResponse, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		var queryMongo = subscription;
		var querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","sessionKey":"'
				+ sessionKey + '"}';	
		subscribeInternal(querySubscribe, true, subscribeResponse);
	};
	
	// UNSUBSCRIBE Operation
	sofia2.unsubscribe = function(subscriptionId, unsubscribeResponse, unsubscribeMessages, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		if (subscriptionId != null) {
			var queryUnsubscribe = '{"body":{"idSuscripcion":"'
					+ subscriptionId
					+ '"},"direction":"REQUEST","messageType":"UNSUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
			sendMessage("UNSUBSCRIBE", queryUnsubscribe, false, function(mensajeSSAP) {
				if (mensajeSSAP != null && mensajeSSAP.body.data != null
						&& mensajeSSAP.body.ok == true) {
				}
				unsubscribeResponse(mensajeSSAP);
			});
		}else {
			unsubscribeMessages("ERROR_1");
		}
	};
	
	
	// UNSUBSCRIBE Operation
	sofia2.unsubscribeCipher = function(subscriptionId, unsubscribeResponse, unsubscribeMessages, sessionKey) {
		if (!sessionKey) {
			sessionKey = window.sessionKey;
		}
		
		if (subscriptionId != null) {
			var queryUnsubscribe = '{"body":{"idSuscripcion":"'
					+ subscriptionId
					+ '"},"direction":"REQUEST","messageType":"UNSUBSCRIBE","sessionKey":"'
					+ sessionKey + '"}';
			sendMessage("UNSUBSCRIBE", queryUnsubscribe, true, function(mensajeSSAP) {
				if (mensajeSSAP != null && mensajeSSAP.body.data != null
						&& mensajeSSAP.body.ok == true) {
				}
				unsubscribeResponse(mensajeSSAP);
			});
		}else {
			unsubscribeMessages("ERROR_1");
		}
	};
	
	// #################################################################
	// Auxiliary functions
	// #################################################################

	function sendMessage(tipoQuery, query, cipherMessage, responseCallback){
		if(typeof pathToDwrServlet !== 'undefined') {
			sendMessageDWR(tipoQuery, query, cipherMessage, responseCallback);
		}else if(typeof pathToWebsocketServer !== 'undefined') {
			sendMessageWS(tipoQuery, query, cipherMessage, responseCallback);
		}else{
			throw "SIB Server is not a valid DWR or WebSocket endpoint";
		}
	}
	
	//Buffer de peticiones pendientes para envio por websocket
	var pendingWSRequestsBuffer = [];  
	
	function appendRequestWS(_tipoQuery, _query, _cipherMessage, _responseCallback){
		//Añade a la cola de peticiones pendites la solicitud
		pendingWSRequestsBuffer.push({tipoQuery:_tipoQuery, query:_query, cipherMessage:_cipherMessage, responseCallback:_responseCallback});
		
		//Si una vez añadido, solo hay un elemento, lo envia al SIB
		if(pendingWSRequestsBuffer.length==1){
			
			var queryToSend=pendingWSRequestsBuffer[0].query;
			if(pendingWSRequestsBuffer[0].cipherMessage){
				if(_tipoQuery=="JOIN"){
					queryToSend=sofia2.kpName.length+"#"+sofia2.kpName+ Base64.encode(XXTEA.encrypt(queryToSend, sofia2.cipherKey), false);
				}else{
					queryToSend=Base64.encode(XXTEA.encrypt(queryToSend, sofia2.cipherKey));
				}
			}
			websocket.send(queryToSend);
		}
	}
	
	
	function requestResolvedWS(mensajeSSAP){
	
		//Recupera el primer elemento de la cola de peticiones pendientes, que debe ser el que se acaba de resolver
		var resolved = pendingWSRequestsBuffer[0]; 
	
		//Recupera la sessionkey del mensaje de respuesta si se trata de un JOIN
		if(mensajeSSAP.messageType=="JOIN" && mensajeSSAP.body.data != null	&& mensajeSSAP.body.ok == true){
			sessionKey = mensajeSSAP.sessionKey;
		}
		
		//Invoca a la callback para informar la respuesta al callback de respuesta
		resolved.responseCallback(mensajeSSAP);
		
		//Desaloja la petición de la cola de peticiones pendientes
		pendingWSRequestsBuffer.shift();
		
		//Si hay mas peticiones pendientes, invoca a la siguiente petición al SIB
		if(pendingWSRequestsBuffer.length>0){
			var queryToSend=pendingWSRequestsBuffer[0].query;
			if(pendingWSRequestsBuffer[0].cipherMessage){
				if(pendingWSRequestsBuffer[0].tipoQuery=="JOIN"){
					queryToSend=sofia2.kpName.length+"#"+sofia2.kpName+ Base64.encode(XXTEA.encrypt(queryToSend, sofia2.cipherKey), false);
				}else{
					queryToSend=Base64.encode(XXTEA.encrypt(queryToSend, sofia2.cipherKey));
				}
			}
			websocket.send(queryToSend);
		}
		
	}
	
	
	
	function sendMessageWS(tipoQuery, query, cipherMessage, responseCallback){
		//Si no está creado el websocket --> lo crea
		 if ("WebSocket" in window) {
			if(websocket==null){
				websocket = new WebSocket(sibServer);
				websocket.onopen = function() {
					//Para la primera peticion espera a que esté abierta la conexión y lo añade a la cola de peticiones
					appendRequestWS(tipoQuery, query, cipherMessage, responseCallback);
					
				};
				
				websocket.onmessage = function (evt) {
					var received_msg = evt.data.trim();
					if(received_msg!=''){
						mensajeSSAP = null;
						clearMsg = received_msg
						try{
							mensajeSSAP = sofia2.parsearMensajeSSAP(received_msg);//Consideramos que no está cifrado
							mensajeSSAP.messageType;//Provocamos el error en caso de que sea cifrado
						}catch(e){
							clearMsg=XXTEA.decrypt(Base64.decode(received_msg), sofia2.cipherKey);//Desciframos
							mensajeSSAP = sofia2.parsearMensajeSSAP(clearMsg);
						}
						
						//Si no es una notificación, se trata de una respuesta de solicitud
						if(mensajeSSAP.messageType!='INDICATION'){
							requestResolvedWS(mensajeSSAP)
						}else{
							//Si es una notificación, invoca a la callback
							try {
								if(indicationForSubscription) {
									indicationForSubscription(clearMsg);
								}
							} catch(e) {}
						}
						
					}
				};
				
				websocket.onclose = function(){ 
					// websocket is closed.
				};
			}else{
				//Añade la petición a la cola de peticiones
				appendRequestWS(tipoQuery, query, cipherMessage, responseCallback);
			}
		}else{
			throw "Your Browser does not support WebSocket";
		}
		
	}
	
	
	// Sends a SSAP Message of any type
	function sendMessageDWR(tipoQuery, query, cipherMessage, responseCallback) {
	
		var mensajeSSAP = null;
		GatewayDWR._path = sibServer; // Avoid having GatewayDWR.js in local
		
		
		if(cipherMessage){
			if(tipoQuery=="JOIN"){
				query=sofia2.kpName.length+"#"+sofia2.kpName+ Base64.encode(XXTEA.encrypt(query, sofia2.cipherKey), false);
				
			}else{
				query=Base64.encode(XXTEA.encrypt(query, sofia2.cipherKey));
			}
		
		}
		
		GatewayDWR.process(query, function(data) {
		
			if(cipherMessage){
				data=XXTEA.decrypt(Base64.decode(data), sofia2.cipherKey);
			}
			
			if(tipoQuery=="INSERT" || tipoQuery=="UPDATE" || tipoQuery=="DELETE"){
				mensajeSSAP = sofia2.parsearMensajeSSAP(data);
			}else{
				mensajeSSAP = sofia2.parsearMensajeSSAP(sofia2.validarSSAPConDataString(data));
			}
				
			
			// Ok
			if (mensajeSSAP != null && mensajeSSAP.body.data != null
					&& mensajeSSAP.body.ok == true) {
				switch (tipoQuery) {
				case "JOIN":
					sessionKey = mensajeSSAP.sessionKey;
					responseCallback(mensajeSSAP);
					break;
				case "LEAVE":
					sessionKey = null;
					responseCallback(mensajeSSAP);
					break;
				case "INSERT":
					responseCallback(mensajeSSAP);
					break;
				case "QUERY":
					responseCallback(mensajeSSAP);
					break;
				case "SUBSCRIBE":
					responseCallback(mensajeSSAP);
					break;
				default:
					responseCallback(mensajeSSAP);
				}
			}
			// Error
			else {
				responseCallback(mensajeSSAP);
			}
		});
	
	}
	
	
	// Devuelve un mensaje SSAP JSON parseado a un objeto Javascript
	sofia2.parsearMensajeSSAP = function(mensaje) {
		try {
			return $.parseJSON(mensaje.replace(/'/g, "\\\""));
		} catch (e) {
			return null;
		}
	};
	
	// Devuelve un string JSON SSAP válido
	sofia2.validarSSAPConDataString = function(datos) {
		return datos.replace(/(body|data)\"\s*:\s*\"({|\[)/g, "$1\":$2").replace(
				/(}|])\"\s*,\s*\"(direction|ontology|message|session|error|ok)/g,
				"$1,\"$2").replace(/\\+\"/g, "\"");
	};
	
	sofia2.validarSSAP = function(datos) {
		
		return datos.replace(/\\+\"/g, "\"").replace(
				/(body|data)\"\s*:\s*\"({|\[)/g, "$1\":$2").replace(
				/(}|])\"\s*,\s*\"(direction|ontology|message|session|error|ok)/g,
				"$1,\"$2");
	};
	
	sofia2.escapeJSONObject = function(datos){
		return datos.replace(/\"/g, "\\\"").replace(/\\\\\"/g, "\\\\\\\"");
	};
	
	function addQuotesToData(data){
		if (data.indexOf("{")!=0)
			data="{"+data+"}";
			
		return data;
	}

} (window.sofia2 = window.sofia2 || {}, jQuery));