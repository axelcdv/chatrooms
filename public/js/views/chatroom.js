// js/views/chatroom.js

var App = App || {};

App.Views.Chatroom = Backbone.View.extend({
	tagName: 'div',
	collection: App.Collections.Chatroom,
	template: _.template( '<h3><%= room_name %></h3>'
	       + '<form><input name=body type="text" /><button>Send</button></form>'	),

	events: {
		'submit': 'sendMessage'
	},

	initialize: function(options){
		console.log(options.room_id);
		this.collection = new App.Collections.Chatroom({ url: '/api/chatroom/' + options.room_id, room_id: options.room_id });
		this.listenTo(this.collection, 'all', this.render);
	},

	render: function(){
		this.$el.html(this.template( { room_name: this.collection.room_name } ));

		this.collection.forEach(this.addOne, this);
		return this;
	},

	addOne: function(message){
		var messageView = new App.Views.Message({ model: message });
		this.$el.append(messageView.render().el);
	},

	sendMessage: function(e) {
		e.preventDefault();
		console.log('Saving message from me with body: ' + this.$('input[name=body]').val() + ' to: room id: ' + this.collection.room_id);
		var newMessage = new App.Models.Message({ 'url': '/api/chatroom/' + this.collection.room_id });
		newMessage.url = '/api/chatroom/' + this.collection.room_id;
		newMessage.save({ 'from': 'me', 'body': this.$('input[name=body]').val() });
		this.collection.fetch();
	}

});
