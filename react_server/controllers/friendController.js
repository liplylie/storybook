const db = require('../db/config')

module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.params.userId
    Relationships.findAll({
      where: {
        user_id: req.params.userId,
        friend_type: 'friend'
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err); 
    })
  },
  getFriendInfo: (req, res) => {
    //get user info as object using req.params.friendId
    User.findAll({
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
    Relationships.create({ 

    })
  },
  getRequests: (req, res) => {
    //get all pending where userId = req.params.userId
    Relationships.findAll()
  }, 
  acceptRequest: (req, res) => {
    //add req.params.friendId to current user's friend list and vice versa
  }

}