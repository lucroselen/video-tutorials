const Course = require("../models/Course");
const User = require("../models/User");

const create = (data) => Course.create(data);

const courseServices = {
  create,
};

module.exports = courseServices;
