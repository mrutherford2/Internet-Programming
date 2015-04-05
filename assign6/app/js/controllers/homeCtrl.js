'use strict';
app.controller('homeCtrl', ['$scope','loginService', '$http', 'sessionService', 'filterFilter', function($scope,loginService, $http, sessionService, filterFilter) {

  	$scope.todos = []

	$scope.addToDo = function() {
		$scope.todos.push({text:$scope.todo.text, done:false});
		$http.post("data/createTasks.php", {'text': $scope.todo.text, 'owner': $scope.username, 'done': false})
			.success(function(data, status, headers, config) {
			});
    	$scope.todo.text = '';
	};

 	$scope.clearCompleted = function() {
 		$scope.todos = filterFilter($scope.todos, function (todo) { 
 			angular.forEach($scope.todos, function(todo) {
 				$http.post("data/removeTasks.php", {'owner': $scope.username, 'done': todo.done, 'text': todo.text})
 					.success(function(data, status, headers, config) {
 					});
 			});
 			return !todo.done;
 		});
 	};

 	$scope.getTotalTodos = function() {
		return $scope.todos.length;
 	};

 	$scope.saveTodos = function(){
 		angular.forEach($scope.todos, function(todo) {
 			$http.post("data/saveTasks.php", {'text': todo.text, 'owner': $scope.username,'done': todo.done})
 				.success(function(data, status, headers, config) {
 				});
 		});
 	};

 	$scope.getTodoList = function() {
 		return $scope.todos; 
 	};

	$scope.username = sessionService.get('username');

	$scope.getTasks = function() {
		$http.get("data/getTasks.php")
			.success(function (data) {
				data.forEach(function(val, i) {
					$scope.todos[i] = {
						text: val.Content,
						done: false
					}
				});
			});
	};
	
	$scope.logout=function(){
		loginService.logout();
	}
}])



