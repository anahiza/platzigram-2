var page = require('page');
var main = document.getElementById('main-container')

page('/', function(ctx, next){
  main.innerHTML='home'
})

page('/signup', function(ctx, next){
  main.innerHTML='signup'
})

page.start()
