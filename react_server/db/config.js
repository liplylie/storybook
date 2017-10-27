const Sequelize = require('sequelize');
const key = require('../../sensitive.json');

const db = new Sequelize('postgres://'+key.username+':'+key.password+'@'+key.rds_endpoint+'/'+key.username);

db.authenticate()
.then(() => {
  console.log('Connected to db');
})
.catch((err) => {
  console.error('Err connecting to db', err);
});

module.exports = db;
