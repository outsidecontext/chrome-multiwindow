var express = require('express'),
	http = require('http');

var app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);


app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.end('Wrap It Conveyor');
});

io.sockets.on('connection', function(socket) {
	socket.on('blob::created', function(data) {
		console.log('blob::created', data);
		socket.broadcast.emit('blob::created', data);
	});
});

server.listen(3000, function() {
	console.log('Express server listening on port: 3000');
});
server.on('error', function(e) {
	console.log(e);
});