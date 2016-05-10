//require login controller
//require Posts controller
//require comments controller
var express = require('express'),
  routes = express.Router(),
  passport = require('passport'),
  jwt = require('express-jwt'),
  auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
  }),
  users = require('../Controllers/users.js')
  posts = require('../Controllers/posts.js'),
  authentications = require('../Controllers/authentications.js'),
  profiles = require('../Controllers/profiles.js'),
  // comments = require('../controllers/comments.js'),
  User = require('../Models/User.js'),
  Post = require('../Models/Post.js'),


// ------------------ Register user ------------------------

routes.get('/profile', auth, function(req,res) {
  profiles.profileRead(req, res);
})

routes.post('/register', function(req, res){
  authentications.register(req, res);
});

routes.post('/login', function(req, res){
  console.log('in the controller')
  authentications.login(req,res);
});

routes.post('/logout', function(req, res){
  users.logout(req, res);
});

routes.post('/isLoggedIn', function(req, res) {
  users.isLoggedIn(req, res);
});

routes.get('/getPosts', function(req,res) {
  posts.show(req,res);
});

routes.post('/addPost', function(req, res) {
  posts.create(req, res);
});

routes.post('/answer', function(req, res) {
  posts.answer(req,res);
});

routes.get('/getAnswers', function(req, res) {
  posts.show(req,res);
});

routes.post('/findAnswer', function(req, res) {
  posts.findAnswer(req, res);
});

routes.post('/reply', function(req, res) {
  posts.reply(req,res);
});

routes.get('/getComments', function(req, res) {
  posts.showComments(req, res);
});

routes.post('/getPostById', function(req, res) {
  posts.getPostById(req, res);
});

routes.post('/comment', function(req, res){
  posts.comment(req, res);
});


routes.post('/getAnswers', function(req, res) {
  posts.getAnswers(req,res)
});





module.exports = routes;