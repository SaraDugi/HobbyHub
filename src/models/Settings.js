const db = require('../config/db'); 

const UserSettings = {
  getAll: callback => {
    db.query('SELECT * FROM user_settings', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM user_settings WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO user_settings SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE user_settings SET ? WHERE id = ?', [data, id], callback);
  },

  remove: (id, callback) => {
    db.query('DELETE FROM user_settings WHERE id = ?', [id], callback);
  },

  getByUser: (userId, callback) => {
    db.query('SELECT * FROM user_settings WHERE user_id = ?', [userId], callback);
  }
};

module.exports = UserSettings;