const db = require('../config/db'); 

const ProgressLog = {
  getAll: callback => {
    db.query('SELECT * FROM progress_logs', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM progress_logs WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO progress_logs SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE progress_logs SET ? WHERE id = ?', [data, id], callback);
  },

  remove: (id, callback) => {
    db.query('DELETE FROM progress_logs WHERE id = ?', [id], callback);
  },

  getByUser: (userId, callback) => {
    db.query('SELECT * FROM progress_logs WHERE user_id = ?', [userId], callback);
  },

  getByTask: (taskId, callback) => {
    db.query('SELECT * FROM progress_logs WHERE task_id = ?', [taskId], callback);
  }
};

module.exports = ProgressLog;