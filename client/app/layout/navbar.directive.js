(function() {
	'use strict'
	angular
		.module('app.layout')
		.directive('ksNavbar', ksNavbarFunction)

		function ksNavbarFunction() {
			return {
				templateUrl: 'app/layout/nav2.html',
				restrict: 'EA',
				scope: {},
				controller: NavBarControllerFunction,
				controllerAs: 'vm'
			};
		}

		NavBarControllerFunction.$inject = ['$location', 'AuthFactory']
		function NavBarControllerFunction($location, AuthFactory) {
			var vm = this;
			var user = AuthFactory.getUsername();
			vm.logout = logout;
			vm.userName = AuthFactory.getUsername;

			vm.isLoggedIn = AuthFactory.isLoggedIn;
			vm.currentUser = 'hello';

			function logout() {
				AuthFactory.logout();
				$location.path('/login')

			}

			function currentUser(){
				AuthFactory.currentUser();
			}

			var isIn = function(){
				return AuthFactory.isLoggedIn();
			}
		}

})()

