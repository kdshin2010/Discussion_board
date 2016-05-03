(function() {
	'use strict';
	angular
		.module('app.posts')
		.factory('PostsFactory', PostsFactoryFunction)

		PostsFactoryFunction.$inject = ['$http', '$q', 'AuthFactory']

		function PostsFactoryFunction($http, $q, AuthFactory) {
			var service = {
				addPost: addPost,
				getPosts: getPosts,
				Answer: Answer,
				// getAnswers: getAnswers,
				reply: reply,
				getComments: getComments,
				getAnswers: getAnswers,
				getSinglePost: getSinglePost,
				Comment: Comment
			}

			var user = AuthFactory.sendUserInfo();
			


			setTimeout(function(){console.log(user)}, 3000)

			return service

			function addPost(info) {
				var deferred = $q.defer()
				$http.post('/addPost', {topic: info.topic, description: info.description, points: info.points, category: info.category, owner: info.owner, date: info.date})
				.success(function(result) {
					deferred.resolve(result);
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}


			function getPosts() {
				var deferred = $q.defer()
				$http.get('/getPosts')
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function() {
					console.log('could not get posts')
				})
				return deferred.promise
			}

			function Answer(info) {
				if(user = undefined) {
					alert('Can Not post, user is undefined');
				} else {
					console.log(info)
					var deferred = $q.defer()
					$http.post('/answer', {id: info.id, answer: info.answer, owner: info.owner})
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function() {
						console.log('could not add post to data')
						deferred.reject()
					})
					return deferred.promise;
				}
			} 

			function reply(info) {
				var deferred = $q.defer();
				$http.post('/reply', {id: info.id, comment: info.comment, owner: info._owner})
				.success(function() {
					console.log('sucess replying to comment');
					deferred.resolve();
				})
				.error(function() {
					console.log('error replying to comment');
					deferred.reject();
				})
				return deferred.promise;
			}

			function getComments() {
				var deferred = $q.defer()
				$http.get('/getComments')
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function(){
					deferred.reject();
				})
				return deferred.promise
			}

			function Comment(info) {
				if(user = undefined) {
					alert('Can Not post, user is undefined');
				} else {
					var deferred = $q.defer()
					$http.post('/comment', {id: info.id, comment: info.comment, owner: info.owner})
					.success(function(data) {
						console.log('success Answering to post')
						deferred.resolve(data)
					})
					.error(function() {
						console.log('could not add post to data')
						deferred.reject();
					})
					return deferred.promise;
				}
			} 

			function getAnswers(info) {
				var deferred = $q.defer();
				$http.post('/getAnswers', {id: info.id})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error)
				})
				return deferred.promise;
			}


			function getSinglePost(id) {
				console.log(id);
				console.log('this is the id given by routeParams')
				var deferred = $q.defer();
				$http.post('/getPostById' , {id: id})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(err) {
					deferred.reject(err);
				})
				return deferred.promise
			}

		}
		


})()