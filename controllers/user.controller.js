const User = require("../models/User");
const bcrypt = require('bcrypt');

class userControllers {

  // Controller: Login
  signup = async (req, res) => {
    const { name = '', email, password, role } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (userFound) {
         res.status(400).json({ error: "This account already exist, try with new email" });
      }
      else{
        const user = await User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          role
        });

        if(user){
          res.status(200).json({ message: "Account created successfully" });
        }
        else{
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
      console.log(userFound)
      if (userFound) {
        const password_match = await bcrypt.compare(password , userFound.password);
        console.log(password_match)
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
  students_details = async(req, res) => {
    const {page = 1, parPage = 0} = req.query;
    const skip_elements = parseInt(page-1) * parseInt(parPage);
    try {
      const students = await User.find({ role: "student" })
        .skip(skip_elements)
        .limit(parseInt(parPage));

      if(students.length){
        let student_list = [];
        students.map((student) => student_list.push({name: student.name, email: student.email, role: student.role}))
        res.status(200).json({data: student_list, message: "Students Data has been loaded successfully" });
      }
      else{
        res.status(400).json({ error: "No student is enlisted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new userControllers();
