'use strict';
app.factory('loginService',function($http, $location, sessionService){
	return{
		login:function(data,scope){
			var $promise=$http.post('data/user.php',data); //send data to user.php
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					sessionService.set('user',uid);
					sessionService.set('username', data.username);
					$location.path('/home');

				}	       
				else  {
					scope.msgtxt='incorrect information';
					$location.path('/login');
				}				   
			});
		},
		logout:function(){
			sessionService.destroy('user');
			$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post('data/check_session.php');
			return $checkSessionServer;
		}
	}

});