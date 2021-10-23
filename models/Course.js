const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must fill in the title!"],
    minlength: [4, "The title should be at least 4 characters!"],
  },
  description: {
    type: String,
    required: [true, "You must fill in the description!"],
    minlength: [20, "The description should be at least 20 characters long!"],
  },
  imageUrl: {
    type: String,
    required: [true, "You must fill in the Image Url!"],
    validate: [/^https?:\/\//i, "URL must start with http:// or https://"],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
  },
  usersEnrolled: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
