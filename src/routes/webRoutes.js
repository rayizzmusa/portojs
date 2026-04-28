const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', pageController.getLoginPage);
router.get('/dashboard', authMiddleware, pageController.getDashboardPage);
router.get('/saving-form', authMiddleware, pageController.getSavingFormPage);
router.get('/logout', pageController.logout);

module.exports = router;