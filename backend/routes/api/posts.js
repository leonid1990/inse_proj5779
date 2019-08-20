var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

const postController = require("../../controllers/posts");
const auth = require("../../middleware/auth");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  postController.createPost
);

// @route  GET api/posts
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("Posts route");
// });

module.exports = router;
