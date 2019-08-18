var express = require("express");
var router = express.Router();

const authController = require("../../controllers/auth");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

router.get("/", auth, authController.getUser);

// @route  GET api/auth
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("Auth route");
// });

module.exports = router;
