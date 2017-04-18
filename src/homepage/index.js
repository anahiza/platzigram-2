var page = require('page');
var yo = require('yo-yo')
var empty = require('empty-element')
var title = require('title')
var template = require('./template')

page('/', function(ctx, next){
  title= 'Platzigram'
  var main = document.getElementById('main-container');
  var pictures=[
    {
      user:{
        username:'Anahi',
        avatar:'https://lh3.googleusercontent.com/-vHUbokKYy8E/AAAAAAAAAAI/AAAAAAAACIo/xcEEOpJnzfI/s60-p-rw-no/photo.jpg'
      },
      url:'https://images.pexels.com/photos/214221/pexels-photo-214221.jpeg',
      likes:0,
      liked: false,
      createdAt: +new Date()
    },
    {
      user:{
        username:'Anahi',
        avatar:'https://lh3.googleusercontent.com/-vHUbokKYy8E/AAAAAAAAAAI/AAAAAAAACIo/xcEEOpJnzfI/s60-p-rw-no/photo.jpg'
      },
      url:'https://image.freepik.com/free-photo/working-with-a-coffee_1112-145.jpg',
      likes:156,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate()-10)
      
    }
  ]


  empty(main).appendChild(template(pictures))

})