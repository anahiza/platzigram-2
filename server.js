var express = require('express');
var app = express();
var multer  = require('multer')
var ext = require('file-extension')
var aws =require('aws-sdk')
var multerS3 = require('multer-s3')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var passport = require('passport')
var platzigram_client=require('platzigram-client')
var auth = require('./auth')


var config = require('./config')
var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey,
  region: 'us-east-2'
})

var storage = multerS3({
  s3: s3,
  bucket: 'anhy-platzigram',
  acl: 'public-read',
  metadata: function(req, file, cb){
    cb(null, {fieldName: file.fieldname})
  },
  key: function (req, file, cb){
    cb(null, +Date.now()+'.' + ext(file.originalname))
  }
})

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, +Date.now()+'.' + ext(file.originalname))
//   }
// })

var upload = multer({ storage: storage }).single('picture');

var client = platzigram_client.createClient(config.client)

app.set(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')

app.use(express.static('public'))

passport.use(auth.localStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

app.get('/', function(req, res){
  res.render('index', {title: 'Platzigram'})
})

app.get('/signup', function(req, res){
  res.render('index', {title: 'Platzigram - Sign up'})
})

app.post('/signup', function(req, res){
  var user = req.body
  client.saveUser(user, function(err, usr){
    if (err) return res.status(500).send(err.message)
    res.redirect('/signin')
  })

})

app.get('/signin', function(req, res){
  res.render('index', {title: 'Platzigram - Sign in'})
})

app.post('/login', passport.authenticate('local', {
  sucessRedirect:'/',
  failureRedirect: '/signin'
})
)

function ensureAuth(req, res, next){
  if (req.isAutheticated()){
    return next()
  }
  res.status(401).send({error: 'not authenticated'})

}

app.get('/api/pictures', function(req,res){

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
  setTimeout(() => res.send(pictures),1000)
})

app.post('/api/pictures', ensureAuth, function(req, res){
  upload(req,res, function(err){
      console.log(s3)
        if (err){
            return res.status(500).send("Error uploading file"+err);
        }
        res.status(200).send("File uploaded");

    })
})

app.get('/api/user/:username', function (req, res) {
  var user=
		{
			username: 'Anahi',
			avatar: 'https://pbs.twimg.com/profile_images/308830576/hand_400x400.jpg',
			pictures: [
				{
					id:1,
					src:'https://image.freepik.com/foto-gratis/trabajando-desde-la-cama_385-19324222.jpg',
					likes: Math.floor((Math.random()*100)+1)
				},
				{
					id:2,
					src:'https://image.freepik.com/vector-gratis/programador-en-el-ordenador_23-2147505689.jpg',
					likes:Math.floor((Math.random()*100)+1)
				},
				{
					id:3,
					src:'https://image.freepik.com/vector-gratis/areas-de-trabajo-en-e-business_23-2147499433.jpg',
					likes:34
				},
				{
					id:4,
					src:'https://image.freepik.com/foto-gratis/trabajando-en-una-tableta_1112-167.jpg',
					likes:6
				},
				{
					id:5,
					src:'https://image.freepik.com/foto-gratis/trabajando-en-una-tableta_1112-167.jpg',
					likes:5
				},
				{
					id:6,
					src:'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/12904985_475045592684864_301128546_n.jpg?ig_cache_key=MTIyMzQwNjg2NDA5NDE2MDM5NA%3D%3D.2',
					likes:0
				}
			]
		}
	res.send(user);
})

app.get('/:username', function(req, res) {
  res.render('index', {title: `Platzigram - ${req.params.username}`})
})

app.get('/:username/:id', function(req, res) {
  res.render('index', {title: `Platzigram - ${req.params.username}`})
})

app.listen(3000, function (err) {
  if(err) return console.log(err.message), process.exit(1);
  console.log("Platzigram escuchando en el puerto 3000")
})
