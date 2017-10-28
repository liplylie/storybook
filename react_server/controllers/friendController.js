const db = require('../db/config');
const { or } = require('sequelize');

const Friendships = require('../db/models/friendship');
const User = require('../db/models/user');

module.exports = { 
  getFriendList: (req, res) => {
    //return array of friend ids using req.params.userId
    Friendships.findAll({
      where: { 
        friendship_type: 'friend',
        relating_user_id: req.params.userId
        // [or]: [{
        //   relating_user_id: req.params.userId,
        // },
        // {
        //   related_user_id: req.params.userId,
        // }]
      },
      include: [{
        model: User
      }]
    })
    .then(data => {
      res.status(200).send(data);
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
    Friendships.create({ 
      relating_user_id: req.body.friendId,
      related_user_id: req.body.userId, 
      friendship_type: 'pending'
    })
    .then(data => {
      res.status(202).send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  getRequests: (req, res) => {
    //get all pending where userId = req.params.userId
    Friendships.findAll({
      where: {
        relating_user_id: req.params.userId,
        type: 'pending'
      },
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
  acceptRequest: (req, res) => {
    //add req.params.friendId to current user's friend list and vice versa
    Friendships.update({
      friendship_type: 'friend'
    }, {
      where: {
        relating_user_id: req.body.userId,
        related_user_id: req.body.friendId,
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  },
  deleteRequest: (req, res) => {
    //add req.params.friendId to current user's friend list and vice versa
    Friendships.destroy({
      where: {
        relating_user_id: req.body.userId,
        related_user_id: req.body.friendId,
      },
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
  //delete request
  blockUser: (req, res) => {
    Friendships.update({
      where: { [Op.or]: [
        {
          relating_user_id: req.body.userId,
          related_user_id: req.body.friendId,
          type: 'blocked'
        },
        {
          relating_user_id: req.body.friendId,
          related_user_id: req.body.userId,
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
  //remove friend
  search: (req, res) => {
    if (!req.params.lastName) {
      Friendships.findAll({
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
      Friendships.findAll({
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