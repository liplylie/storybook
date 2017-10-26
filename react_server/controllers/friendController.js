const db = require('../db/config')

module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.params.userId
    db.Relationships.findAll({
      where: { [Op.or]: [
        {
          user_id: req.params.userId,
          friend_type: 'friend'
        },
        {
          friend_id: req.params.userId,
          friend_type: 'friend'
        },
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
  // getFriendInfo: (req, res) => {
  //   //get user info as object using req.params.friendId
  //   db.User.findAll({
  //     where: {id: req.params.friendId},
  //     attributes: [name, profile_image_url],
  //   })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send(err); 
  //   })
  // }, 
  sendRequest: (req, res) => {
    //add req.body.userId to req.params.friendId friend's pending friend requests
    db.Relationships.create({ 
      user_id: req.body.friendId,
      friend_id: req.body.userId, 
      type: 'pending'
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
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
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
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
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  blockUser: (req, res) => {
    db.Relationships.update({
      where: { [Op.or]: [
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
      ]}
      .then(data => {
        res.json('User successfully blocked');
      })
      .catch(err => {
        res.status(500).send(err);
      })
    })
  },
  search: (req, res) => {
    if (!req.params.lastName) {
      db.Relationships.findAll({
        where: {first_name: req.params.firstName},
        include: [{
          model: User,
          attributes: [name, profile_image_url]
        }]
      })
      .then(data => {
        res.send(data); 
      })
      .catch(err => {
        res.status(500).send(err);
      })
    } else {
      db.Relationships.findAll({
        where: {
          first_name: req.params.firstName,
          last_name: req.params.lastName
        },
        include: [{
          model: User,
          attributes: [name, profile_image_url]
        }]
      }) 
      .then(data => {
        res.send(data); 
      })
      .catch(err => {
        res.status(500).send(err);
      })
    }
  },
  getFriendProfile: (req, res) => {
    db.User.findAll({
      where: {id: req.params.friendId}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(data);
    })
  }
}