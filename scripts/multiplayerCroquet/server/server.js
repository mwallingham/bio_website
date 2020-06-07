// Dependencies

import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';

const app = express();

var server = http.createServer(app);

const io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

//Routing

app.get('/', function(request, response) {

    response.sendFile(path.join(__dirname, '/../../../croquet.html'));

});

//Starts the server

server.listen(5000, function() {

    console.log('Starting server on yeoeoooo port 5000');

});

// Add the WebSocket handlers
io.on('connection', function(sock) {

    sock.emit('message', 'Hi, you are connected');

});

setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);