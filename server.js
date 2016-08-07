var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var server =  http.createServer(app);
var io = socketIo.listen(server);
var port = process.env.PORT || 88;

app.use(express.static(__dirname + '/public'));
app.get('/reset', function(req, res) {
    res.send('Resetting');
    line_history = [];
    io.emit('clear');
});

var line_history = [];

io.on('connection', function (socket) {

   for (var i = 0; i < line_history.length; i++) {
      socket.emit('draw_line', { line: line_history[i] } );
   }

   socket.on('draw_line', function (data) {

      line_history.push(data.line);

      io.emit('draw_line', { line: data.line });

   });

   socket.on('clear_all', function(){
      line_history = [];
       io.emit('clear');
    })
});

server.listen(port, function() {
 console.log('listening on' + port);
});
