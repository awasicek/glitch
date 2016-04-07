var
  express = require('express'),
  GlitchChapterOne = require('../models/glitchChapterOne.js'),
  storyRouter = express.Router()


// Route to Save a Story Object -- available with POST at /api/story/create
storyRouter.post('/create', function(req, res) {
  console.log(req.body);
  // create a new user
  var newStoryPart = new GlitchChapterOne({
    dialognumber: req.body.dialognumber,
    notes: req.body.notes,
    textone: req.body.textone,
    texttwo: req.body.texttwo,
    textthree: req.body.textthree,
    responseone: req.body.responseone,
    responsetwo: req.body.responsetwo,
    responsethree: req.body.responsethree,
    responsefour: req.body.responsefour,
    responsefive: req.body.responsefive
  });
  // save the new story part
  newStoryPart.save(function(err, story) {
    if (err) {
      console.log(err)
      res.json({success: false, message: 'Failed to create part of the story.'})
    } else {
      console.log('Part of the story saved successfully.');
      res.json({
        story: story,
        success: true,
        message: 'Part of the story saved successfully.'})
      };
  })
})

// Route to Show Story API Message -- available with GET at /api/story
storyRouter.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Story API for Glitch.' });
});

// Route to Show all Story Parts -- available with GET at /api/story/all
storyRouter.get('/all', function(req, res) {
  GlitchChapterOne.find({}, function(err, stories) {
    res.json({success: true, stories: stories});
  });
});

// Route to Show One Specific Story Part -- available with GET at /api/story/:id
storyRouter.get('/:id', function(req, res) {
  GlitchChapterOne.findOne({dialognumber: req.params.id}, function(err, story) {
    res.json({success: true, story: story});
  });
});



// To Do -- Route to Update Story Part

// To Do -- Route to Delete Story Part


module.exports = storyRouter
