const Task = require('../models/Task');

const taskController = {
  getAll: async (req, res) => {
    try {
      const tasks = await Task.getAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await Task.getById(id);
      if (!task.length) return res.status(404).json({ message: 'Task not found' });
      res.json(task[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await Task.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await Task.update(id, data);
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await Task.remove(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const tasks = await Task.getByUser(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = taskController;