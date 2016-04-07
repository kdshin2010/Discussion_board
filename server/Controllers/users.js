var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	users = {};

users.register = function(req, res) {
	console.log(req.body)
	var user = new User({username: req.body.username, isLoggedIn: true})
	user.save(function(err) {
		if(err) {
			console.log('error')
		} else {
			console.log('success saving to the datbase')
			res.end();
		}
	})
}

users.check = function(req, res) {
	console.log(req.body)
	User.find({username: req.body.username}, function(err, results) {
		if(err) {
			console.log('couldnt find this user')
		} else {
			console.log(results)
			res.json(results)
		}
	})
}


//update user


users.logout = function(req, res) {
	User.update({username: req.body.username}, { $set: {isLoggedIn: false }}, function(err, result) {
		if(err) {
			console.log(err)
		} else {
			console.log(result);
			console.log('above is the reuslt')
			res.json(result);
			res.end()
		}
	})
}


users.isLoggedIn = function(req, res) {
	User.findOne({username: req.body.username}, function(err, result) {
		if(err) {
			console.log('error')
		} else {
			if(result.isLoggedIn = true) {
				res.json('Logged In')
			} else if(result.isLoggedIn = false) {
				res.json('Logged Out')
			}
		}
	})
}




module.exports = users;






// var mongoose = require('mongoose');
// var Post = mongoose.model('Post');
// var Comments = mongoose.model('Comment')
// var posts = {};




