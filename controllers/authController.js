const express = require("express");
//const { isAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/logout", (req, res) => {
  //res.clearCookie(TOKEN_COOKIE_NAME);
  res.redirect("/");
});

module.exports = router;
