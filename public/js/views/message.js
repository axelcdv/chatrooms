// js/views/message.js

App.Views.Message = Backbone.View.extend({
	model: App.Models.Message,
	tagName: 'li',
	template: _.template('<span class="from"><%= from %></span></br>'
		+ '<span class="messageBody"><%= body %></span>'),
	render: function(){
		this.$el.html(this.template( this.model.attributes ) );
		return this;
	}
});
