const db = require('../config/db');

const ProgressLog = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM progress_logs');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM progress_logs WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO progress_logs SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE progress_logs SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM progress_logs WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM progress_logs WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getByTask: async (taskId) => {
    try {
      const [rows] = await db.query('SELECT * FROM progress_logs WHERE task_id = ?', [taskId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ProgressLog;