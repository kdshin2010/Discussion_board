(function() {
	angular
		.module('app.single_post')
		.config(configFunction)

		configFunction.$inject = ['$routeProvider'];
		
		function configFunction($routeProvider) {
			$routeProvider.when('/single_post/:id', {
				templateUrl: 'app/view_post/Eachpost.html',
				controller: 'SinglePostController',
				controllerAs: 'vm'
			})
		}
})();