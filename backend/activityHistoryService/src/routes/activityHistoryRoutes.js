const express = require('express');
const router = express.Router();
const activityHistoryController = require('../controllers/activityHistoryController');

router.post('/productId', activityHistoryController.createActivityHistory);

module.exports = router;

