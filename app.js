/**
 * Module dependencies
 */
 
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = module.exports = express();

var	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

//server.listen(80);

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index); // TODO
//app.get('/partials/:name', routes.partials); // ? TODO

// JSON API

app.get('/api/chatrooms', api.chatrooms);
app.get('/api/chatroom/:room_id', api.chatroom);

app.get('/api/chatroom/:room_id/f:first/n:num_msg', api.chatroom);
app.get('/api/chatroom/:room_id/t:timestamp', api.chatroomWithTime);

app.post('/api/chatroom/:room_id', api.postMessage);
//app.get('*', routes.index);

// SocketIO

io.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
				console.log(data);
				socket.emit('my custom event', { data: 'custom event' });
		});
		socket.on('message', function( message ) {
				console.log( message );
				//message.timestamp = (new Date()).getTime();
				message = api.processMessage(message);
				console.log("Processed message");
				console.log(message);
				socket.broadcast.emit('message', message);
				socket.emit('message', message);
		});
});

// Start server

var port = 3000 || ENV.port; // check environment variables object
server.listen(port);
//app.listen(3000, function(){
//	console.log('Express server listening on port %d in %s mode', 
//		this.address().port,
//		app.settings.env);
//	console.log(app.routes);
//});
