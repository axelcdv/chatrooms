// js/views/chatroom.js

define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatroom',
		'views/message',
		'models/message',
		'text!templates/chatroom.html',
		'api'
	],
	function($, _, Backbone, ChatroomCollection, MessageView, MessageModel, ChatroomTemplate, Api) {
		var ChatroomView = Backbone.View.extend({
			//el: '.ui-content',//'.curView',
			template: _.template(ChatroomTemplate),
			events: {
					'submit': 'sendMessage',
					'click button': 'sendMessage',
					'keypress textarea[type=text]': 'submitOnEnter'
			},
			initialize: function(options) {
					this.collection = new ChatroomCollection({ id: options.id });
					this.collection.on('reset', this.render, this);
					this.collection.on('add', this.addOne, this);
					this.el = options.el || '.ui-content';
			},
			render: function() {
					console.log("Rendering chatroom");
					this.$el.html( this.template( { id: this.collection.id } ) );
					this.collection.forEach(this.addOne, this);
					return this;
			},
			addOne: function(message) {
					console.log("Add one");
					var messageView = new MessageView({ model: message });
					this.$el.children().first().append(messageView.render().el);
			},
			submitOnEnter: function(e) {
					if (e.keyCode != 13) return;
					e.preventDefault();
					this.sendMessage(e);
			},
			sendMessage: function(e) {
					e.preventDefault();
					var newMessage = new MessageModel({ 'url': Api.baseUrl + '/api/chatroom/' + this.collection.id });
					newMessage.save({ 'from': 'me', 'body': this.$('textarea[name=body]').val() });
				    this.collection.fetch( { reset: false } );
			},
		 	clean: function() {
					this.collection.off(null, null, this);
			}	
		});

		return ChatroomView;
	}
      );
