// js/views/chatroom.js

var App = App || {};

App.Views.Chatroom = Backbone.View.extend({
	tagName: 'div',
	model: App.Models.Chatroom,
	template: _.template( '<h3><%= model.attributes.name %></h3' ),

	initialize: function(){
		console.log(this.model);
		this.listenTo(this.model, 'change', this.render)
	},

	render: function(){
		this.$el.html( this.template( { model: this.model } ) );

		return this;
	}
});
