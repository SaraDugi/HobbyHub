const ProgressLog = require('../models/Progress');

const progressController = {
  getAll: (req, res) => {
    ProgressLog.getAll((err, logs) => {
      if (err) return res.status(500).json({ error: err });
      res.json(logs);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    ProgressLog.getById(id, (err, log) => {
      if (err) return res.status(500).json({ error: err });
      if (!log.length) return res.status(404).json({ message: 'Log not found' });
      res.json(log[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    ProgressLog.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    ProgressLog.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Log updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    ProgressLog.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Log deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    ProgressLog.getByUser(userId, (err, logs) => {
      if (err) return res.status(500).json({ error: err });
      res.json(logs);
    });
  },

  getByTask: (req, res) => {
    const taskId = req.params.taskId;
    ProgressLog.getByTask(taskId, (err, logs) => {
      if (err) return res.status(500).json({ error: err });
      res.json(logs);
    });
  }
};

module.exports = progressController;