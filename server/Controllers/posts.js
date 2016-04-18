var mongoose = require('mongoose'),
	Post = mongoose.model('Post'),
	Answer = mongoose.model('Answer'),
	Comment = mongoose.model('Comment'),
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

posts.answer = function(req, res) {
	console.log(req.body);
	console.log('id' + req.body.id)
	Post.findOne({_id: req.body.id}, function(err, result) {
		if(err) {
			console.log('errror funding the post!')
		} else {
			var answer = new Answer({ _owner: req.body.owner, answer: req.body.answer })//})
			answer._post = result._id
			result.answers.push(answer)
			result.save(function(err) {
				if(err) {
					console.log(err)
				} else {
					answer.save(function(err) {
						if(err) {
							console.log(err)
						} else {
							console.log('successfully savied answer!')
						}
					})
				}
			})
		}
	})
}

// posts.show = function(req, res) {
// 	Post.find()
// 	.populate('answers')
// 	.exec(function(err, result) {
// 		if(err) {
// 			console.log('error finding post')
// 		} else {
// 			res.json(result)
// 		}
// 	})
// }

posts.show = function(req,res) {
  Post.find()
    .populate({
      "path": "answers",
      "populate": {
        "path": "comments",
        "model": "Comment"  
      }
    })
    .exec(function(err,result) {
        if (err) {
           console.log(err);
        } else {
        	console.log(' * line 71 ');
        	var p = result[0].answers;
			for (var key in p) {
				  if (p.hasOwnProperty(key)) {
				    console.log(key + "****-> " + p[key]);
				  }
				}
		   // console.log(JSON.stringify(result))
           res.json(result)
        }
    });


}





posts.showComments = function(req, res){
	Answer.find()
	.populate('comments')
	.exec(function(err, result) {
		if(err) {
			console.log('**********************')
			console.log(err)
		} else {
			console.log(result)
			res.json(result)
		}
	})
}





posts.reply = function(req, res) {
	var deferred = $q.defer()
	Answer.findOne({_id:req.body.id}, function(err, result) {
		if(err) {
			console.log(err);
			deferred.reject(err);
		} else {
			var comment = new Comment({_owner: req.body.owner, comment: req.body.comment});
			comment._answer = result._id;
			result.comments.push(comment);
			result.save(function(err) {
				if(err) {
					console.log(err);
					deferred.reject();
				} else {
					comment.save(function(err) {
						if(err) {
							console.log(err);
							deferred.reject();
						} else {
							console.log('succes');
							deferred.resolve();
						}
					})
				}
			})
		}
	})
	return deferred.promise;
}




module.exports = posts
