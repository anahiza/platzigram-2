var page = require('page');
var yo = require('yo-yo')
var empty = require('empty-element')
var title = require('title')
var template = require('./template')
var request = require('superagent')
var header = require('../header')
var axios = require('axios')

page('/', header, loading, asyncLoad, function(ctx, next){
  title= 'Platzigram'
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures))

})

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function(err, res){
      if (err) return console.log(err)
      ctx.pictures = res.body
      next()
    })
}

function loadPicturesAxios(ctx, next){
  axios
    .get('/api/pictures')
    .then(function(res){
      ctx.pictures = res.data
      next()
    })
    .catch(function(err){
      console.log(err)
    })

}

function loadPicturesFetch(ctx, next){
  fetch('/api/pictures')
    .then(function (res){
      return res.json()
    })
    .then( function (pictures){
      ctx.pictures=pictures
      next()
    })
    .catch( function (err) {
      console.log(err)
    })
}

async function asyncLoad(ctx, next){
      try{
        var pictures = await fetch('/api/pictures').then(res=>res.json())
        ctx.pictures=pictures
        next()
      }catch(err){
        return console.log(err)
      }
}


async function loading(ctx, next){
  var el=document.createElement('div')
  el.classList.add('loader')
  document.getElementById('main-container').appendChild(el)
  next()
}
