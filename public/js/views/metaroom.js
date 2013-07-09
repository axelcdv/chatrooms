// js/views/metaroom.js

define([
	'jquery',
	'underscore',
	'backbone',
	'models/metaroom',
	'events',
	'text!../templates/metaroom.html'
	],
	function($, _, Backbone, MetaroomModel, Events, MetaroomTemplate)
	{
			var MetaroomView = Backbone.View.extend({
					model: MetaroomModel,
//					className: 'ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child ui-last-child ui-btn-up-c',
//					className: 'span8 offset2 room-row',
					className: 'meta-room',
					template: _.template(MetaroomTemplate),

					events: {
//							'push a': 'gotochat',
//							'click a': 'gotochat',
							'click h4': 'gotochat',
							'click div': 'gotochat'
					},

					render: function() {
							this.$el.html( this.template( this.model.attributes ) );
							/*this.$el.attr('data-theme', 'c')
								.attr('data-corners', 'false')
								.attr('data-shadow', 'false')
								.attr('data-iconshadow', 'true')
								.attr('data-wrapperels', 'div')
								.attr('data-icon', 'arrow-r')
								.attr('data-iconpos', 'right'); */
							return this;
					},
					
					gotochat: function(e) {
							e.preventDefault();
							console.log('Going to chatroom '
									+ this.model.attributes.name + " id: "
									+ this.model.attributes.id);
							Events.trigger('navigate', '/chatroom/' + this.model.attributes.id);
					},

					clean: function() {
					}
			});

			return MetaroomView;
	}
);

