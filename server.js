var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');


var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(88);
app.use(express.static(__dirname + '/public'));
app.get('/reset', function(req, res) {
    res.send('Resetting');
    line_history = [];
    io.emit('clear');
});

console.log("Server running on 127.0.0.1:8080");

var line_history = [];

io.on('connection', function (socket) {


   for (var i = 0; i < line_history.length; i++) {
      socket.emit('draw_line', { line: line_history[i] } );
   }


   socket.on('draw_line', function (data) {

      line_history.push(data.line);



      io.emit('draw_line', { line: data.line });
   });
});
