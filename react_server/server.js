const express = require('express');
const parser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const db = require('./db/config'); 

// const router = require('./router')
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// const redis = require('redis')
// const client = redis.createClient(); 

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use('/api', router)
// app.use(express.static(path.resolve(__dirname, '../client/public')))

app.get('/*', function (req, res) {
  res.send(404, 'SERVER ONLY');
})

io.on('connection', socket => {
  socket.on('message', message => {
    // console.log('server received message ', io.engine.clientsCount);
    // console.log('this is the message room', message);
    socket.broadcast.to(message.roomId).emit('message', {
      message: message.message,
      sender: message.userId,
      room_id: message.roomId
    })
    db.Messages.create(message);
  })
  socket.on('subscribe', roomId => {
    // console.log('joining room', room);
    socket.join(roomId);
    let messages = db.Messages.findAll({
      where: {room_id: roomId},
      order: [[ 'createdAt', 'DESC' ]]
    });
    socket.emit('message', messages);
  })
  console.log('user connected', io.engine.clientsCount)
})

io.on('disconnect', socket => {
  console.log('user disconnected', io.engine.clientsCount);
})


server.listen(PORT, () => console.log('listening on port ' + PORT));

// module.exports = client; 
