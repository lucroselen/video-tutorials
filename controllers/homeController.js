const express = require("express");
const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Homepage" });
});

router.get("/profile", (req, res) => {
  res.render("myProfile", { title: "My Profile" });
});

router.get("/create-course", isAuth, (req, res) => {
  res.render("create-course", { title: "Create Course" });
});

router.get("/edit-course", isAuth, (req, res) => {
  res.render("edit-course", { title: "Edit Course" });
});

router.get("/details", (req, res) => {
  res.render("course-details", { title: "Course Details" });
});

module.exports = router;
