const Task = require('../models/Task');

const taskController = {
  getAll: (req, res) => {
    Task.getAll((err, tasks) => {
      if (err) return res.status(500).json({ error: err });
      res.json(tasks);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Task.getById(id, (err, task) => {
      if (err) return res.status(500).json({ error: err });
      if (!task.length) return res.status(404).json({ message: 'Task not found' });
      res.json(task[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    Task.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Task.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Task updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    Task.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Task deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    Task.getByUser(userId, (err, tasks) => {
      if (err) return res.status(500).json({ error: err });
      res.json(tasks);
    });
  }
};

module.exports = taskController;