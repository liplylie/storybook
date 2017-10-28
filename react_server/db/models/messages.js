const Sequelize = require('sequelize');
const db = require('../config');

const Chatroom = require('./chatroom');
const User = require('./user');

const Messages = db.define('message', {
  message: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

Messages.belongsTo(Chatroom, {foreignKey: 'message_chatroom', allowNull: false, onDelete: 'CASCADE'});
Chatroom.hasMany(Messages, {foreignKey: 'message_chatroom', allowNull: false, onDelete: 'CASCADE'});

Messages.belongsTo(User, {foreignKey: 'sender', allowNull: false, onDelete: 'CASCADE'});
User.hasMany(Messages, {foreignKey: 'sender', allowNull: false, onDelete: 'CASCADE'});

module.exports = Messages;