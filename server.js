var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  path = require('path')

// *** ENVIRONMENT PORT *** //
var port = process.env.PORT || 3000

// *** DATABASE *** //
var dbURL = 'mongodb://localhost/project-glitch'
// var dbURL = 'mongodb://' + process.env.MLAB_USERNAME + ':' + process.env.MLAB_PASSWORD + '@ds063134.mlab.com:63134/heroku_v7560t60'


mongoose.connect(dbURL, function(err){
  if(err) return console.log(err)
  console.log("Connected to MongoDB: " + dbURL)
})

// *** MIDDLEWARE *** //
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// *** ROUTES *** //
app.get('/', function(req, res){
  res.send("Home page")
  // res.sendFile(path.join(__dirname, 'public/index.html'))
})

// app.use('/api', userApiRoutes)


// *** SERVER LISTENING *** //
app.listen(3000, function(){
  console.log("Server running on: " + port + ".")
})
