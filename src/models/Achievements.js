const db = require('../config/db'); 

const Achievement = {
  getAll: callback => {
    db.query('SELECT * FROM achievements', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM achievements WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO achievements SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE achievements SET ? WHERE id = ?', [data, id], callback);
  },

  remove: (id, callback) => {
    db.query('DELETE FROM achievements WHERE id = ?', [id], callback);
  },

  getByUser: (userId, callback) => {
    db.query('SELECT * FROM achievements WHERE user_id = ?', [userId], callback);
  }
};

module.exports = Achievement;