(function() {
	angular
		.module('app.auth')
		.config(configFunction)


		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider) {
			$routeProvider.when('/login', {
				templateUrl: 'app/auth/login.html',
				controller: 'AuthController',
				controllerAs: 'vm'
			})
			$routeProvider.when('/register', {
				templateUrl: 'app/auth/register.html',
				controller: 'AuthController',
				controllerAs: 'vm'
			})
			$routeProvider.when('/navbar', {
				templateUrl: 'app/auth/navbartest.html',
				controller: 'AuthController',
				controllerAs: 'vm'
			})
			$routeProvider.when('/', {
				templateUrl: 'app/auth/register.html',
				controller: 'AuthController',
				controllerAs: 'vm'
			})
			.otherwise({ redirectTo: '/'});
		}
})();