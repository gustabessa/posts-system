const Post = require('./model');
const db = require('../configs/sequelize');
const { Op } = require("sequelize");
const User = require('../user/model');

exports.create = (req, res) => {
  if (req.body.userId && req.body.userId != null && req.body.userId != 'null') {
    createWithUserId(req, res)
  } else {
    createWithAssociation(req, res)
  }
}

exports.findAll = (req, res) => {
  Post.findAll({include: User}, {order: ['createdAt', 'ASC']}).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}

exports.update = (req, res) => {
  Post.update({
    content: req.body.content
  }, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.send({'message': 'ok'})
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}

exports.remove = (req, res) => {
  Post.destroy({
    where: {
      id: req.body.id
    }
  }).then(affectedRows => {
    res.send({'message': 'ok', 'affectedRows': affectedRows})
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}

exports.search = (req, res) => {
  Post.findAll({
    include: User,
    where: {
      content: db.sequelize.where(
        db.sequelize.fn('upper', db.sequelize.col('content')),
        {
          [Op.like]: '%' + req.body.content.toUpperCase() + '%'
        }
      )
  }
},).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}

createWithAssociation = (req, res) => {
  Post.create({
    content: req.body.content,
    user: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }
  }, {
    include: [{
      association: Post.User 
    }]
  }).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}

createWithUserId = (req, res) => {
  Post.create({
    content: req.body.content,
    userId: req.body.userId
  }).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}
