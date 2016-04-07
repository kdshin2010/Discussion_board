//user model set up
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId
	// Answer = require('../models/Comment.js')

var Post = new mongoose.Schema({
	category: String,
	topic: String,
	// _owner: {type: String, ref: 'User'},
	description: String,
	points: Number,
	owner: String,
	answers: [{type: ObjectId, ref: 'Answer'}],
	// comments: [{ type: ObjectId, ref: 'Comment'}],
	date_created: Date
});


module.exports = mongoose.model('Post', Post);