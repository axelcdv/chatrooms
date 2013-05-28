// js/views/chatrooms.js

App.Views.Chatrooms = Backbone.View.extend({
	initialize: function(){
		this.collection = new App.Collections.Chatrooms();
		console.log("CollectionView initialized");
	},
	render: function(){
		this.collection.forEach(this.addOne, this);
	},
	
	addOne: function(chatroom){
		var chatroomView = new App.Views.Chatroom({ model: chatroom });
		this.$el.append(chatroomView.render().el);
	}
});

App.Views.chatrooms = new App.Views.Chatrooms();
App.Views.chatrooms.render();
console.log('done with Chatrooms');
