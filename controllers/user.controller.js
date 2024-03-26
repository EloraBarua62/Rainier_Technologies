const User = require("../models/User");
const bcrypt = require('bcrypt');

class userControllers {
  // Controller: Login
  signup = async (req, res) => {
    const { name = "", email, password, role } = req.body;
    try {

      // Check if email exist or not
      const userFound = await User.findOne({ email });
      if (userFound) {
        res
          .status(400)
          .json({ error: "This account already exist, try with new email" });
      } 
      else {

        // Create new user
        const user = await User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        });

        // Check is successful creation or not
        if (user) {
          res.status(200).json({ message: "Account created successfully" });
        } else {
          res.status(400).json({ error: "Failed to create account" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
  
  
  // Controller: Login
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userFound = await User.findOne({ email });

      // Check if email exist or not
      if (userFound) {
        const password_match = await bcrypt.compare(
          password,
          userFound.password
        );

        // Check if hashed password matched or not
        if (password_match) {
          res.status(200).json({ message: "Successful login" });
        } else {
          res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        res.status(400).json({ error: "Email is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
  
  // Controller: Load all students details
  students_details = async (req, res) => {
    // Pagination
    const { page = 1, parPage = 0 } = req.query;
    const skip_students = parseInt(page - 1) * parseInt(parPage);

    // Extracting students list on pagination
    try {
      const students = await User.find({ role: "student" })
        .skip(skip_students)
        .limit(parseInt(parPage));

      // Available courses list
      if (students.length > 0) {
        let student_list = [];
        students.map((student) =>
          student_list.push({
            name: student.name,
            email: student.email,
            role: student.role,
          })
        );
        res.status(200).json({
          data: student_list,
          message: "All students data has been loaded successfully",
        });
      } else {
        res.status(400).json({ error: "No student is enlisted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
  
  // Controller: Load Specific student details
  student = async (req, res) => {
    const id = req.params.id;
    try {
      const studentFound = await User.findOne({ _id: id });
      if (studentFound) {
        res.status(200).json({
          data: {name: studentFound.name , email: studentFound.email, role: studentFound.role},
          message: "Student data has been loaded successfully",
        });
      } else {
        res.status(400).json({
          error: "Failed to load student details",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = new userControllers();
