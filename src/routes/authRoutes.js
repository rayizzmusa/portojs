const express = require('express');
const authController = require('../controllers/authController');
const savingController = require('../controllers/savingController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/savings', savingController.getSavings);
router.get('/logout', authController.logout);

module.exports = router;