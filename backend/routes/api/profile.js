var express = require("express");
const { check } = require("express-validator");

var router = express.Router();

const profileController = require("../../controllers/profile");
const auth = require("../../middleware/auth");

// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
router.get("/me", auth, profileController.getCurrentProfile);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required")
      .not()
      .isEmpty()
  ],
  profileController.updateUserProfile
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", profileController.getAllProfiles);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", profileController.getProfileByUserId);

// @route  GET api/profile
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("profile route");
// });

module.exports = router;
