var express = require("express");
var router = express.Router();

const postsController = require("../../controllers/posts");

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get("/", (req, res) => {
  res.send("Posts route");
});

module.exports = router;
