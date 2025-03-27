const UserProfile = require('../models/UserProfile');

const userProfileController = {
  getAll: async (req, res) => {
    try {
      const profiles = await UserProfile.getAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const profile = await UserProfile.getById(id);
      if (!profile.length) return res.status(404).json({ message: 'Profile not found' });
      res.json(profile[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await UserProfile.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await UserProfile.update(id, data);
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await UserProfile.remove(id);
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const profiles = await UserProfile.getByUser(userId);
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDefaultProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const profile = await UserProfile.getDefaultProfile(userId);
      if (!profile.length) return res.status(404).json({ message: 'Default profile not found' });
      res.json(profile[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userProfileController;