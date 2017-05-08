 var socket  = io.connect();

document.addEventListener("DOMContentLoaded", function() {
   var mouse = {
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false,
      colour: "blue"

   };


    var a = location.href;
    if (a.indexOf("?") > 0){ var room = a.substring(a.indexOf("?")+1); }
    else {var room = "home";}
    socket.on('connect', function() {

        socket.emit('room', room);
    });

   var touch = is_touch_device();
   var canvas  = document.getElementById('drawing');
   var ctx = canvas.getContext('2d');
   var width = document.body.clientWidth;
   var height = document.body.clientHeight;

   canvas.width = width;
   canvas.height = height;


document.oncontextmenu = function(e){
  e.preventDefault();
   balk = document.getElementById('my');
   bolk = document.getElementById('te');

  if (balk.style.visibility == "hidden"){
  balk.style.visibility = 'visible';
  balk.style.left = "" + e.clientX + "px" ;
  bolk.style.fontSize = document.getElementById("rag").value * 1.5 + "px";
  bolk.style.color =    document.getElementById("col").value;

   balk.style.top = "" + (e.clientY - 10) + "px";
   document.getElementById('te').focus();
}

else {

  if (bolk.value == ""){}
    else {

  posi = {x: parseInt(balk.style.left, 10) / width, y: parseInt(balk.style.top, 10) / height, text: bolk.value, w: document.getElementById("rag").value};
  socket.emit('text', { line: [ posi, mouse.colour]});
}
  balk.style.visibility = 'hidden';
}
stopEvent(e);
}

   canvas.onmousedown = function(e){ if (e.which === 1) mouse.click = true; };
   canvas.onmouseup = function(e){ if (e.which === 1) mouse.click = false; };
   canvas.ontouchstart = function(e){ mouse.click = true;
      mouse.pos_prev.x = e.touches[0].clientX / width;
      mouse.pos_prev.y = e.touches[0].clientY / height;
      mouse.pos.x = e.touches[0].clientX / width;
      mouse.pos.y = e.touches[0].clientY / height;};

   canvas.ontouchend = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {

      mouse.pos.x = (e.clientX - canvas.offsetLeft)/ width;
      mouse.pos.y = (e.clientY - canvas.offsetTop)/ height;
      mouse.pos.w = document.getElementById("rag").value;
      mouse.move = true;

   };
    canvas.ontouchmove = function(e) {

      mouse.pos.x = e.touches[0].clientX / width;
      mouse.pos.y = e.touches[0].clientY / height;

      mouse.pos.w = document.getElementById("rag").value;
      mouse.move = true;
   };

	socket.on('draw_line', function (data) {
      var line = data.line;

      ctx.strokeStyle = line[2];
        if (line[0].w > 1){
        ctx.fillStyle = line[2];
        ctx.beginPath();
        ctx.arc(line[0].x * width,line[0].y * height,0.47 * line[0].w,0,2*Math.PI);
        ctx.fill();
        }
      ctx.lineWidth = line[0].w;

      ctx.beginPath();
      ctx.moveTo(line[0].x * width, line[0].y * height);
      ctx.lineTo(line[1].x * width, line[1].y * height);
      ctx.stroke();


   });
    socket.on('texter', function (data) {

  ctx.font = 1.2 * data.line[0].w + 'pt verdana';
ctx.fillStyle = data.line[2];
ctx.fillText(data.line[0].text,data.line[0].x * width ,data.line[0].y * height + 1.5 * data.line[0].w);

   });
     socket.on('clear', function () {
    ctx.clearRect(0,0,width,height);


   });
 socket.on('room', function (room, data) {
ctx.fillStyle = "white";
ctx.clearRect(0,0,width,height);
   ctx.fillRect(0,0,width,height);


   document.getElementById('wname').innerHTML = 'Roomname: <BR>';document.getElementById('sec').value = room;
   if (data){
    for (i = 0; i < data.length; i++){
      console.log(data[i]);
    }
   }
   });


   function mainLoop() {

      if (mouse.click && mouse.move && mouse.pos_prev) {

         mouse.colour = document.getElementById("col").value;
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev, mouse.colour]});
         mouse.move = false;
         if (touch){
             mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
         }
     }

        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};

      setTimeout(mainLoop, 10);

   }

      mainLoop();

});

function photo(){
     socket.emit('connection');
    var canvas2 = document.getElementById("drawing");
    var img    = canvas2.toDataURL("image/png");
    var win = window.open(img, '_blank');
}

function delet(){

if(confirm('Are you sure you want to delete everything drawn? \n You can only do this once every 10 seconds')){
  socket.emit('clear_all');
    }
}

function sendRoom(){

  room = document.getElementById('sec').value;
        socket.emit('room', room);


}
function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}


function showDiv(){

        if( document.getElementById("ull").style.visibility == 'hidden') {

            document.getElementById("ull").style.visibility = 'visible';
        }
        else
        {

            document.getElementById("ull").style.visibility = 'hidden';
             document.getElementById('openclose').style.visibility = 'visible';
        }
    }
