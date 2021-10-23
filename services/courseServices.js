const Course = require("../models/Course");
const User = require("../models/User");

const create = (data) => Course.create(data);
const getAll = () => Course.find({}).lean();

const courseServices = {
  create,
  getAll,
};

module.exports = courseServices;
