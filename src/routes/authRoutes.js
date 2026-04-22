const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/profile', userController.getProfile);

module.exports = router;