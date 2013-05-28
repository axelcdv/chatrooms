// js/app.js

var App = new (Backbone.View.extend({
	el: $('#chatroomapp'),
	Views: {},
    	Models: {},
    	Collections: {},
    	template: _.template('<h2>Chatrooms here</h2>'),
    	render: function(){
		this.$el.html( this.template() );
	},
    	initialize: function() {
	},
    	start: function(){
		Backbone.history.start({pushState: true});
	}
}))();

$(function(){ 
	App.render();
	App.start(); 
//	new App.Views.Chatrooms();
});
