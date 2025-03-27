const UserProfile = require('../models/UserProfile');

const userProfileController = {
  getAll: (req, res) => {
    UserProfile.getAll((err, profiles) => {
      if (err) return res.status(500).json({ error: err });
      res.json(profiles);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    UserProfile.getById(id, (err, profile) => {
      if (err) return res.status(500).json({ error: err });
      if (!profile.length) return res.status(404).json({ message: 'Profile not found' });
      res.json(profile[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    UserProfile.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    UserProfile.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Profile updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    UserProfile.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Profile deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    UserProfile.getByUser(userId, (err, profiles) => {
      if (err) return res.status(500).json({ error: err });
      res.json(profiles);
    });
  },

  getDefaultProfile: (req, res) => {
    const userId = req.params.userId;
    UserProfile.getDefaultProfile(userId, (err, profile) => {
      if (err) return res.status(500).json({ error: err });
      if (!profile.length) return res.status(404).json({ message: 'Default profile not found' });
      res.json(profile[0]);
    });
  }
};

module.exports = userProfileController;