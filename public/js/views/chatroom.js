// js/views/chatroom.js

var App = App || {};

App.Views.Chatroom = Backbone.View.extend({
	tagName: 'div',
	model: App.Models.Chatroom,
	template: _.template( '<h3><%= model.attributes.name %></h3' ),
	previewTemplate: _.template('<h3><a href="#"><%= name %></a></h3>'),

	events: {
		'click a': 'gotochat'
	},

	initialize: function(){
		console.log(this.model);
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		this.$el.html( this.template( { model: this.model } ) );

		return this;
	},

	renderPreview: function(){
		this.$el.html( this.previewTemplate( this.model.attributes ));

		$('a').click(function(e){
			e.preventDefault();
			// TODO go to chatroom
			console.log('Going to chatroom: ' + this.model.attributes.id);
		});

		return this;
	},

	gotochat: function(e) {
		e.preventDefault();
		// TODO go to chatroom
		console.log('Going to chatroom ' + this.model.attributes.id);
	}

});
