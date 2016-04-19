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
			vm.login = login;
			// vm.userInformation = data;

			function register() {
				// initial values
				vm.error = false;
				vm.disabled = true;
				AuthFactory.register(vm.newUser.username, vm.newUser.password, vm.newUser.email)
				.then(function() {
					console.log('successfully added username to database and im in the contorller');
					vm.disabled = false;
				})
				.catch(function() {
					console.log('error adding username in the controller :/')
				})
				vm.newUser = {}
			}

			function login() {
				vm.error = false;
				vm.disabled = true;

				AuthFactory.login(vm.user.username, vm.user.password)
				.then(function(data) {
					//set userinformation as data
					$location.path('/posts');
					vm.disabled = false;
					vm.user = {}
				})
				.catch(function() {
					vm.error = true;
					vm.errorMessage = 'Invalid username and/or password';
					vm.disabled = false;
					vm.loginForm = {};
				})

			}
		}

})()