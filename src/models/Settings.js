const db = require('../config/db');

const UserSettings = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM user_settings');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM user_settings WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO user_settings SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE user_settings SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM user_settings WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserSettings;