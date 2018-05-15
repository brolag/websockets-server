var ws = require('nodejs-websocket');

var server = ws.createServer(function (connection) {
	console.log('New Chat connection established.', new Date().toLocaleTimeString());

	connection.on('text', function (msg) {
		var msgObj = JSON.parse(msg);
		msgObj.newDate = new Date().toLocaleTimeString();
		var newMsg = JSON.stringify(msgObj);

		server.connections.forEach(function (connection) {
			connection.sendText(newMsg);
		});
	});

	connection.on('close', function (code, reason) {
		console.log('Chat connection closed.', new Date().toLocaleTimeString(), 'code: ', code);
	});

	connection.on('error', function (err) {
		if (err.code !== 'ECONNRESET') {
			console.log('Error in Chat Socket connection', err);
			throw err;
		}
	})
}).listen(3005, function () {
	console.log('Chat socketserver running on localhost:3005');
});

