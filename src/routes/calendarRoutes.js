const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.getAll);
router.get('/:id', calendarController.getById);
router.post('/', calendarController.create);
router.put('/:id', calendarController.update);
router.delete('/:id', calendarController.remove);
router.get('/user/:userId', calendarController.getByUser);
router.get('/range/search', calendarController.getByDateRange);

module.exports = router;
