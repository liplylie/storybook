const Sequelize = require('sequelize');
const db = require('../config');

const Chatroom = db.define('chatroom', {
  admin: {
    type: Sequelize.STRING
  },
  chatroom_sender: {
    type: Sequelize.INTEGER
  },
  chatroom_recipent: {
    type: Sequelize.INTEGER
  },
});

Chatroom.sync();

module.exports = Chatroom;