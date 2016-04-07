(function() {
	'use strict'
	angular
		.module('app.layout')
		.directive('ksNavbar', ksNavbarFunction)

		function ksNavbarFunction() {
			return {
				templateUrl: 'app/layout/navbar.html',
				restrict: 'E',
				scope: {},
				controller: NavBarControllerFunction,
				controllerAs: 'vm'
			};
		}

		NavBarControllerFunction.$inject = ['$location', 'AuthFactory']
		function NavBarControllerFunction($location, AuthFactory) {
			var vm = this;

			vm.show = 'sho this'
			vm.logout = logout;
			vm.isLoggedIn = isLoggedIn;
			vm.user = AuthFactory.sendUserInfo();



			function isLoggedIn() {
				var user = AuthFactory.sendUserInfo();
				AuthFactory.isLoggedIn(user)
				.then(function(data) {
					console.log(data)
					console.log('in the controller')
				})
				.catch(function() {
					console.log('error getting data in the navbar')
				})
	
		}


			function logout() {
				var user = AuthFactory.sendUserInfo();
				AuthFactory.logout(user)
				.then(function() {
					console.log('logged Out user')
					$location.path('/register')
				})
				.catch(function() {
					console.log('could not logout user')
				})
			}
		}

})()

