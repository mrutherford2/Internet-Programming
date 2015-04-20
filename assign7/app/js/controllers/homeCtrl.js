'use strict';
app.controller('homeCtrl', ['$scope','loginService', '$http', 'sessionService', 'filterFilter', function($scope,loginService, $http, sessionService, filterFilter) {

  	$scope.todos = []
  	$scope.boards = []
    $scope.boardId = 1;

    $scope.setBoard = function(id) {
      $scope.saveBoard();
      $scope.boardId = id; 
      $scope.board.readytowork = [];
      $scope.board.doing = [];
      $scope.board.qa = [];
      $scope.board.readytolaunch = [];
      $scope.getBoard(); 
    } 

    $scope.board = {
      "readytowork": [],
      "doing": [],
      "qa": [],
      "readytolaunch": []
    };

  	$(function() {
  		$('.ui.dropdown').dropdown({
  			transition: 'horizontal flip'
  		});
  	});

	$scope.addTask = function() {
		$scope.board.readytowork.push({name:$scope.task.name, text:$scope.task.text, done:false});
		$http.post("data/createTasks.php", {'name': $scope.task.name, 'text': $scope.task.text, 'owner': $scope.username, 'done': false, 'boardId': $scope.boardId})
			.success(function(data, status, headers, config) {
			});
		$scope.task.name = '';
    	$scope.task.text = '';
      $scope.saveBoard();
      $scope.getBoard();
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
		var total = $scope.board.readytowork.length + $scope.board.doing.length + $scope.board.qa.length + $scope.board.readytolaunch.length; 
    return total; 
 	};

 	$scope.saveTodos = function(){
 		angular.forEach($scope.todos, function(todo) {
 			$http.post("data/saveTasks.php", {'text': todo.text, 'name': todo.name, 'owner': $scope.username,'done': todo.done, 'id': todo.Id})
 				.success(function(data, status, headers, config) {
 				});
 		});
 	};

  $scope.saveBoard = function() {
    angular.forEach($scope.board.readytowork, function(task) {
      $http.post("data/saveBoard.php", {'text': task.text, 'name': task.name, 'id': task.Id, 'boardId': $scope.boardId, 'columnId': 1, 'done': task.done})
        .success(function(data, status, headers, config) {
        });
    });
    angular.forEach($scope.board.doing, function(task) {
      $http.post("data/saveBoard.php", {'text': task.text, 'name': task.name, 'id': task.Id, 'boardId': $scope.boardId, 'columnId': 2, 'done': task.done})
        .success(function(data, status, headers, config) {
        });
    });
    angular.forEach($scope.board.qa, function(task) {
      $http.post("data/saveBoard.php", {'text': task.text, 'name': task.name, 'id': task.Id, 'boardId': $scope.boardId, 'columnId': 3, 'done': task.done})
        .success(function(data, status, headers, config) {
        });
    });
    angular.forEach($scope.board.readytolaunch, function(task) {
      $http.post("data/saveBoard.php", {'text': task.text, 'name': task.name, 'id': task.Id, 'boardId': $scope.boardId, 'columnId': 4, 'done': task.done})
        .success(function(data, status, headers, config) {
        });
    });
  };

  $scope.getBoard = function() {
   $scope.getReadyToWork();
   $scope.getDoing();
   $scope.getQA();
   $scope.getReadyToLaunch();
  };

 	$scope.saveSingleTask = function(){
 		$http.post("data/saveTasks.php", {'text': $scope.todo.text, 'name': $scope.todo.name, 'done': $scope.todo.done, 'id': $scope.todo.Id})
 				.success(function(data, status, headers, config) {
 				});
	};

  $scope.getReadyToWork = function(){
    $http.post("data/getTasks.php", {'columnId': 1, 'boardId': $scope.boardId})
      .success(function(data, status, headers, config) {
        data.forEach(function(val, i) {
          $scope.board.readytowork[i] = {
            text: val.Content,
            done: false,
            name: val.name,
            Id: val.ID,
            columnId: 1,
            boardId: $scope.boardId
          }
        });
      });
  };

  $scope.getDoing = function(){
    $http.post("data/getTasks.php", {'columnId': 2, 'boardId': $scope.boardId})
      .success(function(data, status, headers, config) {
        data.forEach(function(val, i) {
          $scope.board.doing[i] = {
            text: val.Content,
            done: false,
            name: val.name,
            Id: val.ID,
            columnId: 2,
            boardId: $scope.boardId
          }
        });
      });
  };

  $scope.getQA = function(){
    $http.post("data/getTasks.php", {'columnId': 3, 'boardId': $scope.boardId})
      .success(function(data, status, headers, config) {
        data.forEach(function(val, i) {
          $scope.board.qa[i] = {
            text: val.Content,
            done: false,
            name: val.name,
            Id: val.ID,
            columnId: 3,
            boardId: $scope.boardId
          }
        });
      });
  };

  $scope.getReadyToLaunch = function(){
    $http.post("data/getTasks.php", {'columnId': 4, 'boardId': $scope.boardId})
      .success(function(data, status, headers, config) {
        data.forEach(function(val, i) {
          $scope.board.readytolaunch[i] = {
            text: val.Content,
            done: false,
            name: val.name,
            Id: val.ID,
            columnId: 4,
            boardId: $scope.boardId
          }
        });
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

	$scope.getBoards = function() {
		$http.get("data/getBoards.php")
			.success(function (data) {
				data.forEach(function(val, i) {
					$scope.boards[i] = {
						Id: val.ID,
						boardName: val.BoardName
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
