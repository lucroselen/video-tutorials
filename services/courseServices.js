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

const courseServices = {
  create,
  getAll,
  getOne,
  update,
};

module.exports = courseServices;
