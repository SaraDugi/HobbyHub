const express = require('express');
const router = express.Router();
const userSettingsController = require('../controllers/settingsController');

router.get('/', userSettingsController.getAll);
router.get('/:id', userSettingsController.getById);
router.post('/', userSettingsController.create);
router.put('/:id', userSettingsController.update);
router.delete('/:id', userSettingsController.remove);
router.get('/user/:userId', userSettingsController.getByUser);

module.exports = router;