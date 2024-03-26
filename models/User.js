const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);