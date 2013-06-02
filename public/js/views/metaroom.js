// js/views/metaroom.js

App.Views.MetaRoom = Backbone.View.extend({
	model: App.Models.MetaRoom,
	template: _.template('<h3><a href="/chatroom/<%= id %>"><%= name %></a></h3>'),

	events: {
		'click a': 'gotochat'
	},

	render: function(){
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	},

	gotochat: function(e){
		e.preventDefault();
		// TODO go to chatroom
		console.log('Going to chatroom %s (%d)', 
			this.model.attributes.name,
			this.model.attributes.id);
		App.router.navigate('chatroom/' + this.model.attributes.id, { trigger: true });
	}
});
