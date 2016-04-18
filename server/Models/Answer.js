var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;


var Answer = new mongoose.Schema({
	answer: String,
	_post: {type: ObjectId, ref:'Post'},
	_owner: String,
	points: Number,
	comments: [{type: ObjectId, ref: 'Comment'}],
	date_created: Date
})

module.exports = mongoose.model('Answer', Answer);
