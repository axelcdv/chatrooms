// js/collections/chatrooms.js

var App = App || {};

App.Collections.Chatrooms = Backbone.Collection.extend({
	model: App.Models.MetaRoom,
	url: '/api/chatrooms',

	initialize: function() {
		console.log("Fetching");
		this.fetch();
		this.forEach(function(chatroom){
			alert(chatroom.get('name'));
		});
	}
});
