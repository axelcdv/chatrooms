// js/collections/chatroom.js

define([
	'jquery',
	'backbone',
	'models/message',
	'api'
	],
	function($, Backbone, MessageModel, Api)
	{
			var ChatroomCollection = Backbone.Collection.extend({
					model: MessageModel,
					// URL here
					initialize: function(options) {
							this.id = options.id || 0;
							this.url = Api.baseUrl + "/api/chatroom/" + this.id;
							this.fetch({ reset: true });
					},
					parse: function(response){
							this.room_name = response.room_name
							if(response.id && response.id !== this.id)
								console.log("Error: received different room id");
							return response.messages;
					}
			});

			return ChatroomCollection;
	}
);
