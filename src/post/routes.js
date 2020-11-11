module.exports =  (app) => {
  const controller = require('./controller')
  
  // Criar novo post
  app.post('/posts', controller.create);

  // Busca todos os posts
  app.get('/posts', controller.findAll);

  // Busca post por conteudo
  app.post('/posts/search', controller.search);

  // Atualiza post
  app.put('/posts', controller.update);

  // Deleta o post
  app.delete('/posts', controller.remove);
}