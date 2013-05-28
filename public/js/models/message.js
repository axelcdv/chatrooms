// js/models/message.js

var App = App || {};

App.Models.Message = Backbone.Model.extend({
	default: {
		from: '',
		body: ''
	}
});
