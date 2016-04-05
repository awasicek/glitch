var
  express = require('express'),
  User = require('../models/user'),
  jwt = require('jsonwebtoken'),
  dotenv = require('dotenv').config({silent: true}),
  // apiCtrl = require('../controllers/api.js'),
  apiRouter = express.Router()


// apiRouter.route('/users')
//   .get(apiCtrl.index)
//   .post(apiCtrl.create)
//
// apiRouter.route('/users/:id')
//   .get(apiCtrl.show)
//   .patch(apiCtrl.update)
//   .delete(apiCtrl.delete)


// Route to Register User -- available with POST at /api/register
apiRouter.post('/register', function(req, res) {
  console.log(req.body);
  // create a new user
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });
  // save the new user
  newUser.save(function(err) {
    if (err) {
      console.log(err)
      res.json({success: false, message: 'Registration failed.  That email is taken.'})
    } else {
      console.log('User saved successfully');
      var token = jwt.sign(newUser, process.env.SECRET, {
        expiresInMinutes: 1440 //24 hours
      });
      res.json({
        success: true,
        message: 'Successfully registered and you get a token!',
        token: token
      })
    }
  })
});

// Route to Authenticate a User -- available with POST at /api/authenticate
apiRouter.post('/authenticate', function(req, res){
  console.log(req.body);
  // Find the user
  User.findOne({email: req.body.email}, function(err, user){
    if (err) throw err;
    // User not found
    if (!user){
      res.json({success: false, message: 'User not found.'});
    } else if (user) {
      // password doesn't match
      if (user.password != req.body.password){
        res.json({success: false, message: 'Incorrect password.'});
      } else {
        // It means we found the user and the passwords match
        var token = jwt.sign(user, process.env.SECRET, {
          expiresInMinutes: 1440 //24 hours
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

// Route to Show API Message -- available with GET at /api
apiRouter.get('/', function(req, res) {
  res.json({ message: 'Welcome to the User API for Glitch.' });
});

// ALL ROUTES BELOW THIS MIDDLEWARE WILL HAVE TO VERIFY THEIR TOKEN
// MIDDLEWARE TO VERIFY TOKENS
apiRouter.use(function(req, res, next){
  // check header or url parameters or post parameters for a token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token){
    res.json({
      success: false,
      message: 'A token is required to authenticate and access this part of the site.'});
  } else {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err){
        return res.json({
          success: false,
          message: 'That token is not legitimate.'
        });
      } else {
        // everything is good with the token, then save it to the req in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
});


// Route to Show all Users -- available with GET at /api/users
apiRouter.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json({success: true, message: users});
  });
});



module.exports = apiRouter
