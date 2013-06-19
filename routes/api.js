/*
 * JSON REST API
 */

// In-memory map for the moment

var data = {
	"chatrooms": [
	{
		"name": "chatroom 0",
		"id": 0,
		"messages": [
		{
			"room_id": 0,
			"from": "Bob",
			"body": "Hello, world!",
			"timestamp": 1371070076262
		},
		{
			"room_id": 0,
			"from": "John",
			"body": "Hi Bob!",
			"timestamp": 1371070076362
		}
		]
	},
	{
		"name": "other chatroom",
		"id": 1,
		"messages": [
		{
			"room_id": 1,
			"from": "batman",
			"body": "I am the night",
			"timestamp": 1371070076600
		},
		{
			"room_id": 1,
			"from": "Joker",
			"body": "Its simple, we kill the batman",
			"timestamp": 1371070079123
		},
		{
			"room_id": 1,
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
			name: chatroom.name,
			num_msgs: chatroom.messages.length
		});
	});
	res.json( 
			chatrooms
	);
};

// Changing: "first" doesn't make sense, should be some sort of "last" coming back from the end
// of the message list
exports.chatroom = function(req, res) {
	var messages = [];
	var first = req.params.first;
	var num_msg = req.params.num_msg || 30; // Return 30 messages by default
	var room_id = req.params.room_id;
	var max_timestamp = 0;

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
			var message = chatroom.messages[i];
			messages.push({
				id: i,
				from: message.from,
				body: message.body,
				timestamp: message.timestamp
			});
			if (message.timestamp > max_timestamp) {
					max_timestamp = message.timestamp;
			}
		}
		res.json({
			room_name: chatroom.name,
			timestamp: max_timestamp,
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
		var max_timestamp = 0;
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
			if (message.timestamp > max_timestamp) {
					max_timestamp = message.timestamp;
			}

		}
		res.json({
				room_name: chatroom.name,
				num_msgs: chatroom.messages.length,
				timestamp: max_timestamp,
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
