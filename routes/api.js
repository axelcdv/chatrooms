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
			"body": "Hello, world!",
			"timestamp": 1371070076262
		},
		{
			"from": "John",
			"body": "Hi Bob!",
			"timestamp": 1371070076362
		}
		]
	},
	{
		"name": "other chatroom",
		"messages": [
		{
			"from": "batman",
			"body": "I am the night",
			"timestamp": 1371070076600
		},
		{
			"from": "Joker",
			"body": "Its simple, we kill the batman",
			"timestamp": 1371070079123
		},
		{
			"from": "Spiderman",
			"body": "What the fuck am I doing here?",
			"timestamp": 1371070081324
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
	var first = req.params.first;
	var num_msg = req.params.num_msg || 30; // Return 30 messages by default
	var room_id = req.params.room_id;
	
	console.log('Asking for chatroom: ' + room_id 
			+ ", first: " + first 
			+ ", num_msg: " + num_msg);
	if(room_id && room_id >= 0 && room_id < data.chatrooms.length)
	{
		var chatroom = data.chatrooms[room_id];
		first = first || ((num_msg < chatroom.messages.length) ? chatroom.messages.length - num_msg - 1 : 0);
		console.log('Replying with chatroom: ' + chatroom.name + ', num msgs: ' + chatroom.messages.length);
		for (var i = first; i < first + num_msg && i < chatroom.messages.length; i++)
		{
			messages.push({
				id: i,
				from: chatroom.messages[i].from,
				body: chatroom.messages[i].body,
				timestamp: chatroom.messages[i].timestamp
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

exports.chatroomWithTime = function(req, res) {
		var messages = [];
		var timestamp = req.params.timestamp;
		var room_id = req.params.room_id;
		if (!timestamp || !room_id) {
				res.json(false);
				return;
		}
		var i = 0;
		var chatroom = data.chatrooms[room_id];
		var message;
		for (i = 0; i < chatroom.messages.length; i++)
		{
			message = chatroom.messages[i];	
			if (message.timestamp > timestamp) {
					messages.push({
							id: i,
							from: message.from,
							body: message.body,
							timestamp: message.timestamp
					});
			}
		}
		res.json({
				room_name: chatroom.name,
				num_msgs: chatroom.messages.length,
				messages: messages
		});
}

// POST

exports.postMessage = function(req, res) {
	var room_id = req.params.room_id;

	console.log('Posting message in room: ' + room_id
			+ ", from: " + req.params.from
			+ ", body: " + req.body);

	if (room_id && room_id >= 0 && room_id < data.chatrooms.length)
	{
		var chatroom = data.chatrooms[room_id];
		var timestamp = (new Date()).getTime();
		chatroom.messages.push({ 
			from: (req.body.from || ""),
			body: (req.body.body || ""),
			timestamp: timestamp
		});
		var msg_id = chatroom.messages.length - 1;
		res.json({
			id: msg_id,
			from: chatroom.messages[msg_id].from,
			body: chatroom.messages[msg_id].body,
			timestamp: chatroom.messages[msg_id].timestamp
		});
	}
	else
	{
		console.log('Incorrect chatroom id');
		res.json(false);
	}
}
