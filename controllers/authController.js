const express = require("express");
const { isAuth, isAlreadyLogged } = require("../middlewares/authMiddleware");
const router = express.Router();
const { TOKEN_COOKIE_NAME } = require("../config/constants");
const authServices = require("../services/authServices");

router.get("/register", isAlreadyLogged, (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/login", isAlreadyLogged, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME);
  res.redirect("/");
});

router.post("/login", isAlreadyLogged, async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await authServices.login(username, password);

    if (!user) {
      res.render("login", { error: "Invalid username or password!" });
    }
    let token = await authServices.createToken(user);

    res.cookie(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
    });

    res.redirect("/");
  } catch (error) {
    res.render("login", { error: getErrorMessage(error) });
  }
});

router.post("/register", isAlreadyLogged, async (req, res) => {
  let { username, password, rePassword } = req.body;

  try {
    if (password !== rePassword) {
      res.render("register", { error: "Both passwords must be the same!" });
    } else {
      await authServices.register(username, password);
      let user = await authServices.login(username, password);
      let token = await authServices.createToken(user);

      res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
      });

      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.render("register", { error: getErrorMessage(error) });
  }
});

function getErrorMessage(error) {
  let errorNames = Object.keys(error.errors);
  if (errorNames.length > 0) {
    return error.errors[errorNames[0]].properties.message;
  } else {
    return error.message;
  }
}

module.exports = router;
