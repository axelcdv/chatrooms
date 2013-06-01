/*
 * JSON REST API
 */

// In-memory map for the moment

var data = {
	"chatrooms": [
	{
		"name": "chatroom 0",
		"messages": [
		{
			"from": "Bob",
			"body": "Hello, world!"
		},
		{
			"from": "John",
			"body": "Hi Bob!"
		}
		]
	},
	{
		"name": "other chatroom",
		"messages": [
		{
			"from": "batman",
			"body": "I am the night"
		},
		{
			"from": "Joker",
			"body": "Its simple, we kill the batman"
		},
		{
			"from": "Spiderman",
			"body": "What the fuck am I doing here?"
		}
		]
	}
	],
};

// GET

exports.chatrooms = function(req, res) {
	var chatrooms = [];
	data.chatrooms.forEach(function(chatroom, i){
		chatrooms.push({
			id: i,
			name: chatroom.name
		});
	});
	res.json( 
			chatrooms
	);
};

exports.chatroom = function(req, res) {
	var messages = [];
	var first = req.params.first || 0;
	var num_msg = req.params.num_msg || 10; // Return 10 messages by default
	var room_id = req.params.room_id;
	
	console.log('Asking for chatroom: ' + room_id 
			+ ", first: " + first 
			+ ", num_msg: " + num_msg);
	if(room_id && room_id >= 0 && room_id < data.chatrooms.length)
	{
		var chatroom = data.chatrooms[room_id];
		console.log('Replying with chatroom: ' + chatroom.name + ', num msgs: ' + chatroom.messages.length);
		for (var i = first; i < first + num_msg && i < chatroom.messages.length; i++)
		{
			messages.push({
				id: i,
				from: chatroom.messages[i].from,
				body: chatroom.messages[i].body
			});
		}
		res.json({
			room_name: chatroom.name,
			messages: messages
		});
	}
	else
	{
		res.json(false);
	}
};

// POST

exports.postMessage = function(req, res) {
	var room_id = req.params.room_id;

	console.log('Posting message in room: ' + room_id
			+ ", from: " + req.params.from
			+ ", body: " + req.body);

	if (room_id && room_id >= 0 && room_id < data.chatrooms.length)
	{
		var chatroom = data.chatrooms[room_id];
		chatroom.messages.push({ 
			from: (req.body.from || ""),
			body: (req.body.body || "")
		});
		var msg_id = chatroom.messages.length - 1;
		res.json({
			id: msg_id,
			from: chatroom.messages[msg_id].from,
			body: chatroom.messages[msg_id].body
		});
	}
	else
	{
		console.log('Incorrect chatroom id');
		res.json(false);
	}
}
