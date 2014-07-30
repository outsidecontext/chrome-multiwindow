function onLoad(id_) {
	console.log("onLoad", id_);
	id = id_;
	initScene(id);
	initSocket();
	$(document).bind('keypress', onKeyPress);
}

function initSocket() {
	socket = io.connect('http://localhost');
	socket.on('blob::created', function(data) {
		console.log("received blob::created");
		createBlob();
	});
}

function onKeyPress(e) {
	var code = e.keyCode || e.which;
	console.log(code);
	if (code == 115) {
		createBlob();
		socket.emit('blob::created', {
			senderId: id
		});
	}
}

var id;
var socket;