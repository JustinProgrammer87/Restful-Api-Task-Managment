const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel'); // Adjust the path as necessary

// POST: Create a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// additional routes for updating and deleting tasks will go here

module.exports = router;
