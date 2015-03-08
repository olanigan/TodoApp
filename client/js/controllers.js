todoApp.controller('TodoController', function($rootScope, $scope, todoFactory) {
 
  $scope.todos = [];
  $scope.isEditable = [];
 
  // get all Todos on Load
  todoFactory.getTodos().then(function(data) {
      console.log('Todos are ' + data);
    $scope.todos = data.data;
  });
 
  // Save a Todo to the server
  $scope.save = function($event) {
    if ($event.which == 13 && $scope.todoInput) {
    console.log("Event is saved");
      todoFactory.saveTodo({
        "todo": $scope.todoInput,
        "isDone": false
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.todoInput = '';
    }
  };
 
  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.todos[i];
    todoFactory.editTodo({
      _id: _id,
      isDone: cbk,
      todo: _t.todo
    }).then(function(data) {
      if (data.data.updatedExisting) {
        _t.isDone = cbk;
        console.log(_t.todo + ' is ' +  cbk);
      } else {
        alert('Oops something went wrong!');
      }
    });
  };
 
  // Update the edited Todo
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.todos[i];
      console.log('On Edit Text: ' + $event.target.value.trim());
      todoFactory.editTodo({
        _id: _t._id,
        todo: $event.target.value.trim(),
        isDone: _t.isDone
      }).then(function(data) {
        if (data.data.updatedExisting) {
          _t.todo = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };
 
  // Delete a Todo
  $scope.delete = function(i) {
    todoFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };
 
});