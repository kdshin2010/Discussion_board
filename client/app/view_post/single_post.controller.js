(function(){
	angular
		.module('app.single_post')
		.controller('SinglePostController', SinglePostControllerFunction)


		SinglePostControllerFunction.$inject = ['$routeParams', 'PostsFactory', 'AuthFactory']

		function SinglePostControllerFunction($routeParams, PostsFactory, AuthFactory){

			var vm = this;
			//to get get view of single Post instead of list of all posts get data from post Id and name
			//find single post
			// var user = AuthFactory.sendUserInfo();
			// vm.user = user.user.username
			var user = 'Kyle';
			vm.user = 'Kyle'



			var thisPostId = $routeParams.id
			vm.test = 'hello';
			vm.answers;
			getPosts();
			vm.show_answer_form = show_answer_form
			vm.comments;
			vm.replies;
			vm.singlePost;
			vm.Answer = Answer;
			vm.answers

			function getAnswers() {
				PostsFactory.getAnswers({id: thisPostId})
				.then(function(data) {
					vm.answers = data;
				})
				.catch(function() {
					console.log('error getting answers!')
				})
			}


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

			function getAnswers() {
				PostsFactory.getAnswers({id: thisPostId})
				.then(function(data) {
					vm.answers = data;
				})
				.catch(function(){
					console.log('unable to get answers for this post')
				})
			}

			function show_answer_form() {
				vm.show_answer = true;
			}

			function Answer() {
				PostsFactory.Answer({id: thisPostId, answer: vm.newAnswer.answer})
				.then(function(data) {
					console.log(data);
					vm.answers.push(data);
				})
				.catch(function(){
					console.log('error answering this question')
				})
			}


	
	

				
			

		}


})()