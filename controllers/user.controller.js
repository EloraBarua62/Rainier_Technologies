const User = require("../models/User");

class userControllers {

// Controller: Login
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const userFound = await User.findOne({ email });
      if (userFound) {
        if (userFound.password === password) {
          res.status(200).json({ message: "Successful login" });
        } else {
          res.status(400).json({ error: "Password is incorrect" });
        }
      } else {
        res.status(400).json({ error: "Email is incorrect" });
      }
    } catch (error) {
      {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}

module.exports = new userControllers();
