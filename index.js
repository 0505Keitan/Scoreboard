const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/view' , function(req, res){
    res.sendFile(__dirname+'/view.html');
});

app.get('/control', function(req, res){
    res.sendFile(__dirname+'/control.html');
});

io.on('connection',function(socket){
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
});

if(process.argv[2] === 'ci')process.exit(0);

http.listen(PORT, function(){
    console.log(PORT);
});
