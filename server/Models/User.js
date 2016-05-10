// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema,
// 	passportLocalMongoose = require('passport-local-mongoose');

// var User = new mongoose.Schema({
// 	username: String,
// 	password: String
// 	// posts: [{type: ObjectId, ref: 'Post' }]
// })

// User.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', User)


var mongoose = require('mongoose'),
	crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');



var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

User.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', User);


module.exports = mongoose.model('User', User)
