//AngularJS Config

todoApp = angular.module('todoApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: '/views/todo.html',
                controller: 'TodoController'
            }).otherwise({
                redirectTo: '/'
            });
    });