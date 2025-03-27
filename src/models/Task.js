const db = require('../config/db');

const Task = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM tasks');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO tasks SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE tasks SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Task;