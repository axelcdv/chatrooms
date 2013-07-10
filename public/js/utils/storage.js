// js/utils/storage.js

define([
		'jquery',
		'cordova'
		],
		function( $, Cordova ) {
				var localStorage = window.localStorage;
				var sessionStorage = window.sessionStorage;

				return {
						local: localStorage,
						session: sessionStorage
				};
		}
	  );
