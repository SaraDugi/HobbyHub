const CalendarEntry = require('../models/CalendarEntry');

const calendarController = {
  getAll: async (req, res) => {
    try {
      const entries = await CalendarEntry.getAll();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const entry = await CalendarEntry.getById(id);
      if (!entry.length) return res.status(404).json({ message: 'Entry not found' });
      res.json(entry[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await CalendarEntry.create(data);
      res.status(201).json({ id: result.insertId, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await CalendarEntry.update(id, data);
      res.json({ message: 'Entry updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await CalendarEntry.remove(id);
      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const entries = await CalendarEntry.getByUser(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByDateRange: async (req, res) => {
    try {
      const { userId, startDate, endDate } = req.query;
      if (!userId || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required query parameters' });
      }
      const entries = await CalendarEntry.getByDateRange(userId, startDate, endDate);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = calendarController;