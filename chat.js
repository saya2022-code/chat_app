// express モジュールを使う
app = require('express')();

// http サーバを立てる
var http = require('http').Server(app);

//require()でNode.jsからSocket.ioを扱えるようにする
var io = require('socket.io')(http);

app.get('/', function(req, res){
    //__dirname=現在のディレクトリのパスを示す特別な変数
    res.sendFile(__dirname + '/index.html');
  });

//connection=Socket.IOのイベントの1つ。クライアントがサーバーに接続
 //on(eventName, callback){処理}
io.on('connection', function(socket){
    //msg=フォームの値
    socket.on('chat message', function(msg){

        //htmlのsocket.onから渡される「‘chat message’」というイベントを補足して処理
         //再びhtmlに返す
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
  });