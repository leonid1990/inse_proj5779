var express = require("express");
var router = express.Router();

const profileController = require("../../controllers/profile");

// @route  GET api/profile
// @desc   Test route
// @access Public
router.get("/", (req, res) => {
  res.send("profile route");
});

module.exports = router;
