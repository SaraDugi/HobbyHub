const UserSettings = require('../models/Settings');

const settingsController = {
  getAll: async (req, res) => {
    try {
      const settings = await UserSettings.getAll();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const setting = await UserSettings.getById(id);
      if (!setting.length) return res.status(404).json({ message: 'Settings not found' });
      res.json(setting[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await UserSettings.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await UserSettings.update(id, data);
      res.json({ message: 'User settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await UserSettings.remove(id);
      res.json({ message: 'User settings deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const setting = await UserSettings.getByUser(userId);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = settingsController;