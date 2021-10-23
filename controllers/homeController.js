const express = require("express");
//const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Homepage" });
});

router.get("/profile", (req, res) => {
  res.render("myProfile", { title: "My Profile" });
});

router.get("/create-course", (req, res) => {
  res.render("create-course", { title: "Create Course" });
});

module.exports = router;
