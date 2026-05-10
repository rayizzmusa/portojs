const express = require('express');
const authController = require('../controllers/authController');
const savingController = require('../controllers/savingController');
const activityController = require('../controllers/activityController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/savings', savingController.getSavings);
router.get('/last-activity', activityController.getLastTwoActivities);
router.get('/master-activity/:type', activityController.getTypeActivity);
router.post('/add-saving/:information_temp', savingController.addSaving);
router.get('/logout', authController.logout);

module.exports = router;