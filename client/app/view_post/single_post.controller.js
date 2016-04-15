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
			vm.posts;
			vm.user = AuthFactory.sendUserInfo();
			vm.answers;
			getPosts();
			vm.Answer = Answer

			function getPosts() {
				PostsFactory.getPosts()
				.then(function(data) {
					console.log(data)
					vm.posts = data
				})
				.catch(function(){
					console.log('in the single psot controller and  could not get posts')
				})
			}

			//change this is to store in the database
			//this works allowing us to pass post and index
			function Answer(id , index) {
				console.log(vm.newAnswer)
				console.log(vm.newAnswer[index])
				console.log('why did not you think of this before?????????')
				PostsFactory.answer({id: id, answer: vm.newAnswer[index], _owner: vm.user}) 
					.then(function(){
						console.log('successfully added post')
					})
					.catch(function() {
						console.log('could not add post correctly')
					})
					getPosts()
					vm.newAnswer = null
			}
		}


})()