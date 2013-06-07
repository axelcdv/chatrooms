// js/collections/chatrooms.js

define([
	'jquery',
	'backbone',
	'models/metaroom',
	'api'
	],
	function($, Backbone, MetaroomModel, Api) {
			var ChatroomsCollection = Backbone.Collection.extend({
					model: MetaroomModel,
					url: Api.baseUrl + '/api/chatrooms', // TODO
					initialize: function () {
						console.log("Fetching");
						this.fetch({ reset: true });
					}
			});

			return ChatroomsCollection;
	}
);

