const db = require('../config/db'); 

const CalendarEntry = {
  getAll: callback => {
    db.query('SELECT * FROM calendar_entries', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM calendar_entries WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO calendar_entries SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE calendar_entries SET ? WHERE id = ?', [data, id], callback);
  },

  remove: (id, callback) => {
    db.query('DELETE FROM calendar_entries WHERE id = ?', [id], callback);
  },

  getByUser: (userId, callback) => {
    db.query('SELECT * FROM calendar_entries WHERE user_id = ?', [userId], callback);
  },

  getByDateRange: (userId, startDate, endDate, callback) => {
    db.query(
      'SELECT * FROM calendar_entries WHERE user_id = ? AND start_time >= ? AND end_time <= ?',
      [userId, startDate, endDate],
      callback
    );
  }
};

module.exports = CalendarEntry;