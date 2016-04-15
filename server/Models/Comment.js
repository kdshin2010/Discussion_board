//user model set up
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;

var Answer = new mongoose.Schema({
	answer: String,
	_post: {type: ObjectId, ref:'Post'},
	_owner: String,
	points: Number,
	date_created: Date
})

var Comment = new mongoose.Schema({
	comment: String,
	_answer: {type: ObjectId, ref: 'Answer'},
	_owner: String,
	points: Number,
	date_created: Date
})


module.exports = mongoose.model('Answer', Answer)