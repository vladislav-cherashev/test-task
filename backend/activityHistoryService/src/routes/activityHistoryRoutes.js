const express = require('express');
const router = express.Router();
const activityHistoryController = require('../controllers/activityHistoryController');

router.post('/create', activityHistoryController.createActivityHistory);

module.exports = router;

