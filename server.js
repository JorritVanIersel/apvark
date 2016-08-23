var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var server =  http.createServer(app);
var io = socketIo.listen(server);
var port = process.env.PORT || 88;
app.use(express.static(__dirname + '/public'));

var his = [[]];
var list = [""];
var resets = [[]];

io.on('connection', function (socket) {
    socket.del = true;
    socket.on('room', function(room) {
        for (i = 0; i < his.length; i++){
            if (list[i] == room){
                socket.join(i);
                socket.room = i;
            }
        }
        if(socket.room == undefined) {

          if(room.indexOf('tic') > -1) resets.push(tic);
            else if(room.indexOf('dot') > -1) resets.push(dot);
             else if(room.indexOf('line') > -1) resets.push(line);
              else resets.push([]);

            his.push(resets[resets.length-1].slice());
            list.push(room);
            socket.join(his.length - 1);
            socket.room = his.length - 1;

        }

var k = 0; function myLoop () { setTimeout(function () {
   socket.emit('draw_line', { line: his[socket.room][k] } );
       k++;
      if (k < his[socket.room].length) myLoop();
   }, 5)}
 if (his[socket.room].length > 0) myLoop();
    });

   socket.on('draw_line', function (data) {

       if (data.line[0].w < 50 && data.line.length == 3){
        his[socket.room].push(data.line);
       io.in(socket.room).emit('draw_line', { line: data.line });
       }

   });

   socket.on('clear_all', function(){
       if (socket.del){

           socket.del = false;

      setTimeout(function(){socket.del = true;}, 10000);

       io.in(socket.room).emit('clear');
           console.log(resets[resets.length-1].slice())
          his[socket.room] = resets[resets.length-1].slice();
        for (var i = 0; i < his[socket.room].length; i++){
            io.in(socket.room).emit('draw_line', { line: his[socket.room][i]});
       }

       }
    })
});

server.listen(port, function() {
 console.log('listening on' + port);
});

line = [[{ x: 0, y: 0.05, w: '2' },{ x: 1, y: 0.05 },'#000000' ],
                            [ { x: 0, y: 0.1, w: '2' },{ x: 1, y: 0.1 },'#000000' ],
                            [ { x: 0, y: 0.15, w: '2' },{ x: 1, y: 0.15 },'#000000' ],
                            [ { x: 0, y: 0.2, w: '2' },{ x: 1, y: 0.2 },'#000000' ],
                             [ { x: 0, y: 0.25, w: '2' },{ x: 1, y: 0.25 },'#000000' ],
                             [ { x: 0, y: 0.3, w: '2' },{ x: 1, y: 0.3 },'#000000' ],
                             [ { x: 0, y: 0.35, w: '2' },{ x: 1, y: 0.35 },'#000000' ],
                             [ { x: 0, y: 0.4, w: '2' },{ x: 1, y: 0.4 },'#000000' ],
                             [ { x: 0, y: 0.45, w: '2' },{ x: 1, y: 0.45 },'#000000' ],
                             [ { x: 0, y: 0.5, w: '2' },{ x: 1, y: 0.5},'#000000' ],
                             [ { x: 0, y: 0.55, w: '2' },{ x: 1, y: 0.55 },'#000000' ],
                            [{ x: 0, y: 0.6, w: '2' },{ x: 1, y: 0.6 },'#000000' ],
                            [ { x: 0, y: 0.65, w: '2' },{ x: 1, y: 0.65 },'#000000' ],
                            [ { x: 0, y: 0.7, w: '2' },{ x: 1, y: 0.7 },'#000000' ],
                            [ { x: 0, y: 0.75, w: '2' },{ x: 1, y: 0.75 },'#000000' ],
                             [ { x: 0, y: 0.8, w: '2' },{ x: 1, y: 0.8 },'#000000' ],
                             [ { x: 0, y: 0.85, w: '2' },{ x: 1, y: 0.85 },'#000000' ],
                             [ { x: 0, y: 0.9, w: '2' },{ x: 1, y: 0.9 },'#000000' ],
                             [ { x: 0, y: 0.95, w: '2' },{ x: 1, y: 0.95 },'#000000' ],
                             [ { x: 0, y: 1, w: '2' },{ x: 1, y: 1 },'#000000' ],
                           ];
dot = [[ { x: 0.25, y: 0.25, w: '20' },{ x: 0.25, y: 0.25 },'#000000' ],
                           [ { x: 0.25, y: 0.35, w: '20' },{ x: 0.25, y: 0.35 },'#000000' ],
                            [ { x: 0.25, y: 0.45, w: '20' },{ x: 0.25, y: 0.45 },'#000000' ],
                            [ { x: 0.25, y: 0.55, w: '20' },{ x: 0.25, y: 0.55 },'#000000' ],
                            [ { x: 0.25, y: 0.65, w: '20' },{ x: 0.25, y: 0.65 },'#000000' ],
                            [ { x: 0.25, y: 0.75, w: '20' },{ x: 0.25, y: 0.75 },'#000000' ],

                            [ { x: 0.35, y: 0.25, w: '20' },{ x: 0.35, y: 0.25 },'#000000' ],
                             [ { x: 0.35, y: 0.35, w: '20' },{ x: 0.35, y: 0.35 },'#000000' ],
                             [ { x: 0.35, y: 0.45, w: '20' },{ x: 0.35, y: 0.45 },'#000000' ],
                             [ { x: 0.35, y: 0.55, w: '20' },{ x: 0.35, y: 0.55 },'#000000' ],
                             [ { x: 0.35, y: 0.65, w: '20' },{ x: 0.35, y: 0.65 },'#000000' ],
                             [ { x: 0.35, y: 0.75, w: '20' },{ x: 0.35, y: 0.75 },'#000000' ],

                            [ { x: 0.45, y: 0.25, w: '20' },{ x: 0.45, y: 0.25 },'#000000' ],
                             [ { x: 0.45, y: 0.35, w: '20' },{ x: 0.45, y: 0.35 },'#000000' ],
                             [ { x: 0.45, y: 0.45, w: '20' },{ x: 0.45, y: 0.45 },'#000000' ],
                             [ { x: 0.45, y: 0.55, w: '20' },{ x: 0.45, y: 0.55 },'#000000' ],
                             [ { x: 0.45, y: 0.65, w: '20' },{ x: 0.45, y: 0.65 },'#000000' ],
                             [ { x: 0.45, y: 0.75, w: '20' },{ x: 0.45, y: 0.75 },'#000000' ],

                            [ { x: 0.55, y: 0.25, w: '20' },{ x: 0.55, y: 0.25 },'#000000' ],
                            [ { x: 0.55, y: 0.35, w: '20' },{ x: 0.55, y: 0.35 },'#000000' ],
                            [ { x: 0.55, y: 0.45, w: '20' },{ x: 0.55, y: 0.45 },'#000000' ],
                            [ { x: 0.55, y: 0.55, w: '20' },{ x: 0.55, y: 0.55 },'#000000' ],
                            [ { x: 0.55, y: 0.65, w: '20' },{ x: 0.55, y: 0.65 },'#000000' ],
                            [ { x: 0.55, y: 0.75, w: '20' },{ x: 0.55, y: 0.75 },'#000000' ],

                            [ { x: 0.65, y: 0.25, w: '20' },{ x: 0.65, y: 0.25 },'#000000' ],
                            [ { x: 0.65, y: 0.35, w: '20' },{ x: 0.65, y: 0.35 },'#000000' ],
                            [ { x: 0.65, y: 0.45, w: '20' },{ x: 0.65, y: 0.45 },'#000000' ],
                            [ { x: 0.65, y: 0.55, w: '20' },{ x: 0.65, y: 0.55 },'#000000' ],
                            [ { x: 0.65, y: 0.65, w: '20' },{ x: 0.65, y: 0.65 },'#000000' ],
                            [ { x: 0.65, y: 0.75, w: '20' },{ x: 0.65, y: 0.75 },'#000000' ],

                            [ { x: 0.75, y: 0.25, w: '20' },{ x: 0.75, y: 0.25 },'#000000' ],
                            [ { x: 0.75, y: 0.35, w: '20' },{ x: 0.75, y: 0.35 },'#000000' ],
                            [ { x: 0.75, y: 0.45, w: '20' },{ x: 0.75, y: 0.45 },'#000000' ],
                            [ { x: 0.75, y: 0.55, w: '20' },{ x: 0.75, y: 0.55 },'#000000' ],
                            [ { x: 0.75, y: 0.65, w: '20' },{ x: 0.75, y: 0.65 },'#000000' ],
                            [ { x: 0.75, y: 0.75, w: '20' },{ x: 0.75, y: 0.75 },'#000000' ],

                           ];
tic = [[ { x: 0.4, y: 0.2, w: '10' },{ x: 0.4, y: 0.8 },'#000000' ],   [ { x: 0.6, y: 0.2, w: '10' },{ x: 0.6, y: 0.8},'#000000' ],[ { x: 0.2, y: 0.4, w: '10' },{ x: 0.8, y: 0.4 },'#000000' ],[ { x: 0.2, y: 0.6, w: '10' },{ x: 0.8, y: 0.6 },'#000000' ]];
