var express = require('express');
var app = express();

app.set('view engine', 'pug')

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index', {title: 'Platzigram'})
})

app.get('/signup', function(req, res){
  res.render('index', {title: 'Platzigram - Sign up'})
})

app.get('/signin', function(req, res){
  res.render('index', {title: 'Platzigram - Sign in'})
})

app.listen(3000, function (err) {
  if(err) return console.log(err.message), process.exit(1);
  console.log("Platzigram escuchando en el puerto 3000")
})
