// js/views/chatroom.js

define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatroom',
		'views/message',
		'models/message',
		'text!templates/chatroom.html',
		'events',
		'api'
	],
	function($, _, Backbone, ChatroomCollection, MessageView, MessageModel, ChatroomTemplate, Events, Api) {
		var ChatroomView = Backbone.View.extend({
			//el: '.ui-content',//'.curView',
			template: _.template(ChatroomTemplate),
			events: {
					'submit': 'sendMessage',
					'click div.send-btn': 'sendMessage',
					'click button': 'sendMessage',
					'keypress textarea[type=text]': 'submitOnEnter',
					'click div.photo-btn': 'update'
			},
			initialize: function(options) {
					this.collection = new ChatroomCollection({ id: options.id });
					console.log(this.collection);
					this.el = options.el || '.ui-content';
					this.collection.fetch({ add: true, reset: true });
//					this.collection.on('reset', this.render, this);
					this.collection.on('add', this.addOne, this);
					
					Events.on('message', function (message) {
							console.log("Chatroom got message event, " + message.room_id);
							console.log( message );
							if ( message.room_id && message.room_id === this.collection.id ) {
									this.collection.add( message );
//									this.addOne( { attributes: message } );
							}
					}, this);
					this.render();
			},
			render: function() {
					console.log("Rendering chatroom");
					Events.trigger('changeheader', {
							header: {
									header_title: this.collection.room_name,
									right_button_class: 'back-btn',
									left_button_class: 'people-btn'
							}
					});
					this.$el.html( this.template( { id: this.collection.id } ) );
					this.delegateEvents( this.events );
					this.collection.forEach(this.addOne, this);
					return this;
			},
			addOne: function(message) {
					console.log("Add one");
					var attributes = message.attributes;
					if (!(attributes && ((attributes.from && attributes.from !== "")
												   	|| (attributes.body && attributes.body !== "")
												   	|| attributes.timestamp ))) {
							return;
					}
							
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
//					this.collection.create( new MessageModel({ 'url': this.collection.mainUrl, 'from': 'me', 'body': $('textarea[name=body]').val() }), { wait: true } );

					// Test
					Events.trigger('sendMessage', {
							'from': Api.username,
							'body': $('textarea[name=body]').val(), 
							'room_id': this.collection.id,
					});
					$('textarea[name=body]').val("");
//					var newMessage = new MessageModel({ 'url': Api.baseUrl + '/api/chatroom/' + this.collection.id });
//					newMessage.save({ 'from': 'me', 'body': this.$('textarea[name=body]').val() });
//				    this.collection.fetch( { reset: false } );
			},
			update: function(e) {
					e.preventDefault();
					console.log("Calling update");
					this.collection.fetch( { add: true, remove: false } );
			},
		 	clean: function() {
					this.collection.off(null, null, this);
			}	
		});

		return ChatroomView;
	}
      );
