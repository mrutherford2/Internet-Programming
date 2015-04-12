'use strict';
app.controller('homeCtrl', ['$scope','loginService', '$http', 'sessionService', 'filterFilter', function($scope,loginService, $http, sessionService, filterFilter) {

  	$scope.todos = []
	$scope.addToDo = function() {
		$scope.todos.push({name:$scope.todo.name, text:$scope.todo.text, done:false});
		$http.post("data/createTasks.php", {'name': $scope.todo.name, 'text': $scope.todo.text, 'owner': $scope.username, 'done': false})
			.success(function(data, status, headers, config) {
			});
		$scope.todo.name = '';
    	$scope.todo.text = '';
    	$scope.getTasks()
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
 			$http.post("data/saveTasks.php", {'text': todo.text, 'name': todo.name, 'owner': $scope.username,'done': todo.done, 'id': todo.Id})
 				.success(function(data, status, headers, config) {
 				});
 		});
 	};

 	$scope.saveSingleTask = function(){
 		$http.post("data/saveTasks.php", {'text': $scope.todo.text, 'name': $scope.todo.name, 'done': $scope.todo.done, 'id': $scope.todo.Id})
 				.success(function(data, status, headers, config) {
 				});
	}; 

	$scope.username = sessionService.get('username');

	$scope.getTasks = function() {
		$http.get("data/getTasks.php")
			.success(function (data) {
				data.forEach(function(val, i) {
					$scope.todos[i] = {
						text: val.Content,
						done: false,
						name: val.name,
						created: val.modified,
						Id: val.ID  
					}
				});
			});
	};
	
	$scope.logout=function(){
		loginService.logout();
	}
}])


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
