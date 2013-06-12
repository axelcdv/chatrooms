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
					url: function() {
							console.log("Calculating url...");
							if (this.timestamp) {
									return this.mainUrl + "/t" + this.timestamp;
							} else {
									return this.mainUrl;
							}
					},

					initialize: function(options) {
							this.id = options.id || 0;
							this.mainUrl = Api.baseUrl + "/api/chatroom/" + this.id;
							this.fetch({ reset: true });
					},
					parse: function(response){
							this.room_name = response.room_name;
							this.timestamp = response.timestamp;
							console.log("Timestamp: " + this.timestamp);
							if (this.timestamp) {
									this.url();
									console.log(this.url);
							}
							this.num_msgs = response.num_msgs || 0;
							if(response.id && response.id !== this.id)
								console.log("Error: received different room id");
							return response.messages;
					}
			});

			return ChatroomCollection;
	}
);
