'use strict';

require.config({
	paths:{
		jquery: 'libs/jquery/jquery-min', 
		jquerymobile: 'libs/jquery-mobile/jquery-mobile-min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		text: 'libs/require/text',
//	cordova: 'libs/cordova/cordova-2.7.0'
		cordova: 'cordova-empty',
		socketio: '/socket.io/socket.io'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',
		},
		cordova: {
			exports: 'cordova'
		},
		app: {
			deps: ['jquery', 'underscore', 'backbone', 'cordova', 'jqmobile']
		},
		socketio:
		{
				exports: 'io'
		}
	}
});

require(['views/app', 'router', 'vm', 'socket'], function(AppView, Router, Vm, AppSocket) {
//	document.addEventListener('deviceready', function () {
//		App.initialize();
		var appView = Vm.create({}, 'AppView', AppView);
		appView.render();
//		require( [ "jquerymobile" ], function() {
			Router.initialize({ appView: appView });
//		});
//	}, false);

	AppSocket.addListener('my custom event', function(data) {
			console.log("Received data from custom listener");
			console.log(data);
	});
});


