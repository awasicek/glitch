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


// This route will allow users to register
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
    if (err) throw err;

    console.log('User saved successfully');
    var token = jwt.sign(newUser, process.env.SECRET, {
      expiresInMinutes: 1440 //24 hours
    });

    res.json({
      success: true,
      message: 'Successfully registered and you get a token!',
      token: token
    });
  });
});
//
// apiRouter.post('/authenticate', function(req, res){
//   console.log(req.body);
//   // Find the user
//   User.findOne({name: req.body.name}, function(err, user){
//     if (err) throw err;
//     // User not found
//     if (!user){
//       res.json({success: false, message: 'User not found'});
//     } else if (user) {
//       // password doesn't match
//       if (user.password != req.body.password){
//         res.json({success: false, message: 'Wrong password'});
//       } else {
//         // It means we found the user and the passwords match
//         var token = jwt.sign(user, app.get('superSecret'), {
//           expiresInMinutes: 1440 //24 hours
//         });
//
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
//
//       }
//     }
//   });
// });
//
// // route to show a message (GET /api)
// apiRouter.get('/', function(req, res) {
//   res.json({ message: 'Welcome to ChuckeCheese' });
// });
//
// // route middleware to verify token
// apiRouter.use(function(req, res, next){
//   // check header or url parameters or post parameters for a token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if (!token){
//     res.json({
//       success: false,
//       message: 'you need a token to play at ChuckeCheese'});
//   } else {
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err){
//         return res.json({
//           success: false,
//           message: 'That token is not legit'
//         });
//       } else {
//         // everything is good with the token, then save it to the req in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
// });
//
// // route to return all users (GET /api/users)
// apiRouter.get('/users', function(req, res) {
//   User.find({}, function(err, users) {
//     res.json({success: true, message: users});
//   });
// });



module.exports = apiRouter
