const User = require('./model');
const db = require('../configs/sequelize');

exports.create = (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }).then(data => {
    res.send(data)
  }).catch('Erro ao criar');
}

exports.findAll = (req, res) => {
  User.findAll().then(data => {
    res.send(data)
  }).catch('Erro ao buscar todos')
}