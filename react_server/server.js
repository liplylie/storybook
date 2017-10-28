const express = require('express');
const parser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const db = require('./db/config');
const User = require('./db/models/user');
const Chatroom = require('./db/models/chatroom');
const Messages = require('./db/models/messages');
const Friendships = require('./db/models/friendship');

const router = require('./router');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// const redis = require('redis')
// const client = redis.createClient();

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use(cors());
app.use('/api', router)

app.use(express.static(path.resolve(__dirname, '../client/public')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

io.on('connection', socket => {
  socket.on('message', message => {
    // console.log('server received message ', io.engine.clientsCount);
    // console.log('this is the message room', message);
    socket.broadcast.to(message.roomIid.emit('message', {
      message: message.message,
      sender: message.sender,
      room_id: parseInt(message.roomId)
    }))
    // db.Messages.create(message);
  })
  socket.on('subscribe', roomId => {
    // console.log('joining room', room);
    socket.join(roomId);
    // let messages = db.Messages.findAll({
    //   where: {room_id: parseInt(roomId)},
    //   order: [[ 'createdAt', 'DESC' ]]
    // });
    // socket.emit('message', messages);
  })
  console.log('user connected', io.engine.clientsCount)
})

io.on('disconnect', socket => {
  console.log('user disconnected', io.engine.clientsCount);
})

// User.sync()
//   .then(() => {
//     Chatroom.sync();
//     Friendships.sync();
//   }).then(() => {
//     Messages.sync();
//   }).then(() => {
    server.listen(PORT, () => console.log('listening on port ' + PORT));
  // })

// module.exports = client; 
