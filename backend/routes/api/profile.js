var express = require("express");
var router = express.Router();

const profileController = require("../../controllers/profile");
const auth = require("../../middleware/auth");

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get("/me", auth, profileController.getCurrentProfile);

// @route  GET api/profile
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("profile route");
// });

module.exports = router;
