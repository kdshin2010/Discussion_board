(function(){
	angular
		.module('app.posts')
		.controller('PostsController', PostsControllerFunction)


		PostsControllerFunction.$inject = ['$http', 'AuthFactory', 'PostsFactory', '$location']
		// why doesnt post service inject properly?
		function PostsControllerFunction($http, AuthFactory, PostsFactory, $location){
			var vm = this;
			vm.posts;
			vm.post_error
			getPosts();
			vm.addPost = addPost
			getPosts();
			vm.logout = logout

			//sends as username object {username : ""}
			var user = AuthFactory.getUsername();
			console.log(user)
			vm.username = user.username;
			console.log('heyyyy why no update');

			vm.show_ques_form = show_ques_form;
			vm.hide_form = hide_form

			function show_ques_form() {
				vm.ques_form = true;
			}

			function hide_form() {
				vm.ques_form = false;
			}





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

				vm.newPost = null;
			};

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

			};

			function logout(){
				console.log('logging out');
				AuthFactory.logout();
				$location.path('/register')
			}
		}

})()
