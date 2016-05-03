controller.files.part.2.js


		function Answer(id , index) {
				PostsFactory.answer({id: thisPostId, answer: vm.newAnswer[index], _owner: user}) 
					.then(function(){
						console.log('successfully added post')
					})
					.catch(function() {
						console.log('could not add post correctly');
					})
					getPosts();
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

			function show_answer_form() {
				vm.show_answer = true;

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