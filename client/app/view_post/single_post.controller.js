(function(){
	angular
		.module('app.single_post')
		.controller('SinglePostController', SinglePostControllerFunction)


		SinglePostControllerFunction.$inject = ['$routeParams', 'PostsFactory', 'AuthFactory']

		function SinglePostControllerFunction($routeParams, PostsFactory, AuthFactory){

			var vm = this;
			//to get get view of single Post instead of list of all posts get data from post Id and name
			//find single post

			var thisPostId = $routeParams.id
			vm.test = 'hello';
			vm.user = AuthFactory.sendUserInfo();
			vm.answers;
			vm.Reply = Reply
			getPosts();
			vm.Answer = Answer;
			vm.comments;
			getComments();
			vm.replies;
			//make an $http request to get find ID and render data for the post
			console.log($routeParams.id)


			// var forEach = function (array, callback) {
			// 	for(var i=0; i<array.length; i++) {
			// 		callback(array[i])
			// 	}
			// }

			// var getid = function(arg) {
			// 	return arg._id
			// }

			// var getAnswers = function(arg) {
			// 	return arg.answers
			// }

			// var map = function(collection, callback) {
			// 	var newArray = []
			// 	forEach(collection, function(arg) {
			// 		newArray.push(callback(arg))
			// 	})
			// 	return newArray
			// }

			function getPosts() {
				PostsFactory.getPosts()
				.then(function(data) {
					console.log(data)
					console.log('getting POSTS')
					vm.posts = data
				})
				.catch(function(){
					console.log('in the single psot controller and could not get posts')
				})
			}

			function Answer(id , index) {
				PostsFactory.answer({id: id, answer: vm.newAnswer[index], _owner: vm.user}) 
					.then(function(){
						console.log('successfully added post')
					})
					.catch(function() {
						console.log('could not add post correctly')
					})
					getPosts();
					vm.newAnswer = null
			}

			function getAnswers() {
				PostsFactory.getAnswers()
				.then(function(data) {
					vm.answers = data
				})
				.catch(function(){
					console.log('in the single psot controller and could not get posts')
				})
			}



			function getCommentByid(id) {
				console.log(id)
			}


			function Reply(id) {

				PostsFactory.reply({id: id, comment: vm.newComment, _owner: vm.user})
					.then(function() {
						console.log('success added comment')
						//PostFactry.get)
						console.log(id)
					})
					.catch(function() {
						console.log('was not able to add post correctly')
					})
					getPosts()
		
				}
				
			function getComments() {
				console.log('getting comments')
				PostsFactory.getComments()
				.then(function(data) {
					console.log(data)
					vm.comments = data
				})
				.catch(function() {
					console.log('could not get comments')
				})
			}

		}


})()