const userController = require('../controllers/user.controller');
const router = require('express').Router();

// Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get("/students-details", userController.students_details);
router.get("/student/:id", userController.student);

module.exports = router;