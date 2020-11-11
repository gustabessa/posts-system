module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo user
  app.post('/usuarios', controller.create);

  // Busca todos os users
  app.get('/usuarios', controller.findAll);
}