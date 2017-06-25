'use strict'
const config={

	aws:{
		accessKey: process.env.AWS_ACCESS_KEY_ID,
		secretKey: process.env.AWS_SECRET_ACCESS_KEY
	},
  secret: process.env.PLATZIGRAM_SECRET || 'platzi',
  client: {
    endpoints:{
      pictures:'http://api.platigram.com/pictures',
      users:'http://api.platigram.com/user',
      auth:'http://api.platigram.com/auth'
    }
  },
  auth:{
    facebook:{
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clienteSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://platigram.com/auth/facebook/callback/'
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }
  config.auth.facebook.callbackURL= 'http://platzigram.test:5050/auth/facebook/callback/'
}

module.exports = config;
