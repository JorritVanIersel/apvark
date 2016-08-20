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
var his = [[]];
var list = [""];
io.on('connection', function (socket) {

    socket.on('room', function(room) {

        for (i = 0; i < his.length; i++){

            if (list[i] == room){

                socket.join(i);
                socket.room = i;

            }
        }

        if(socket.room == undefined) {
            his.push([]);
            list.push(room);
            socket.join(his.length - 1);
        socket.room = his.length - 1;
        }


var k = 0;
function myLoop () {
   setTimeout(function () {
   socket.emit('draw_line', { line: his[socket.room][k] } );
    k++;
      if (k < his[socket.room].length) {
         myLoop();
      }
   }, 5)
}
 if (his[socket.room].length > 0) {
myLoop();
 }
       // for (var i = 0; i < his[socket.room].length; i++) {

          //  socket.emit('draw_line', { line: his[socket.room][i] } );}


    });

   socket.on('draw_line', function (data) {
       var room = socket.room;
        his[socket.room].push(data.line);
       io.in(socket.room).emit('draw_line', { line: data.line });
   });

   socket.on('clear_all', function(){
       his[socket.room] = [];
       io.in(socket.room).emit('clear');
    })
});

server.listen(port, function() {
 console.log('listening on' + port);
});


