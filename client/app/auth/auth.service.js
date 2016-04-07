(function() {
	angular
		.module('app.auth')
		.factory('AuthFactory', AuthFactoryFunction)
	
		AuthFactoryFunction.$inject = ['$http', '$q'];

		function AuthFactoryFunction($http, $q) {
			var service = {
				register: register,
				testing: testing,
				sendUserInfo: sendUserInfo,
				checkUser: checkUser,
				logout: logout,
				isLoggedIn: isLoggedIn
			}

			var user; 



			return service;		

			function testing() {
				console.log('testing')
			}

			function register(userinfo) {
				console.log(userinfo)
				var deferred = $q.defer() 
				$http.post('/user/register', {username: userinfo})
				.success(function() {
					user = userinfo;
					console.log(user)
					console.log('got the user to the database')
					deferred.resolve()
				})
				.error(function() {
					console.log('error saving user to dat ase')
					deferred.reject();
				})
				return deferred.promise
			}

			function sendUserInfo() {
				console.log(user)
				return user
			}


			function checkUser(username) {
				console.log('checking username in the auth service')
				console.log(username)
				var deferred = $q.defer();
				$http.post('/check', {username: username})
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise
					
			}	

			function logout(user) {
				var deferred = $q.defer();
				$http.post('/logout', {username: user})
				.success(function(data) {
					console.log(' in the auth service and was able to log out user')
					console.log(data)
					deferred.resolve()
				})
				.error(function() {
					deferred.reject()
				})
				return deferred.promise
			} 	


			//Clean up code -- repetetive in AuthService and navbar directive
			
			function isLoggedIn(user) {
				console.log(user)
				var deferred = $q.defer()
				console.log('here in the auth service');
				if (user = undefined) {
					console.log('the user is undefined')
				} else {
					$http.post('/isLoggedIn', {username: user})
					.success(function(data) {
						console.log(data)
						deferred.resolve(data)
					})
					.error(function() {
						deferred.reject()
					})
					return deferred.promise
				}
			}


		}

})()