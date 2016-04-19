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
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	username: String,
	password: String,
	email: String
	// posts: [{type: ObjectId, ref: 'Post' }]
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)
