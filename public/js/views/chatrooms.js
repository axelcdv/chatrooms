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
		var chatroomView = new App.Views.Chatroom({ model: chatroom });
		this.$el.append(chatroomView.render().el);
	}
});

App.Views.chatrooms = new App.Views.Chatrooms({ el: $('#chatrooms') });
//App.Views.chatrooms.render();
console.log('done with Chatrooms: ' + App.Views.chatrooms.el);
