const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.get('/', userProfileController.getAll);
router.get('/:id', userProfileController.getById);
router.post('/', userProfileController.create);
router.put('/:id', userProfileController.update);
router.delete('/:id', userProfileController.remove);
router.get('/user/:userId', userProfileController.getByUser);
router.get('/user/:userId/default', userProfileController.getDefaultProfile);

module.exports = router;