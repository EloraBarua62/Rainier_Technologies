const userController = require('../controllers/user.controller');
const router = require('express').Router();

// Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;