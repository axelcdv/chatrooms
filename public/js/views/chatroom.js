// js/views/chatroom.js

var App = App || {};

App.Views.Chatroom = Backbone.View.extend({
	tagName: 'div',
	template: _.template( '<h3><%= model.name %></h3' ),

	render: function(){
		this.$el.html( this.template( this.model.attributes ) );

		return this;
	}
});
