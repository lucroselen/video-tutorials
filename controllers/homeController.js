const express = require("express");
const { isAuth } = require("../middlewares/authMiddleware");
const { errorHandler } = require("../middlewares/errorHandler");
const router = express.Router();
const authServices = require("../services/authServices");
const courseServices = require("../services/courseServices");

router.get("/", (req, res) => {
  res.render("home", { title: "Homepage" });
});

router.get("/profile", async (req, res) => {
  let courses = await authServices.getCourses(req.user._id);
  res.render("myProfile", { title: "My Profile", courses });
});

router.get("/create-course", isAuth, (req, res) => {
  res.render("create-course", { title: "Create Course" });
});

router.post("/create-course", isAuth, async (req, res) => {
  let { title, description, imageUrl, isPublic } = req.body;
  if (isPublic) {
    isPublic = true;
  }

  try {
    await courseServices.create({
      title,
      description,
      imageUrl,
      isPublic,
    });
    res.redirect("/");
  } catch (error) {
    res.render("create-course", { error: errorHandler(error) });
  }
});

router.get("/edit-course", isAuth, (req, res) => {
  res.render("edit-course", { title: "Edit Course" });
});

router.get("/details", (req, res) => {
  res.render("course-details", { title: "Course Details" });
});

module.exports = router;
