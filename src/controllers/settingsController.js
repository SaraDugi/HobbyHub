const UserSettings = require('../models/Settings');

const settingsController = {
  getAll: (req, res) => {
    UserSettings.getAll((err, settings) => {
      if (err) return res.status(500).json({ error: err });
      res.json(settings);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    UserSettings.getById(id, (err, setting) => {
      if (err) return res.status(500).json({ error: err });
      if (!setting.length) return res.status(404).json({ message: 'Settings not found' });
      res.json(setting[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    UserSettings.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    UserSettings.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User settings updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    UserSettings.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User settings deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    UserSettings.getByUser(userId, (err, setting) => {
      if (err) return res.status(500).json({ error: err });
      res.json(setting);
    });
  }
};

module.exports = settingsController;