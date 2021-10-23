const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You must fill in the title!"],
      minlength: 6,
    },
    description: {
      type: String,
      required: [true, "You must fill in the description!"],
    },
    imageUrl: {
      type: String,
      required: [true, "You must fill in the Image Url!"],
      validate: [/^https?:\/\//i, "URL must start with http:// or https://"],
      minlength: 10,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    usersEnrolled: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
