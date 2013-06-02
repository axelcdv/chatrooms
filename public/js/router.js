// js/router.js

App.Router = Backbone.Router.extend({
	routes: {
		'index': 'index',
		'chatroom/:room_id': 'chatroom',
		'*other': 'index'
	},

	index: function(){
		console.log('index');
		console.log(App.children);
		App.Views.chatrooms = new App.Views.Chatrooms({ el: $('#chatrooms') });
	},

	chatroom: function(room_id){
		console.log('chatroom: ' + room_id);
		if (App.Views.chatrooms)
			App.Views.chatrooms.destroy();	

		App.Views.chatroom = new App.Views.Chatroom({ room_id: room_id, el: $('#chatrooms') });
	}
	
});

App.router = new App.Router();
Backbone.history.start({ pushState: true });
