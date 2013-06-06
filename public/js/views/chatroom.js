// js/views/chatroom.js

define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatroom',
		'views/message',
		'text!templates/chatroom.html'
	],
	function($, _, Backbone, ChatroomCollection, MessageView, ChatroomTemplate) {
		var ChatroomView = Backbone.View.extend({
			el: '.ui-content',//'.curView',
//			template: _.template('<p>This is the chatroom view for chatroom: <%= id %></p>'),
			template: _.template(ChatroomTemplate),
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
			}
		});

		return ChatroomView;
	}
      );
