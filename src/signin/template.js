var yo = require('yo-yo')
var landing = require('../landing')
var translate = require('../translate')

var box = yo`<div class="col s12 m7">
                <div class="row">
                  <div class="signup-box">
                    <h1 class="platzigram">Platzigram</h1>
                    <form action="/login" class="signup-form" method='POST'>
                      <div class="section">
                        <a href="/auth/facebook" rel="external" class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
                        <a href="/auth/facebook" rel="external" class="btn btn-fb hide-on-med-and-up">${translate.message('signup.text')}</a>
                      </div>
                      <div class="divider"></div>
                      <div class="section">
                        <input type="text" name="username" placeholder="${translate.message('username')}" />
                        <input type="password" name="password" placeholder="${translate.message('password')}" />
                        <button class="btn waves-effect waves-light btn-signup"type="submit">I">${translate.message('signup.text')}</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="login-box">
                    ${translate.message('signin.not-have-account')}<a href="/signup">${translate.message('signup.call-to-action')}</a>
                  </div>
                </div>
              </div>`
module.exports =landing(box)