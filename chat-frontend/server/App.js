const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

const redis = require('redis')

const redisClient = redis.createClient()
redisClient.subscribe('message-created')

var io = require('socket.io').listen(process.env.PORT || 5001);

io.on('connection', function(socket){
 console.log('connected socket')
 socket.on('disconnect', function(){
   console.log('client disconnected')
   socket.disconnect();
 });
});

redisClient.on('message', function(channel, message){
 var info = JSON.parse(message);
 io.sockets.emit(channel, info);
 console.log('emit '+ channel);
});

// app.use(bodyParser.json({type: '*/*'}))
// app.use(express.static(path.resolve(__dirname, '..', 'bundle')))

// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
// })

module.exports = app
