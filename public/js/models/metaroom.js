// js/models/metaroom.js

define([
	'jquery',
	'backbone',
	],
	function() {
			var MetaroomModel = Backbone.Model.extend({
					defaults: {
							id: 0,
							name: "",
							num_people: 0,
							num_msgs: 0,
							room_pic: "img/sloth2.jpg"
					}
			});

			return MetaroomModel;
	}
);
