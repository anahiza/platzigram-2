var yo = require('yo-yo')
var translate = require('../translate')

module.exports = function pictureCard( pic) {
var el;

function render(picture){

  return yo`
          <div class="card ${picture.liked ? 'liked' :''}">
            <div class="card-image">
              <img src="${picture.src}">
            </div>
            <div class="card-content">
              <a href="/${picture.user.name}" class="card-title">
                <img src="${picture.user.avatar}" alt="" class="avatar" />
                <span class="username">${picture.user.username}</span>
              </a>
              <small class="right time">${translate.date.format(new Date(picture.createdAt).getTime())}</small>
              <p>
                <a href="" class = "left" onclick=${like.bind(null, true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
                <a href="" class = "left" onclick=${like.bind(null, false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
                <span class="left likes">${translate.message('likes', {likes: picture.likes || 0})}</span>

              </p>
            </div>
          </div>`
}


    function like(liked){
      pic.liked=liked
      pic.likes+=liked ? 1 : -1
      var newEl = render(pic)
      yo.update(el, newEl);
      return false
    }

  el=render(pic)
  return el
  }
