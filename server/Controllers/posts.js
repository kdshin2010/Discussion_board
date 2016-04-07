var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	Answer = mongoose.model('Answer'),
	posts = {};

posts.create = function(req, res) {
	var post = new Post({category: req.body.category, topic: req.body.topic, description: req.body.description, owner: req.body.owner})
	post.save(function(err) {
		if(err) {
			console.log('error saving post')
		} else {
			console.log('success saving post')
		}
	})

}
// posts.show = function(req, res) {
// 	Post.find({}, function(err, posts) {
// 		if(err) {
// 			console.log('error finding post')
// 		} else {
// 			res.json(posts)
// 		}
// 	})
// }

posts.answer = function(req, res) {
	console.log(req.body)
	console.log('the above is req.body')
	Post.findOne({_id: req.body.id}, function(err, result) {
		if(err) {
			console.log('errror funding the post!')
		} else {
			var answer = new Answer({answer: req.body.answer, _owner: req.body.owner})
			answer._post = result._id
			result.answers.push(answer)
			result.save(function(err) {
				if(err) {
					console.log('error saving post.answers array')
				} else {
					answer.save(function(err) {
						if(err) {
							console.log('error saving answer')
						} else {
							console.log('successfully savied answer!')
						}
					})
				}
			})

		}
	})
}

posts.show = function(req, res) {
	Post.find()
	.populate('answers')
	.exec(function(err, result) {
		if(err) {
			console.log('error finding story')
		} else {
			console.log(result)
			res.json(result)
		}
	})

}

posts.findAnswer = function(req, res) {
	Answer.find({_post: req.body.id}, function(err, result) {
		if(err) {
			console.log('error finding answer')
		} else {
			response.json(result)
		}
	})
}


module.exports = posts
