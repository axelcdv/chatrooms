// js/collections/messages.js

var App = App || {};

App.Collections.Chatroom = Backbone.Collection.extend({
	//url: '/api/chatroom',
	model: App.Models.Message,

	initialize: function(options){
		console.log(options);
		this.url = options.url;
		console.log('Chatroom, url: ' + this.url);
		this.fetch();
	},

	parse: function(response){
		this.room_name = response.room_name;
		return response.messages;
	}
});
