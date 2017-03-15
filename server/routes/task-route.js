
// tasks.js
var router = require('express').Router();
var Task = require('../models/task-model');


// get all tasks
router.get('/', function(req, res) {
  console.log('hit my get all tasks route');
  Task.find({}, function(err, result){
    if (err){
      console.log('query error:', err);
      res.sendStatus(500);
    }else{
      res.send(result);
    }
  })
});

// create a new task in the db
router.post('/', function(req, res) {
  console.log('hit post route');
  console.log('here is the body ->', req.body);

  var taskObject = req.body;

  var addedTask = new Task({
    name: taskObject.taskName,
    description: taskObject.description
  });

  // db query
  addedTask.save(function(err, result){
    if(err){
      console.log('error adding new task:', err);
      res.sendStatus(500);
    }else{
      res.sendStatus(201);
    }
  })
});


// delete a  task in the db
router.delete('/:id', function(req, res) {
  var taskToDeleteId = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', taskToDeleteId);

  // db query
  Task.findByIdAndRemove(
    { _id: req.params.id},
    function(err, result){
      if (err) {
        console.log('error updating task,', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(200);
      }
    }
  );
});



//updat task status
router.put('/complete/:id', function(req, res) {
  var taskToCompleteId = req.params.id;
  console.log('hit complete route');
  console.log('here is the id to complete ->', taskToCompleteId);

  // db query
  Task.findByIdAndUpdate(
    { _id: req.params.id},
    {
      $set: {status: true}
    },
    function(err, result){
      if (err) {
        console.log('error updating task,', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(200);
      }
    }
  );
});


// create a new task in the db
router.put('/uncomplete/:id', function(req, res) {
  var taskToUncompleteId = req.params.id;
  console.log('hit complete route');
  console.log('here is the id to complete ->', taskToUncompleteId);

  // db query
  Task.findByIdAndUpdate(
    { _id: req.params.id},
    {
      $set: {status: false}
    },
    function(err, result){
      if (err) {
        console.log('error updating task,', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(200);
      }
    }
  );
});

router.put('/save/:id', function(req, res) {
  var taskToSaveId = req.params.id;
  var taskObject = req.body;
  console.log('hit complete route');
  console.log('here is the id to complete ->', taskToSaveId);

  // db query
  Task.findByIdAndUpdate(
    { _id: req.params.id},
    {
      $set: {name: taskObject.name, description: taskObject.description}
    },
    function(err, result){
      if (err) {
        console.log('error updating task,', err);
        res.sendStatus(500);
      }else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
