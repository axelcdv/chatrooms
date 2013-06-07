define([
		'jquery',
		'underscore',
		'backbone',
		'collections/chatrooms',
		'views/metaroom',
		'text!templates/chatrooms.html'
	],
	function($, _, Backbone, ChatroomsCollection, MetaroomView, ChatroomsTemplate) {
		var ChatroomsView = Backbone.View.extend({
			el: '.ui-content', //'.curView',
//			template: _.template('<h3>This is the chatroom index, listing all the chatrooms</h3>'),
			template: _.template(ChatroomsTemplate),
			initialize: function() {
					this.collection = new ChatroomsCollection();
					console.log(this);
//					this.listenTo(this.collection, 'reset', this.render);
//					this.listenTo(this.collection, 'add', this.addOne);
					this.collection.on('add', this.addOne, this);
					this.collection.on('reset', this.render, this);
			},
			render: function() {
				this.$el.html( this.template() );
//				this.$el.empty();
//				this.$el.attr('data-role', 'listview')
//					.attr('data-divider-theme', 'b')
//					.attr('data-inset', 'true');
				this.collection.forEach(this.addOne, this);
				return this;
			},
			addOne: function(chatroom){
					var metaroomView = new MetaroomView({ model: chatroom });
					this.$el.children().first().append(metaroomView.render().el);
			},
			destroy: function(){
					console.log('Destroying chatrooms view'); //TODO
			}
		});

		return ChatroomsView;
	}
      );
