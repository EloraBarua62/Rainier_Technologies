const courseController = require('../controllers/course.controller');
const router = require("express").Router();

// Routes
router.post("/create", courseController.create);
router.get("/all-courses", courseController.all_courses);

module.exports = router;