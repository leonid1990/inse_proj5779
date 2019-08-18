var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

const authController = require("../../controllers/auth");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route  GET api/auth
// @desc   Test route
// @access Public
router.get("/", auth, authController.testAuth);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  authController.authenticateUser
);

module.exports = router;
