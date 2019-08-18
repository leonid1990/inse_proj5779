var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const usersController = require("../../controllers/users");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  usersController.signup
);

// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });
//router.get("/:userName", usersController.get());
module.exports = router;
