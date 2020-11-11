const db = require('../configs/sequelize');
const sequelize = db.sequelize;
const { Model, DataTypes } = db.Sequelize;
const User = require('../user/model');

class Post extends Model {}

Post.init({
  content: {
    type: DataTypes.STRING
  }
}, {sequelize, modelName: "posts"})

Post.User = Post.belongsTo(User);

module.exports = Post