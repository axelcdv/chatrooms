// js/collections/chatrooms.js

define([
	'jquery',
	'backbone',
	'models/metaroom',
	'api',
	'utils/storage'
	],
	function($, Backbone, MetaroomModel, Api, Storage) {
			var ChatroomsCollection = Backbone.Collection.extend({
					model: MetaroomModel,
					url: Api.baseUrl + '/api/chatrooms',
					initialize: function () {
						console.log("Fetching");
						this.fetch({ reset: true });
					},
			});

			return ChatroomsCollection;
	}
);

