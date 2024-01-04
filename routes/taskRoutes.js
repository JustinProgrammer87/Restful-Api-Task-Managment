console.log();
const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const verifyToken = require("../middleware/verifyToken");

// POST: Create a new task
router.post("/tasks", verifyToken, async (req, res) => {
  try {
    console.log(req.body); // Log the request body for debugging
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).send({ message: error.message, error: error });
  }
});

// GET: Retrieve all tasks
router.get("/tasks", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});
// PATCH: Update a specific task by ID
router.patch("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: Delete a specific task by ID
router.delete("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
