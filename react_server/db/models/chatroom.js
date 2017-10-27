const Sequelize = require('sequelize');
const db = require('../config');
const User = require('./user');

const Chatroom = db.define('chatroom', {
  admin: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

User.hasMany(Chatroom, {foreignKey: 'chatroom_sender', allowNull: false, onDelete: 'CASCADE'});
Chatroom.belongsTo(User, {foreignKey: 'chatroom_sender', allowNull: false, onDelete: 'CASCADE'});

User.hasMany(Chatroom, {foreignKey: 'chatroom_recipient', allowNull: false, onDelete: 'CASCADE'});
Chatroom.belongsTo(User, {foreignKey: 'chatroom_recipient', allowNull: false, onDelete: 'CASCADE'});

Chatroom.sync();

module.exports = Chatroom;