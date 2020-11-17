const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./src/configs/sequelize')
const ROOT_PATH = __dirname

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true})) 
app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.sendFile(ROOT_PATH + '/public/views/index.html')
})

db.sequelize.sync({alter: true}).then(()=>{
  console.log('Sincronizado com sucesso!')})
  .catch(console.log)

require('./src/user/routes')(app)
require('./src/post/routes')(app)

var server = app.listen(3000, () => {
  console.log('Servidor rodando na porta ' + server.address().port + ' no host ' + server.address().address)
})