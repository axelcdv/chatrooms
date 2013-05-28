// js/collections/chatrooms.js

var App = App || {};

App.Collections.Chatrooms = Backbone.Collection.extend({
	model: App.Models.Chatroom,
	url: '/api/chatrooms',

	initialize: function() {
		this.fetch();
	}
});
