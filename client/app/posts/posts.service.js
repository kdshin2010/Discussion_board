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
				answer: Answer,
				getAnswers: getAnswers
			}

			var user = AuthFactory.sendUserInfo();


			setTimeout(function(){console.log(AuthFactory.sendUserInfo())}, 3000)


			return service

			function addPost(info) {
				var deferred = $q.defer()
				$http.post('/addPost', {topic: info.topic, description: info.description, points: info.points, category: info.category, owner: info.owner, date: info.date})
				.success(function() {
					deferred.resolve()
				})
				.error(function() {
					deferred.reject
				})
				return deferred.promise
			}

			function getPosts() {
				var deferred = $q.defer()
				$http.get('/getPosts')
				.success(function(data) {
					console.log(data)
					console.log('in the service')
					deferred.resolve(data)
				})
				.error(function() {
					console.log('could not get posts')
				})
				return deferred.promise
			}

			function Answer(info) {
				if(user === undefined) {
					alert('Can Not post, user is undefined')
				} else {
					var deferred = $q.defer()
					console.log(info.answer)
					$http.post('/answer', {id: info.id, answer: info.answer, owner: user })
					.success(function() {
						console.log('successfully added answer to post')
						deferred.resolve()
					})
					.error(function() {
						console.log('could not add post to data')
						deferred.reject()
					})
					return deferred.promise
				}
			} 

			function getAnswers() {
				console.log('send an API request to get answers')
				// var deferred = $q.defer()
				// $http.get('/getAnswers')
				// .success(function(data){
				// 	deferred.resolve(data)
				// })
				// .error(function(error) {
				// 	deferred.reject(error)
				// })
				// return deferred.promise

			}

		}


})()