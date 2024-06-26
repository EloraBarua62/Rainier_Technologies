const Course = require("../models/Course");

class courseControllers {
  // Controller: Course create
  create = async (req, res) => {

    // Destructure data from request body
    const { name, description, price, duration, level, topics, schedule } =
      req.body;
    
    try {
      const course = await Course.create({
        name,
        description,
        price,
        duration,
        level,
        topics,
        schedule,
      });
      res
        .status(200)
        .json({ message: "The course has been added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
  
  
  // Controller: Display all courses
  all_courses = async (req, res) => {
    const { page = 1, parPage = 0 , startDate = "2024-02-20" , endDate = "2025-02-20"} = req.query;

    // Skip courses of previous pages
    const skip_courses = parseInt(page - 1) * parseInt(parPage);

    try {
      // Extracting courses on date range, pagination
      const courses = await Course.find({
        "schedule.startDate": { $gte: new Date(startDate) },
        "schedule.endDate": { $lte: new Date(endDate) },
      })
        .skip(skip_courses)
        .limit(parseInt(parPage));

      // Available courses list
      if (courses.length > 0) {
        res.status(200).json({
          list: courses,
          message: "Courses list has been loaded successfully",
        });
      } 
      else {
        res.status(400).json({
          error: "Failed to load courses list",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  // Controller: Load Specific course details
  seperate_course = async (req, res) => {

    // extract query parameter
    const id = req.params.id;
    try {
      const courseFound = await Course.findOne({ _id: id });
      if (courseFound) {
        res.status(200).json({
          data: courseFound,
          message: "Individual course has been loaded successfully",
        });
      } else {
        res.status(400).json({
          error: "Failed to load individual course details",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  // Controller: Update Specific course details
  course_details = async (req, res) => {
    
    // extract query parameter and data
    const id = req.params.id;
    const data = req.body;
    try {
      const courseUpdated = await Course.updateOne({ _id: id }, { $set: data });

      // Check course updated or not by number of modification
      if (courseUpdated?.modifiedCount === 1) {
        res.status(200).json({
          message: "Course details has been updated successfully",
        });
      } else {
        res.status(400).json({
          error: "Failed to update course details",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  // Controller: Update Specific course details
  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const courseDeleted = await Course.deleteOne({ _id: id });

      // Check course deleted or not by number of deletion
      if (courseDeleted.deletedCount === 1) {
        res.status(200).json({
          message: "Course data has been deleted successfully",
        });
      } else {
        res.status(400).json({
          error: "Failed to delete course data",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = new courseControllers();