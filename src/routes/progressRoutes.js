const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/', progressController.getAll);
router.get('/:id', progressController.getById);
router.post('/', progressController.create);
router.put('/:id', progressController.update);
router.delete('/:id', progressController.remove);
router.get('/user/:userId', progressController.getByUser);
router.get('/task/:taskId', progressController.getByTask);

module.exports = router;