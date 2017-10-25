const db = require('../db/config')

module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.params.userId
    db.Relationships.findAll({
      where: Sequelize.Or(
        {
          user_id: req.params.userId,
          friend_type: 'friend'
        },
        {
          friend_id: req.params.userId,
          friend_type: 'friend'
        },
    )})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err); 
    })
  },
  getFriendInfo: (req, res) => {
    //get user info as object using req.params.friendId
    db.User.findAll({
      where: {user_id: req.params.friendId},
      attributes: []
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err); 
    })
  }, 
  sendRequest: (req, res) => {
    //add req.body.userId to req.params.friendId friend's pending friend requests
    db.Relationships.create({ 
      user_id: req.body.friendId,
      friend_id: req.body.userId, 
      type: 'pending'
    })
  },
  getRequests: (req, res) => {
    //get all pending where userId = req.params.userId
    db.Relationships.findAll({
      where: {
        user_id: req.params.userId,
        type: 'pending'
      }
    })
    
  }, 
  acceptRequest: (req, res) => {
    //add req.params.friendId to current user's friend list and vice versa
    db.Relationships.update({
      where: {
        user_id: req.body.userId,
        friend_id: req.body.friendId,
        type: 'friend'
      }
    })
  },
  blockUser: (req, res) => {
    db.Relationships.update({
      where: Sequelize.Or(
        {
          user_id: req.body.userId,
          friend_id: req.body.friendId,
          type: 'blocked'
        },
        {
          user_id: req.body.friendId,
          friend_id: req.body.userId,
          type: 'blocked'
        },
    )})
  }
}