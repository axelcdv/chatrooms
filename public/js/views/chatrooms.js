// js/views/chatrooms.js

App.Views.Chatrooms = Backbone.View.extend({
	initialize: function(){
		this.collection = new App.Collections.Chatrooms();
		this.listenTo(this.collection, 'all', this.render);
		console.log("CollectionView initialized");
	},
	render: function(){
		this.$el.empty();
		this.collection.forEach(this.addOne, this);
	},
	
	addOne: function(chatroom){
		console.log(chatroom);
		var metaroomView = new App.Views.MetaRoom({ model: chatroom });
		this.$el.append(metaroomView.render().el);
	},

	destroy: function(){
		console.log("Destroying chatrooms view");
		this.trigger('destroy');
	}

});

//App.Views.chatrooms = new App.Views.Chatrooms({ el: $('#chatrooms') });
//App.Views.chatrooms.render();
//console.log('done with Chatrooms: ' + App.Views.chatrooms.el);
