const express = require("express");
const { isAuth } = require("../middlewares/authMiddleware");
const { errorHandler } = require("../middlewares/errorHandler");
const router = express.Router();
const authServices = require("../services/authServices");
const courseServices = require("../services/courseServices");

router.get("/", async (req, res) => {
  try {
    let courses = await courseServices.getAll();

    res.render("home", { title: "Homepage", courses });
  } catch (error) {
    console.error(error);
    res.render("home", {
      title: "Homepage",
      courses,
      error:
        "We are experiencing technical difficulties and are working to resolve them. Thank you for your understanding!",
    });
  }
});

router.get("/profile", async (req, res) => {
  let user = await authServices.getCourses(req.user._id);
  let courses = user.enrolledCourses.join(", ");

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
      createdAt: new Date().toDateString(),
    });
    res.redirect("/");
  } catch (error) {
    res.render("create-course", { error: errorHandler(error) });
  }
});

router.get("/edit-course/:id", isAuth, async (req, res) => {
  let course = await courseServices.getOne(req.params.id);
  let checked = course.isPublic;
  if (checked) {
    checked = "checked";
  } else {
    checked = "";
  }

  res.render("edit-course", {
    title: "Edit Course",
    ...course,
    checked,
    error: req.query.error,
  });
});

router.post("/edit-course/:id", isAuth, async (req, res) => {
  let { title, description, imageUrl, isPublic } = req.body;
  let id = req.params.id;
  if (isPublic) {
    isPublic = true;
  } else {
    isPublic = false;
  }
  try {
    await courseServices.update(id, title, description, imageUrl, isPublic);

    res.redirect(`/details/${id}`);
  } catch (error) {
    res.redirect(`/edit-course/${id}?error=${errorHandler(error)}`);
  }
});

router.get("/details/:id", async (req, res) => {
  let course = await courseServices.getOne(req.params.id);

  res.render("course-details", { title: "Course Details", ...course });
});

router.get("/delete/:id", isAuth, async (req, res) => {
  await courseServices.deleteRecord(req.params.id);
  res.redirect("/");
});

module.exports = router;
