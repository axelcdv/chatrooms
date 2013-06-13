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
					'click [data-role="header"]': 'gotoindex', // TODO touch events
					'click div.back-btn': 'gotoindex', // TODO should be finer than that
					'click div.settings-btn': 'settings',
					'click div.people-btn': 'people'
			},
			attributes: {
					header: {
						header_title: 'Chatrooms',
						right_button_class: 'back-btn',
						left_button_class: 'people-btn'
					}
			},
			setAttributes: function(attrs){
					if (attrs.header) {
							this.attributes.header.header_title = attrs.header.header_title || this.header_title;
							this.attributes.header.right_button_class = attrs.header.right_button_class 
									|| this.attributes.header.right_button_class;
							this.attributes.header.left_button_class = attrs.header.left_button_class 
									|| this.attributes.header.left_button_class;
					}
					return this;
			},
			headerTemplate: _.template(HeaderTemplate),
		    contentTemplate: _.template(ContentTemplate),
			initialize: function(options) {
					Events.on('changeheader', function(header_attrs) {
							this.setAttributes (header_attrs);
							this.changeHeader();
					}, this);
			},
			changeHeader: function() {
					console.log(this.attributes.header.header_title);

					$('.header-title-inner h3').html(this.attributes.header.header_title);
					$('.header-btn')[0].className = 'header-btn ' + this.attributes.header.right_button_class;
					$('.header-btn')[1].className = 'header-btn ' + this.attributes.header.left_button_class;
					//$('.header-btn')[0].css('class', 'header-btn ' + this.attributes.header.right_button_class);
					//$('.header-btn')[1].css('class', 'header-btn ' + this.attributes.header.left_button_class);
			},
			renderHeader: function() {
					this.$el.parent().find('.header').remove();
					this.$el.parent().prepend( this.headerTemplate( this.attributes.header ) );
			},
			render: function() {
		//			this.$el.empty();
		//			this.renderHeader();
					this.$el.html( this.headerTemplate( this.attributes.header ) );
					this.$el.append( this.contentTemplate() );
					$('div#chatroomapp').css('margin-top', $('.header').height())
							.css('margin-bottom', $('.header').height())   // Assuming footer size ~= header size for now
							.css('padding-top', '0.5%')
							.css('padding-bottom', '0.5%');
			},
			
			gotoindex: function(e) {
					e.preventDefault();
					Events.trigger('navigate', '/');
			},

			settings: function(e) {
					// TODO
					e.preventDefault();
					console.log("Settings");
			},
			people: function(e) {
					// TODO
					e.preventDefault();
					console.log("People");
			}
		});

		return AppView;
	});


