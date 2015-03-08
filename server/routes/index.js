(function() {
  
  //Index controller handles RESTful CRUD operations
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('mydb', ['todos']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
 /* Return all todos */
  router.get('/api/todos', function(req, res) {
    db.todos.find(function(err, data) {
      if(err) console.log(err);
      else res.json(data);
    });
  });
 
  /* Insert new ToDo */
  router.post('/api/todos', function(req, res) {
    db.todos.insert(req.body, function(err, data) {
      if(err) console.log(err);
      else  res.json(data);
    });
 
  });
  
  /* Update ToDo */
  router.put('/api/todos', function(req, res) {
 
    db.todos.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      isDone: req.body.isDone,
      todo: req.body.todo
    }, {}, function(err, data) {
      if(err) console.log(err);
      else res.json(data);
    });
 
  });
  
  /* Delete ToDo by ID */
  router.delete('/api/todos/:_id', function(req, res) {
    db.todos.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      if(err) console.log(err);
      else res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());