//register factory

/*

declare user = null
declare userinfo


*/
// ************************** AuthFactory **************** 


//Register Methods


	function register(username, password) {
		var deferred = $q.defer();
		$http.post('/user/register', {username: username, password: password})
		.success(function(data, status) {
			if(status === 200 && data.status) {
				console.log('success registering user')
				deferred.resolve(data)
			} else {
				console.log('error registering user')
				deferred.reject()
			}
		})
		.error(function(error) {
			deferred.reject(error)
		});
		return deferred.promise;
	}

// ************************** Register Controller **************** 





//Login Methods

	function isLoggedIn() {
		if(user) {
			console.log(user)
			return true;
		} else {
			return false;
		}
	}

	function getUserInfo() {
		var deferred = $q.defer();
		$http.get('/userinfo')
		.success(function(data) {
			deferred.resolve(data)
		})
		.error(function(error) {
			deferred.reject(error)
		})
		return deferred.promise
	}




//register controller

function RegisterController($location, AuthFactory) {
	//declare userInfo

	function registerUser() {
		$scope.error = false;
		$scope.disabled = true;

		//Call register service

	}
}

function removeSmallest(numbers) {
	var lowest = numbers.sort().shift();
	console.log(lowest);
	console.log(numbers.indexOf(lowest));
	numbers.splice(numbers.indexOf(lowest), 1);
	return numbers
}