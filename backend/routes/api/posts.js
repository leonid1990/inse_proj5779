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

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, postController.getAllPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", auth, postController.getPostById);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, postController.deletePostById);

// @route  GET api/posts
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("Posts route");
// });

module.exports = router;
