const db = require('../config/db');

const User = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO users SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;