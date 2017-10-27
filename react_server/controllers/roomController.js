const db = require('../db/config');
const Chatroom = require('../db/models/chatroom');

module.exports = {
  getRooms: (req, res) => {
    //get a user's array of room IDs using req.params.userId
    Chatroom.findAll({
      where: { [Op.or] : [
        {chatroom_sender: req.params.userId},
        {chatroom_recipient: req.params.userId}
      ]},
      include: [{
        model: User,
        attributes: [name, profile_image_url],
      }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err); 
    })
  }, 
  createRoom: (req, res) => {
    Chatroom.create({
      chatroom_sender: req.body.userId,
      chatroom_recipient: req.body.friendId,
      admin: req.body.username
    })
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    })
  },
  getPreview: (req, res) => {
    //get an object using req.params.roomId with admin, user, most recent message, time created at
    db.Messages.findAll({
      limit: 1,
      where: {room_id: req.params.roomId},
      order: [[ 'createdAt', 'DESC' ]],
      include: [{
        model: User,
        attributes: [name, profile_image_url],
      }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }
}