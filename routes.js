const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController.js");
const authController = require("./controllers/authController.js");

router.use(authController);
router.use(homeController);

module.exports = router;
