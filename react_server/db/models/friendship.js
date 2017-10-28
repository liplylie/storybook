const Sequelize = require('sequelize');
const db = require('../config');

const User = require('./user');

const Friendships = db.define('friendship', {
  friendship_type: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

Friendships.belongsTo(User, {foreignKey: 'relating_user_id', allowNull: false, onDelete: 'CASCADE'});
User.hasMany(Friendships, {foreignKey: 'relating_user_id', allowNull: false, onDelete: 'CASCADE'});

Friendships.belongsTo(User, {foreignKey: 'related_user_id', allowNull: false, onDelete: 'CASCADE'});
User.hasMany(Friendships, {foreignKey: 'related_user_id', allowNull: false, onDelete: 'CASCADE'});

Friendships.removeAttribute('id')

module.exports = Friendships;