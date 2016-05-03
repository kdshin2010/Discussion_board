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
			vm.Answer = Answer
			vm.comments;
			vm.replies;
			vm.singlePost;
			getSinglePost();
			//make an $http request to get find ID and render data for the post




			function Answer(id , index) {
				PostsFactory.answer({id: id, answer: vm.newAnswer[index], _owner: vm.user}) 
					.then(function(){
						console.log('successfully added post')
					})
					.catch(function() {
						console.log('could not add post correctly');
					})
					vm.newAnswer = null
			}

			function getSinglePost() {
				PostsFactory.getSinglePost($routeParams.id)
				.then(function(data) {
					console.log(data);
					console.log('retrieved the single post');
					vm.singlePost = data;
					console.log(vm.singlePost)

				})
				.catch(function(err) {
					console.log(err)
					console.log('unable to retrive the post');
				})
				
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
		
				}

				
			

		}


})()