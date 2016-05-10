(function() {
	angular
		.module('app.auth')
		.factory('AuthFactory', AuthFactoryFunction)
	
		AuthFactoryFunction.$inject = ['$http', '$q', '$window'];

		function AuthFactoryFunction($http, $q, $window) {
			var service = {
				currentUser: currentUser,
				saveToken: saveToken,
				getToken: getToken,
				register: register,
				login: login,
				logout: logout,
				isLoggedIn: isLoggedIn,
				getProfile: getProfile,
				getUsername: getUsername
			}

			return service;	




			function saveToken(token) {
				$window.localStorage['mean-token'] = token;
			}


			function getToken() {
				return $window.localStorage['mean-token'];

			}

			function isLoggedIn() {
				var token = getToken();
				var payload;
				if(token) {
					payload = token.split('.')[1];
					payload = $window.atob(payload);
					payload = JSON.parse(payload);
					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
				
			}

		    var currentUser = function() {
		      if(isLoggedIn()){
		        var token = getToken();
		        var payload = token.split('.')[1];
		        payload = $window.atob(payload);
		        payload = JSON.parse(payload);
		        console.log('line 56!!!!!!!!!!!!!!')
		        console.log(payload.username)
		        return {
		          username : payload.username
		        };
		      }
		    };

		    function getUsername() {
		      if(isLoggedIn()){
		        var token = getToken();
		        var payload = token.split('.')[1];
		        payload = $window.atob(payload);
		        payload = JSON.parse(payload);
		        console.log(payload.username)

		        return {
		          username : payload.username
		        };
		      }
		    };

	

		    function register(info) {
		    	var deferred = $q.defer();
		    	$http.post('/register', info)
		    	.success(function(data){
		    		console.log(data.token)
		    		deferred.resolve(saveToken(data.token))
		    	})
		    	.error(function(){
		    		console.log('in the service and error saving token')
		    	})
		    	return deferred.promise;

		    }

		    function login(info) {
		    	var deferred = $q.defer();
		    	$http.post('/login', info)
		    	.success(function(data){
		    		deferred.resolve(saveToken(data.token))
		    	})
		    	.error(function(){
		    		console.log('in the service and error logging ing')
		    	})
		    	return deferred.promise;
		    }

		    function logout() {
     			 $window.localStorage.removeItem('mean-token');
		    }

		    var getProfile = function() {
		    	return $http.get('/api/profile', {
		    		headers: {
		    			Authorization: 'Bearer ' + getToken()
		    		}
		    	})
		    };




		}

})()