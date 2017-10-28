const Sequelize = require('sequelize');
const db = require('../config');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  profile_image_url: {
    type: Sequelize.STRING
  },
  friends_count: {
    type: Sequelize.INTEGER
  },
  user_tags_array: {
    type: Sequelize.ARRAY({type: Sequelize.STRING})
  }
}, {
  timestamps: false
});

module.exports = User;