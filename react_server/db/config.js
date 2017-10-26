const Sequelize = require('sequelize');
require('dotenv').config();

// const db = new Sequelize('postgres://'+key.username+':'+key.password+'@'+key.rds_endpoint+'/'+key.username);
const db = new Sequelize('postgres://'+process.env.USERNAME+':'+process.env.PASSWORD+'@'+process.env.RDS_ENDPOINT+'/'+process.env.USERNAME);

db.authenticate()
.then(() => {
  console.log('Connected to db');
})
.catch((err) => {
  console.error('Err connecting to db', err);
});

module.exports = db;
