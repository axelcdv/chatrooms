define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatrooms',
		'views/metaroom',
		'text!templates/chatrooms.html',
		'events'
	],
	function($, _, Backbone, ChatroomsCollection, MetaroomView, ChatroomsTemplate, Events) {
		var ChatroomsView = Backbone.View.extend({
			template: _.template(ChatroomsTemplate),
			initialize: function(options) {
					this.collection = new ChatroomsCollection();
					console.log(this);
//					this.listenTo(this.collection, 'reset', this.render);
//					this.listenTo(this.collection, 'add', this.addOne);
					this.collection.on('add', this.addOne, this);
					this.collection.on('reset', this.render, this);
					this.el = options.el || '.ui-content';
			},
			render: function() {
				this.$el.html( this.template() );
				Events.trigger('changeheader', {
						header: {
								header_title: "Chatrooms",
								right_button_class: "settings-btn",
								left_button_class: "plus-btn"
						}
				});
				this.collection.forEach(this.addOne, this);
				return this;
			},
			addOne: function(chatroom){
					var metaroomView = new MetaroomView({ model: chatroom });
					this.$el.children().first().append(metaroomView.render().el);
			},
			destroy: function(){
					console.log('Destroying chatrooms view'); //TODO
			},
			clean: function(){
					this.collection.off(null, null, this);
			}
		});

		return ChatroomsView;
	}
      );
