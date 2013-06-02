// js/views/chatroom.js

var App = App || {};

App.Views.Chatroom = Backbone.View.extend({
	tagName: 'div',
	collection: App.Collections.Chatroom,
	template: _.template( '<h3><%= model.attributes.name %></h3' ),

	events: {
		'click a': 'gotochat'
	},

	initialize: function(options){
		console.log(options.room_id);
		this.collection = new App.Collections.Chatroom({ url: '/api/chatroom/' + options.room_id });
		this.listenTo(this.collection, 'all', this.render);
//		console.log(this.model);
//		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
//		this.$el.html( this.template( { model: this.model } ) );
		this.$el.empty();
		this.collection.forEach(this.addOne, this);
		return this;
	},

	addOne: function(message){
		var messageView = new App.Views.Message({ model: message });
		this.$el.append(messageView.render().el);
	},

	gotochat: function(e) {
		e.preventDefault();
		// TODO go to chatroom
		console.log('Going to chatroom ' + this.model.attributes.id);
	}

});
