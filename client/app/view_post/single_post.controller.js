(function(){
	angular
		.module('app.single_post')
		.controller('SinglePostController', SinglePostControllerFunction)


		SinglePostControllerFunction.$inject = ['$routeParams', 'PostsFactory', 'AuthFactory']

		function SinglePostControllerFunction($routeParams, PostsFactory, AuthFactory){

			var vm = this;
			//to get get view of single Post instead of list of all posts get data from post Id and name
			//find single post
			console.log('IN THE SINGLE CONTROLLER ASKING FOR THE ID');
			console.log('YO YO YO OYOY OY OYOO');



			var thisPostId = $routeParams.id
			vm.test = 'hello';
			var user = AuthFactory.getUsername();

			console.log(user)
			vm.answers;
			vm.Answer = Answer;
			vm.Comment = Comment;
			vm.comments;
			vm.show_answer_form = show_answer_form;
			vm.hide_answer_form = hide_answer_form;
			vm.replies;
			vm.show_comment_form = show_comment_form;
			vm.hide_comment_form = hide_comment_form;
			vm.show_comment_input = show_comment_input;
			vm.hide_comment_input = hide_comment_input;
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

			//get username here

			function Answer() {
				console.log('answering question')
				PostsFactory.Answer({id: thisPostId, answer: vm.newAnswer.answer, owner: user.username })
				.then(function(data) {
					console.log(data);
					getSinglePost();
				})
				.catch(function(){
					console.log('error answering question')
				})

			}

			function Comment(id, index) {
				PostsFactory.Comment({id: id, comment: vm.newComment[index], owner: user.username})
				.then(function(data){
					vm.comments.push(data);
					getSinglePost();
				})
				.catch(function(){
					console.log('error');
				})
				vm.newComment = null;
			}

			function show_answer_form() {
				vm.show_answer = true;

			}

			function show_comment_form(index) {
				console.log(index);
				vm.show_comments[index] = true;
				vm.show_button[index] = false;
				vm.hide_button[index] = true;
			}
			function hide_comment_form(index) {
				vm.show_comments[index] = false;
				vm.show_button[index] = true;
				vm.hide_button[index] = false;
			}


			function show_comment_input(index) {
				console.log('hererere')
				vm.show_comments_input[index] = true;
			}
			function hide_comment_input(index) {
				vm.show_comments_input[index] = false;
			}

			function hide_answer_form() {
				vm.show_answer = false;
			}
	

	

				
			

		}


})()