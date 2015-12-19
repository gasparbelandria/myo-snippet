var Myo = require('myo'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

Myo.onError = function () {
  console.log("Woah, couldn't connect to Myo Connect");
}

Myo.connect('com.gasparbelandria.myo');

Myo.on('connected', function(){
  console.log('connected!')
});

Myo.on('battery_level', function(val){
    console.log('Much power', val);
});

Myo.on('accelerometer', function(val){
    //console.log('accelerometer', val);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listener on :3000');
})

io.on('connection', function(socket){
    socket.on('myo message', function(msg){
        io.emit('myo message', msg);
        console.log('message: ' + msg);
    });
});

Myo.on('pose', function(val){
    console.log(val);
    io.emit('myo message', val);
});