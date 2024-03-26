const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
    },
    duration: {
      type: String,
      trim: true,
      required: true,
    },
    level: {
      type: String,
      trim: true,
      required: true,
    },
    topics: {
      type: Array,
      required: true,
    },
    schedule: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      classDays: {
        type: Array,
        required: true,
      },
      classTime: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);