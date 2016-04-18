//user model set up
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;


var Comment = new mongoose.Schema({
	comment: String,
	_answer: {type: ObjectId, ref: 'Answer'},
	_owner: String,
	points: Number,
	date_created: Date
})

module.exports = mongoose.model('Comment', Comment);