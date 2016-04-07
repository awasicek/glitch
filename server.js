var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  path = require('path'),
  favicon = require('serve-favicon'),
  // dotenv = require('dotenv').config({silent: true}),
  // ** NOTE ** comment out dotenv requirement for heroku deployment because .env variables are set via CLI to heroku directly //
  config = require('./config'),
  User = require('./models/user'),
  apiRoutes = require('./routes/api.js')

// *** ENVIRONMENT PORT *** //
var port = process.env.PORT || 3000

// *** DATABASE *** //
// var dbURL = 'mongodb://localhost/project-glitch'
var dbURL = 'mongodb://' + process.env.MLAB_USERNAME + ':' + process.env.MLAB_PASSWORD + '@ds019480.mlab.com:19480/heroku_n3p20jtb'


mongoose.connect(dbURL, function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB: " + dbURL)
})

// *** CONFIG *** //
app.set('superSecret', config.secret);

// *** MIDDLEWARE *** //
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// *** ROUTES *** //
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/api', apiRoutes)


// *** SERVER LISTENING *** //
app.listen(3000, function(){
  console.log("Server running on: " + port + ".")
})
