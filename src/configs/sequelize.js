const Sequelize = require('sequelize'); 
const configDB = require('./database.js');

const sequelize = new Sequelize(configDB);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

