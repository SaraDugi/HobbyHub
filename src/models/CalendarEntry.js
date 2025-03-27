const db = require('../config/db');

const CalendarEntry = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM calendar_entries');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM calendar_entries WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO calendar_entries SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE calendar_entries SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM calendar_entries WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM calendar_entries WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getByDateRange: async (userId, startDate, endDate) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM calendar_entries WHERE user_id = ? AND start_time >= ? AND end_time <= ?',
        [userId, startDate, endDate]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = CalendarEntry;