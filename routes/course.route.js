const courseController = require('../controllers/course.controller');
const router = require("express").Router();

// Routes
router.post("/create", courseController.create);
router.get("/all-courses", courseController.all_courses);
router.patch("/course-details/:id", courseController.course_details);

module.exports = router;