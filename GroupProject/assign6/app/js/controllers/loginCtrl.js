'use strict';

app.controller('loginCtrl', ['$scope','loginService', '$http',  function ($scope,loginService, $http) {
	$scope.msgtxt='';
	$scope.login=function(data){
		loginService.login(data,$scope); //call login service
	};

	$scope.registerUser=function(data){
		$http.post("data/createUser.php", data)
			.success(function(data, status, headers, config) {
				if(status == 200)
				{
					$('#alert').show();
					$scope.createUser.username ="";
					$scope.createUser.password ="";
					$scope.createUser.confirmPassword ="";
				}
				else
				{
					console.log('failed');
				}
			});
	};
}]);