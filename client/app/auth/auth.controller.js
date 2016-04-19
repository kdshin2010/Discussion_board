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
			vm.userInformation = data;

			function register() {
				// initial values
				vm.error = false;
				vm.disabled = true;

				AuthFactory.register(vm.newUser.username, vm.newUser.password, vm.newUser.email)
				.then(function() {
					console.log('successfully added username to database and im in the contorller');
					vm.disabled = false;
					$location.path('/posts')
				})
				.catch(function() {
					console.log('error adding username in the controller :/')
				})
				vm.newUser = {}
			}
		}

})()