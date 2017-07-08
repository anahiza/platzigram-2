var page = require('page');
var yo = require('yo-yo')
var empty = require('empty-element')
var title = require('title')
var template = require('./template')
var request = require('superagent')
var header = require('../header')
var axios = require('axios')
var Webcam = require('webcamjs')
var picture = require('../picture-card')
var utils  = require('../utils')
var io = require('socket.io-client')
var socket=io.connect('http://localhost:5151')

page('/', utils.loadAuth, header, loading, asyncLoad, function(ctx, next){
  title= 'Platzigram'
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.pictures))

  const picturePreview=$('#picture-preview')
  const camaraInput=$('#camara-input')
  const cancelPicture=$('#cancelPicture')
  const shootButton = $('#shoot')
  const uploadButton = $('#upload-button')

  function reset(){
    picturePreview.addClass('hide')
    cancelPicture.addClass('hide')
    uploadButton.addClass('hide')
    shootButton.removeClass('hide')
    camaraInput.removeClass('hide')

  }

  cancelPicture.click(reset)

  $('.modal-trigger').leanModal({
    ready: function(){
     Webcam.set({
            width: 320,
            height: 240,
        });

        Webcam.attach('#camara-input');
        shootButton.click((ev)=>{
          Webcam.snap((data_uri) => {
            picturePreview.html(`<img src="${data_uri}"/>`);
            picturePreview.removeClass('hide')
            cancelPicture.removeClass('hide')
            uploadButton.removeClass('hide')
            shootButton.addClass('hide')
            camaraInput.addClass('hide')
            uploadButton.off('click')
            uploadButton.click(()=>{
              const pic ={
                      url:data_uri,
                      likes:0,
                      liked: false,
                      createdAt: +new Date(),
                      user:{
                        username: 'Anahi',
                        avatar: 'https://pbs.twimg.com/profile_images/308830576/hand_400x400.jpg',
                      }
              }
              $('#picture-cards').prepend(picture(pic))
              reset()
              $('#modalCamara').closeModal();
             })
          });
        })
    },
    complete: function(){
      Webcam.reset()
      reset()

    },
    dissmisible: true
  })

})

socket.on('image', function(image){
  var picturesEl = document.getElementById('pictures-container')
  var first = picturesEl.firstChild
  var img = picture(image)
  picturesEl.insertBefore(img, first)
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
