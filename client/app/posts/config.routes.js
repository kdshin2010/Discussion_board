(function() {
	angular
		.module('app.posts')
		.config(configFunction)


		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider) {
			$routeProvider.when('/posts', {
				templateUrl: 'app/posts/post_page.html',
				controller: 'PostsController',
				controllerAs: 'vm'
			})
		}
})(); 