const Sequelize = require('sequelize');
const db = require('../config');

const Chatroom = db.define('chatroom', {
  admin: {
    type: Sequelize.STRING
  },
  chatroom_sender: {
    type: Sequelize.INTEGER
  },
  chatroom_recipient: {
    type: Sequelize.INTEGER
  },
}, {
  timestamps: false
});

Chatroom.sync();

module.exports = Chatroom;