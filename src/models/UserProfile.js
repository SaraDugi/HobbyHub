const db = require('../config/db'); 

const UserProfile = {
  getAll: callback => {
    db.query('SELECT * FROM user_profiles', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM user_profiles WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO user_profiles SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE user_profiles SET ? WHERE id = ?', [data, id], callback);
  },

  remove: (id, callback) => {
    db.query('DELETE FROM user_profiles WHERE id = ?', [id], callback);
  },

  getByUser: (userId, callback) => {
    db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId], callback);
  },

  getDefaultProfile: (userId, callback) => {
    db.query('SELECT * FROM user_profiles WHERE user_id = ? AND is_default = TRUE', [userId], callback);
  }
};

module.exports = UserProfile;