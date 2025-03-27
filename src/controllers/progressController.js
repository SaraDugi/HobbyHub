const ProgressLog = require('../models/Progress');

const progressController = {
  getAll: async (req, res) => {
    try {
      const logs = await ProgressLog.getAll();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const log = await ProgressLog.getById(id);
      if (!log.length) return res.status(404).json({ message: 'Log not found' });
      res.json(log[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await ProgressLog.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await ProgressLog.update(id, data);
      res.json({ message: 'Log updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await ProgressLog.remove(id);
      res.json({ message: 'Log deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const logs = await ProgressLog.getByUser(userId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const logs = await ProgressLog.getByTask(taskId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = progressController;