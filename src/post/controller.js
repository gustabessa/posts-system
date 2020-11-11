const Post = require('./model');
const db = require('../configs/sequelize');
const { Op } = require("sequelize");
const User = require('../user/model');

exports.create = (req, res) => {
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
    content: {
      [Op.like]: '%' + req.body.content + '%'
    }
  }
},).then(data => {
    res.send(data)
  }).catch(err => {
    console.log('Erro: ' + err)
  });
}