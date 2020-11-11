const db = require('../configs/sequelize');
const sequelize = db.sequelize;
const { Model, DataTypes } = db.Sequelize;

class User extends Model {}

User.init({
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  }
}, {sequelize, modelName: "users"})

module.exports = User