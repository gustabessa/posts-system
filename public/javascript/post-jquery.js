const Posts = {
  addSuccess: () => {

    $('#content').val('')
    $('#firstname').val('')
    $('#lastname').val('')

    var toast = $('<div></div>').attr('class', 'max-width gray-box toast-success').attr('id', 'toast')
    var message = $('<p></p>').attr('class', 'text-center').html('Post inserido com sucesso!')

    $(toast).append(message)
    var toasts = $('.toasts');
    toasts.append(toast)
    setTimeout(() => {
      toasts[0].removeChild(toasts[0].firstChild);
    }, 1500);
  },

  add: () => {

    var user = $('#userlist').find(':selected')
    var id = $(user).attr('id')?.replace('user-', '')

    var t = {}
    t.content = $('#content').val()
    t.firstname = $('#firstname').val()
    t.lastname = $('#lastname').val()
    t.userId = id

    $.ajax({
      type: 'POST',
      url: '/posts',
      data: t,
      dataType: 'json',
      success: data => {
        Posts.addSuccess();
        Users.findAll();
        Posts.findAll();
      }
    })

    return false
  },

  template: data => {
    var comments = $('#comments')

    var comment = $('<div></div>').attr('id', 'comment-' + data.id)
      .attr('class', 'comment')

    var content = $('<textarea></textarea>')
      .attr('class', 'content')
      .attr('disabled', true)
      .html(data.content)

    var user = $('<p></p>').attr('class', 'user')
      .html('Por: <strong>' + data.user.firstname + ' ' + data.user.lastname + '</strong> Data: ')

    var date = $('<span></span>').attr('class', 'date')

    var dtCreation = new Date(data.createdAt)
    dtCreation = new Intl.DateTimeFormat('pt-BR').format(dtCreation)
    date.html(dtCreation)

    var btnEdit = $('<button></button>')
      .attr('class', 'edit')
      .on('click', (event) => {
        Posts.enableEdit(event.target)
      })
      .html('Editar')
      
    var btnSave = $('<button></button>')
      .attr('class', 'save hidden')
      .on('click', (event => {
        Posts.update(event.target)
      }))
      .html('Salvar')

    var btnRemove = $('<button></button>')
      .attr('class', 'remove')
      .on('click', (event => {
        Posts.remove(event.target)
      }))
      .html('Remover')

    var hr = $('<hr />')

    $(user).append(date)

    $(comment).append(content)
    $(comment).append(user)
    $(comment).append(btnEdit)
    $(comment).append(btnSave)
    $(comment).append(btnRemove)

    $(comments).append(comment)
    $(comments).append(hr)
  },

  enableEdit : (button) => {
    var comment = $(button).parent()
    $(comment).children('textarea').prop('disabled', false)
    $(comment).children('button.edit').hide()
    $(comment).children('button.save').show()
  },

  update: (button) => {
    var comment = $(button).parent()

    var id = $(comment).attr('id').replace('comment-', '')
    var content = $(comment).children('textarea').val()

    $.ajax({
      type: 'PUT',
      url: '/posts',
      dataType: 'json',
      data: {'content': content, 'id': id},
      success: data => {
        $(comment).children('textarea').prop('disabled', true)
        $(comment).children('button.edit').show()
        $(comment).children('button.save').hide()
      },
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },

  remove: (button) => {
    var comment = $(button).parent()
    var hr = comment.next()
    var id = $(comment).attr('id').replace('comment-', '')

    $.ajax({
      type: 'DELETE',
      url: '/posts',
      dataType: 'json',
      data: {'id': id},
      success: data => {
        $(comment).remove()
        $(hr).remove()
      },
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },

  limparTodos: () => {
    let comments = $('#comments')[0]
    
    while (comments.firstChild) {
      comments.removeChild(comments.firstChild);
    }
  },
  
  findAll: () => {
    $.ajax({
      type: 'GET',
      url: '/posts',
      dataType: 'json',
      success: Posts.printAll,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },
  
  printAll: (arr) => {
    arr.forEach(element => Posts.template(element));
  },

  buscar: (button) => {
    var divBusca = $(button).parent()

    let textoBusca = $(divBusca).children('input').val()

    $.ajax({
      type: 'POST',
      url: '/posts/search',
      dataType: 'json',
      data: {'content': textoBusca},
      success: data => {
        Posts.limparTodos();
        Posts.printAll(data);
      },
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  }
}

const Users = {
  findAll: () => {
    $.ajax({
      type: 'GET',
      url: '/usuarios',
      dataType: 'json',
      success: Users.fillSelectArray,
      error: () => {
        console.log('Ocorreu um erro!');
      }
    })
  },

  fillSelectArray: arr => {
    Users.limparTodos()
    arr.forEach(user => {
      Users.fillSelect(user)
    });
  },

  fillSelect: data => {

    var select = $('#userlist')
    var option = $('<option></option>').attr('id', 'user-' + data.id).text(data.firstname + ' ' + data.lastname)

    $(select).append(option)
  }, 

  limparTodos: () => {
    let select = $('#userlist')[0]
    
    while (select.children[1]) {
      select.removeChild(select.children[1]);
    }
  },
}

const onChangedUser = () => {
  var selectVal = $('#userlist').val()
  
  if (selectVal && selectVal != null && selectVal != 'null') {
    $('#firstname').val('')
    $('#lastname').val('')
    $('#firstname').prop('disabled', true)
    $('#lastname').prop('disabled', true)
  } else {
    $('#firstname').prop('disabled', false)
    $('#lastname').prop('disabled', false)
  }
}

$(document).ready(() => {
  Posts.findAll();
  Users.findAll();
})