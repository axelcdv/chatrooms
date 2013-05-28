/*
 * JSON REST API
 */

// In-memory map for the moment

var data = {
	"chatrooms": [
	{
		"name": "chatroom 1"
	}
	]	
};

// GET

exports.chatrooms = function(req, res) {
	var chatrooms = [];
	data.chatrooms.forEach(function(chatroom, i){
		chatrooms.push({
			id: i,
			room_name: chatroom.room_name
		});
	});
	res.json({
		chatrooms: chatrooms
	});
};
