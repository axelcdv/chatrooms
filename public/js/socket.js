define([
	'events',
	//'libs/socket.io-client/socket.io-client'
	'socketio',
	'api'
	],
	function( Events, io, Api ) {
					var socket = io.connect(Api.baseUrl);
//					var socket = require(['socketio'])( Api.baseUrl);

					socket.on('news', function(data) {
							console.log( data );
							socket.emit('my other event', { my: 'data' });
					});

					socket.on('message', function(data) {
							console.log( data );
							Events.trigger('message', data);
					});

					Events.on('sendMessage', function( message ) {
							console.log('Sending message through socket.io...');
							console.log( message );
							socket.emit('message', message);
					});

					var addListener = function (eventListened, fun) {
							// TODO check arguments, maybe package fun
							socket.on(eventListened, fun);
					};

			var AppSocket = {
					addListener: addListener
			};

			return AppSocket;
	}
	);
