const User = require('../models/User');

const userController = {
  getAll: (req, res) => {
    User.getAll((err, users) => {
      if (err) return res.status(500).json({ error: err });
      res.json(users);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, user) => {
      if (err) return res.status(500).json({ error: err });
      if (!user.length) return res.status(404).json({ message: 'User not found' });
      res.json(user[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    User.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    User.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    User.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User deleted successfully' });
    });
  }
};

module.exports = userController;