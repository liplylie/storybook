const sequelize = require('sequelize')
const db = require('')

module.exports = {
  getRooms: (req, res) => {
    //get a user's array of room IDs using req.params.userId
    db.Chatroom.findAll({
      where: Sequelize.OR(
        {chatroom_sender: req.params.userId},
        {chatroom_recipient: req.params.userId}
    )})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err); 
    })
  }, 
  createRoom: (req, res) => {
    //find where admin = userId and user = friendId OR admin = friendId and userId
    //using req.body.userId, req.params.friendId 
      //return roomId
    //else create room
      //return roomId
    db.Chatroom.findAll({
      where: Sequelize.Or(
        {
          chatroom_sender: req.body.userId, 
          chatroom_recipient: req.params.friendId
        },
        {
          chatroom_sender: req.params.friendId, 
          chatroom_recipient: req.body.userId
        },
    )})
    .then(data => {
      if (data.length) {
        res.send(data);
      } else {
        db.Chatroom.create({
          chatroom_sender: req.body.userId,
          chatroom_recipient: req.params.friendId,
        })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send(err); 
        })
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  getRoomInfo: (req, res) => {
    //get an object using req.params.roomId with admin, user, most recent message, time created at
    db.Chatroom.findAll({
      where: {id: req.params.roomId},
      attributes: []
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }
}