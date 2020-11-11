Posts = {
  add: () => {
    var t = {}
    t.content = document.getElementById('content').value
    t.firstname = document.getElementById('firstname').value
    t.lastname = document.getElementById('lastname').value

    var xhttp = new XMLHttpRequest()
    
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var resp = JSON.parse(xhttp.responseText)
        if (resp) {
          Posts.template(resp)
        }
      }
    }

    xhttp.open("POST", "/posts", true)
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhttp.send(JSON.stringify(t))

    return false
  },

  template: data => {
    var comments = document.getElementById('comments')

    var comment = document.createElement('div')
    comment.setAttribute('id', 'comment-' + data.id)
    comment.setAttribute('class', 'comment')

    var content = document.createElement('p')
    content.setAttribute('class', 'content')
    content.innerHTML = data.content

    var user = document.createElement('p')
    user.setAttribute('class', 'user')
    user.innerHTML = 'Por: <strong>' + data.user.firstname + ' ' + data.user.lastname + '</strong> Data: '

    var date = document.createElement('span')
    date.setAttribute('class', 'date')

    var dtCreation = new Date(data.createdAt)
    dtCreation = new Intl.DateTimeFormat('pt-BR').format(dtCreation)
    date.innerHTML = dtCreation

    user.append(date)

    comment.append(content)
    comment.append(user)
    comments.append(comment)
    
  }
}