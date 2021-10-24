const Course = require("../models/Course");
const User = require("../models/User");

const create = (data) => Course.create(data);
const getAll = () => Course.find({}).lean();
const getOne = (id) => Course.findById(id).lean();

const courseServices = {
  create,
  getAll,
  getOne,
};

module.exports = courseServices;
