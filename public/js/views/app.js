// js/views/app.js

define([
		'jquery',
		'underscore',
		'backbone',
		'cordova',
		'router',
		'events',
		'text!templates/header.html',
		'text!templates/main.html'
		],
	function ($, _, Backbone, cordova, Router, Events, HeaderTemplate, ContentTemplate) {
		var AppView = Backbone.View.extend({
			el: $('[data-role="page"]'),
//			el: $('body'),
			events: {
					'click [data-role="header"]': 'gotoindex' // TODO touch events
			},
			attributes: {
					header: {
						header_title: 'Chatrooms',
						right_button_class: 'back-btn',
						left_button_class: 'people-btn'
					}
			},
			headerTemplate: _.template(HeaderTemplate),
		    contentTemplate: _.template(ContentTemplate),
			render: function() {
				this.$el.html( this.headerTemplate( this.attributes.header ) );
				this.$el.append( this.contentTemplate() );
			},
			
			gotoindex: function(e) {
					e.preventDefault();
					Events.trigger('navigate', '/');
			}
		});

		return AppView;
	});


