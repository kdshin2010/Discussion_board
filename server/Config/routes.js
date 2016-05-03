//require login controller
//require Posts controller
//require comments controller
var express = require('express'),
  routes = express.Router(),
  passport = require('passport'),
  users = require('../Controllers/users.js')
  posts = require('../controllers/posts.js'),
  // comments = require('../controllers/comments.js'),
  User = require('../Models/User.js'),
  Post = require('../Models/Post.js');

// ------------------ Register user ------------------------
routes.post('/user/register', function(req, res) {
  console.log(req.body)
  User.register(new User({ username: req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

routes.post('/user/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!', user: user});
      console.log(req.user)
    });
  })(req, res, next);
});

routes.post('/user/register', function(req, res) {
	users.register(req, res)
})

routes.post('/check', function(req, res) {
	users.check(req, res);
})

routes.post('/logout', function(req, res){
  users.logout(req, res);
})

routes.post('/isLoggedIn', function(req, res) {
  users.isLoggedIn(req, res);
})

routes.post('/addPost', function(req, res) {
  posts.create(req, res);
})

routes.get('/getPosts', function(req, res) {
  posts.show(req, res);
})

routes.post('/answer', function(req, res) {
  posts.answer(req,res);
})

routes.post('/getAnswers', function(req, res) {
  posts.show(req,res);
})

routes.post('/findAnswer', function(req, res) {
  posts.findAnswer(req, res);
})

routes.post('/reply', function(req, res) {
  posts.reply(req,res);
})

routes.get('/getComments', function(req, res) {
  posts.showComments(req, res);
})

routes.post('/getPostById', function(req, res) {
  posts.getPostById(req, res);
})

routes.post('/getAnswersForPost', function(req, res){
  posts.getAnswersForPost(req, res)
})





module.exports = routes;