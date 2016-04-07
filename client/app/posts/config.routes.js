(function() {
	angular
		.module('app.posts')
		.config(configFunction)


		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider) {
			$routeProvider.when('/posts', {
				templateUrl: 'app/posts/posts.html',
				controller: 'PostsController',
				controllerAs: 'vm'
			})
		}
})();