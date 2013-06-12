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
//					className: "span10 msg-row msg-left",
					className: "message-left",
//					tagName: 'li',
//					template: _.template('<span class="from"><%= from %></span></br>'
//							+ '<span class="messageBody"><%= body %></span>'),
					template: _.template(MessageTemplate),
					render: function (){
							console.log("Rendering message, model attributes: "
									+ this.model.attributes.from);
							console.log(this.model.attributes);
							if ( this.model.attributes.from === "me" ) { // Temporary
									this.className = "message-right";
									this.$el.removeClass('message-left')
										.addClass('message-right');
							}

							this.$el.html( this.template( this.model.attributes ) );
//							this.$el.attr('data-role', 'list-divider')
//								.attr('role', 'heading');
							return this;
					},

					clean: function(){
					}
			});

			return MessageView;
	}
);
