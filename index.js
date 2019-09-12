var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/setting', function(req, res){
    res.sendFile(__dirname+'/setting.html');
});

app.get('/sec/' , function(req, res){
    res.sendFile(__dirname+'/v2/index.html');
});

app.get('/sec/setting', function(req, res){
    res.sendFile(__dirname+'/v2/setting.html');
});


io.on('connection',function(socket){

    io.sockets.emit('count', socket.client.conn.server.clientsCount);
    socket.on('disconnect', function(data) {
        io.sockets.emit('count', socket.client.conn.server.clientsCount);
    });

    socket.on('name',function(name){
        io.emit('name', name);
    });
    socket.on('left',function(left){
        io.emit('left', left);
    });
    socket.on('right',function(right){
        io.emit('right', right);
    });
    socket.on('reset', function(reset){
        io.emit('reset', reset);
    });

    socket.on('name2',function(name){
        io.emit('name2', name);
    });
    socket.on('left2',function(left){
        io.emit('left2', left);
    });
    socket.on('right2',function(right){
        io.emit('right2', right);
    });
    socket.on('reset2', function(reset){
        io.emit('reset2', reset);
    });
});

http.listen(PORT, function(){
    console.log(PORT);
});
