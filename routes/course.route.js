const courseController = require('../controllers/course.controller');
const router = require("express").Router();

// Routes
router.post("/create", courseController.create);

module.exports = router;