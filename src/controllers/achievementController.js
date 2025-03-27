const Achievement = require('../models/Achievements');

const achievementController = {
  getAll: (req, res) => {
    Achievement.getAll((err, achievements) => {
      if (err) return res.status(500).json({ error: err });
      res.json(achievements);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Achievement.getById(id, (err, achievement) => {
      if (err) return res.status(500).json({ error: err });
      if (!achievement.length) return res.status(404).json({ message: 'Achievement not found' });
      res.json(achievement[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    Achievement.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Achievement.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Achievement updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    Achievement.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Achievement deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    Achievement.getByUser(userId, (err, achievements) => {
      if (err) return res.status(500).json({ error: err });
      res.json(achievements);
    });
  }
};

module.exports = achievementController;