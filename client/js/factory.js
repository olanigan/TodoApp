//Angular Factory as interface to Express endpoints
todoApp.factory('todoFactory', function($http){
    var todoUrl = '/api/todos';
    var _todoService = {}; //Service to access CRUD operations
    
    //Get All ToDos
    _todoService.getTodos = function(){
        return $http.get(todoUrl);
    };
    
    //Save New ToDo
    _todoService.saveTodo = function(todo){
        return $http.post(todoUrl, todo);
    };
    
    //Edit or Update ToDo
    _todoService.editTodo = function(todo){
        return $http.put(todoUrl,todo);
    };
    
    //Delete ToDo
    _todoService.deleteTodo = function(id){
        return $http.delete(todoUrl + '/' + id);
    };
    
    return _todoService;
});