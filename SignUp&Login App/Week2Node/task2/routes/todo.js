const express = require('express')
const Todo = require('../models/todo')
const auth = require('../middleware/authorize')
const router = express.Router()

// Create
router.post('/todos', auth, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Missing title' });

  const todo = new Todo({ title, completed: false, userId: req.userId });
  await todo.save();
  res.status(201).json(todo);
});

// Get 
router.get('/todos', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

// Update 
router.put('/todos/:id', auth, async (req, res) => {
  const { title, completed } = req.body;
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, completed },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Delete
router.delete('/todos/:id', auth, async (req, res) => {
  const deleted = await Todo.findOneAndDelete({_id: req.params.id, userId: req.userId });
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
