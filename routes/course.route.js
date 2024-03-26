const courseController = require('../controllers/course.controller');
const router = require("express").Router();

// Routes
router.post("/create", courseController.create);
router.get("/all-courses", courseController.all_courses);
router.get("/seperate-course/:id", courseController.seperate_course);
router.patch("/course-details/:id", courseController.course_details);
router.delete("/delete/:id", courseController.delete);

module.exports = router;