const Sequelize = require('sequelize');
const key = require('../../')

const db = new Sequelize(process.env.DATABASE_URL);

db.authenticate()
.then(() => {
  console.log('Connected to db');
})
.catch((err) => {
  console.error('Err connecting to db', err);
});

module.exports = db;
