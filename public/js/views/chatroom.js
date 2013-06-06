// js/views/chatroom.js

define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatroom',
		'views/message',
		'models/message',
		'text!templates/chatroom.html'
	],
	function($, _, Backbone, ChatroomCollection, MessageView, MessageModel, ChatroomTemplate) {
		var ChatroomView = Backbone.View.extend({
			el: '.ui-content',//'.curView',
//			template: _.template('<p>This is the chatroom view for chatroom: <%= id %></p>'),
			template: _.template(ChatroomTemplate),
			events: {
					'submit': 'sendMessage',
					'click button': 'sendMessage'
			},
			initialize: function(options) {
					this.collection = new ChatroomCollection({ id: options.id });
					this.collection.on('reset', this.render, this);
					this.collection.on('add', this.addOne, this);
			},
			render: function() {
					this.$el.html( this.template( { id: this.collection.id } ) );
					this.collection.forEach(this.addOne, this);
					return this;
			},
			addOne: function(message) {
					var messageView = new MessageView({ model: message });
					this.$el.children().first().append(messageView.render().el);
			},
			sendMessage: function(e) {
					e.preventDefault();
					var newMessage = new MessageModel({ 'url': 'http://localhost:3000/api/chatroom/' + this.collection.id });
					newMessage.save({ 'from': 'me', 'body': this.$('textarea[name=body]').val() });
				   this.collection.fetch();
			}	   
		});

		return ChatroomView;
	}
      );
