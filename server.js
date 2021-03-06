var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890);

io.on('connection', function(socket) {
    // console.log('new client connected!');
    var client = redis.createClient();
    client.subscribe('message');
    client.on('message', function(channel, message) {
        // console.log('new message in queue => ', channel, message);
        socket.emit(channel, message);
    });
});