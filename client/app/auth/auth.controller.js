(function() {
	'use strict'
	angular
		.module('app.auth')
		.controller("AuthController", AuthControllerFunction)

		AuthControllerFunction.$inject = ["AuthFactory", '$location'];

		function AuthControllerFunction(AuthFactory, $location) {
			var vm = this,
			currentUser = AuthFactory.sendUserInfo()

			vm.hello = 'testing'
			vm.register = register;

			function register() {
				console.log('in the controller')
				AuthFactory.register(vm.newUser.username)
				.then(function() {
					console.log('successfully added username to database and im in the contorller')
					$location.path('/posts')
				})
				.catch(function() {
					console.log('error adding username in the controller :/')
				})
				vm.newUser = {}
			}
		}

})()