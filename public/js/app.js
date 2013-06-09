// js/views/app.js

define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone){
			
        var AppView = Backbone.View.extend({
        	el: $('#chatroomapp'),
        	Views: {},
            	Models: {},
            	Collections: {},
            	template: _.template('<h2>Chatrooms here</h2><div id="chatrooms"></div>'),
            	render: function(){
        		this.$el.html( this.template() );
        	},
            	initialize: function() {
        	},
            	start: function(){
        //		Backbone.history.start({pushState: true});
        	}
        });

	return AppView;

});

