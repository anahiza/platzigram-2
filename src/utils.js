var axios = require('axios')

async function loadAuth(ctx, next){
  try{
    var whoami=await axios.get('/whoami').then(res=> res.data)
    if (whoami.username){
      ctx.auth=whoami
    }else {
      ctx.auth=false
    }
    next()
  } catch (e){
    console.log(e)
  }
}

exports.loadAuth=loadAuth
