const CalendarEntry = require('../models/CalendarEntry');

const calendarController = {
  getAll: (req, res) => {
    CalendarEntry.getAll((err, entries) => {
      if (err) return res.status(500).json({ error: err });
      res.json(entries);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    CalendarEntry.getById(id, (err, entry) => {
      if (err) return res.status(500).json({ error: err });
      if (!entry.length) return res.status(404).json({ message: 'Entry not found' });
      res.json(entry[0]);
    });
  },

  create: (req, res) => {
    const data = req.body;
    CalendarEntry.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, ...data });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    CalendarEntry.update(id, data, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Entry updated successfully' });
    });
  },

  remove: (req, res) => {
    const id = req.params.id;
    CalendarEntry.remove(id, err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Entry deleted successfully' });
    });
  },

  getByUser: (req, res) => {
    const userId = req.params.userId;
    CalendarEntry.getByUser(userId, (err, entries) => {
      if (err) return res.status(500).json({ error: err });
      res.json(entries);
    });
  },

  getByDateRange: (req, res) => {
    const { userId, startDate, endDate } = req.query;
    if (!userId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    CalendarEntry.getByDateRange(userId, startDate, endDate, (err, entries) => {
      if (err) return res.status(500).json({ error: err });
      res.json(entries);
    });
  }
};

module.exports = calendarController;