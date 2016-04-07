(function() {
	angular
		.module('myApp', [
			'ngRoute',
			'app.posts',
			'app.single_post',
			'app.auth',
			'app.layout'
			])
		.config(configFunction)

		function configFunction($routeProvider) {
				 $routeProvider.otherwise({
		    	redirectTo: '/'
		    });
		}
})();