(function(){
	angular
		.module('app.posts')
		.controller('PostsController', PostsControllerFunction)


		PostsControllerFunction.$inject = ['$http', 'AuthFactory', 'PostsFactory']
		// why doesnt post service inject properly?
		function PostsControllerFunction($http, AuthFactory, PostsFactory){
			var vm = this;
			var user = AuthFactory.sendUserInfo();
			vm.username = user.user.username
			vm.posts;
			vm.post_error
			getPosts();
			vm.addPost = addPost
			getPosts();
			// AddPost 
			function addPost() {
				console.log(vm.user)
				PostsFactory.addPost({topic: vm.newPost.topic, description: vm.newPost.description, category: vm.newPost.category, owner: vm.username })
				.then(function(result) {
					vm.posts.push(result)
					console.log(result);
					console.log('sucessfully added post')
				})
				.catch(function() {
					console.log('could not save post')
				})
				//getPosts()

				vm.newPost = {}
			}

			function getPosts() {
				PostsFactory.getPosts()
				.then(function(data) {
					console.log('in the controller')
					console.log(data)
					vm.posts = data;
				})
				.catch(function() {
					console.log('error')
				})

			}
		}



})()
