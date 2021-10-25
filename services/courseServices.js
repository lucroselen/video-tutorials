const Course = require("../models/Course");
const User = require("../models/User");

const create = (data) => Course.create(data);
const getAll = () => Course.find({}).lean();
const getOne = (id) => Course.findById(id).lean();
const update = (id, title, description, imageUrl, isPublic) =>
  Course.updateOne(
    { _id: id },
    {
      title,
      description,
      imageUrl,
      isPublic,
    },
    { runValidators: true }
  );

const deleteRecord = (id) => Course.deleteOne({ _id: id });

const enroll = async (courseId, studentId) => {
  let course = await Course.findById(courseId);
  let student = await User.findById(studentId);

  course.usersEnrolled.push(student);

  return course.save();
};

const courseServices = {
  create,
  getAll,
  getOne,
  update,
  deleteRecord,
  enroll,
};

module.exports = courseServices;
