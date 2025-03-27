const db = require('../config/db');

const UserProfile = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM user_profiles');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM user_profiles WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const [result] = await db.query('INSERT INTO user_profiles SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const [result] = await db.query('UPDATE user_profiles SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM user_profiles WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const [rows] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getDefaultProfile: async (userId) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM user_profiles WHERE user_id = ? AND is_default = TRUE',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserProfile;