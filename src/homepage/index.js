var page = require('page');
var yo = require('yo-yo')
var main = document.getElementById('main-container');
var empty = require('empty-element')

page('/', function(ctx, next){
  main.innerHTML='<a href="/signup">Sign up</a>'
})
