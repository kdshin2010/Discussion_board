(function() {
	angular
		.module('app.single_post')
		.config(configFunction)

		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider) {

			$routeProvider.when('/single_post/:id', {
				templateUrl: 'app/view_post/single_post.html',
				controller: 'SinglePostController',
				controllerAs: 'vm'
			})
		}
})();