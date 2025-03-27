const Achievement = require('../models/Achievements');

const achievementController = {
  getAll: async (req, res) => {
    try {
      const achievements = await Achievement.getAll();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const achievement = await Achievement.getById(id);
      if (!achievement.length) {
        return res.status(404).json({ message: 'Achievement not found' });
      }
      res.json(achievement[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await Achievement.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await Achievement.update(id, data);
      res.json({ message: 'Achievement updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await Achievement.remove(id);
      res.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const achievements = await Achievement.getByUser(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = achievementController;