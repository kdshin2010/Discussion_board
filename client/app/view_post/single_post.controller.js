(function(){
	angular
		.module('app.single_post')
		.controller('SinglePostController', SinglePostControllerFunction)


		SinglePostControllerFunction.$inject = ['$routeParams', 'PostsFactory', 'AuthFactory']

		function SinglePostControllerFunction($routeParams, PostsFactory, AuthFactory){

			var vm = this;
			//to get get view of single Post instead of list of all posts get data from post Id and name
			//find single post
			var user = AuthFactory.sendUserInfo();
			console.log('IN THE SINGLE CONTROLLER ASKING FOR THE ID');
			console.log('YO YO YO OYOY OY OYOO');
			// user.user.username


			var thisPostId = $routeParams.id
			vm.test = 'hello';
			vm.user = AuthFactory.sendUserInfo();
			vm.answers;
			vm.Answer = Answer;
			vm.Comment = Comment;
			vm.comments;
			vm.replies;
			vm.singlePost;
			vm.comments =[];
			getSinglePost();

			//make an $http request to get find ID and render data for the post

			function getSinglePost() {
				PostsFactory.getSinglePost($routeParams.id)
				.then(function(data) {
					console.log('retrieved the single post');
					vm.singlePost = data;
					console.log(vm.singlePost);
					vm.answers = data.answers;

				})
				.catch(function(err) {
					console.log(err)
					console.log('unable to retrive the post');
				})
				
			}

	

			function Answer() {
				console.log('answering question')
				PostsFactory.Answer({id: thisPostId, answer: vm.newAnswer.answer, owner: user.user.username })
				.then(function(data) {
					console.log(data);
					getSinglePost();
				})
				.catch(function(){
					console.log('error answering question')
				})

			}

			function Comment(id, index) {
				PostsFactory.Comment({id: id, comment: vm.newComment[index], owner: vm.user.user.username})
				.then(function(data){
					vm.comments.push(data);
					getSinglePost();
				})
				.catch(function(){
					console.log('error')
				})
				vm.newComment = null;
			}
	

	

				
			

		}


})()