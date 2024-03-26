const Course = require("../models/Course");

class courseControllers {
    
  // Controller: Course create
    create = async (req, res) => {
        const {name, description, price, duration, level, topics, schedule} = req.body
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
         } 
         catch (error) {
           res.status(500).json({ error: "Internal Server Error" });
         }
    }
}

module.exports = new courseControllers();