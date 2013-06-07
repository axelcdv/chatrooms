// js/views/message.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/message',
	'text!templates/message.html'
	],
	function($, _, Backbone, MessageModel, MessageTemplate)
	{
			var MessageView = Backbone.View.extend({
					model: MessageModel,
					tagName: 'li',
//					template: _.template('<span class="from"><%= from %></span></br>'
//							+ '<span class="messageBody"><%= body %></span>'),
					template: _.template(MessageTemplate),
					render: function (){
							this.$el.html( this.template( this.model.attributes ) );
							this.$el.attr('data-role', 'list-divider')
								.attr('role', 'heading');
							return this;
					},

					clean: function(){
					}
			});

			return MessageView;
	}
);
