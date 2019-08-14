var express = require("express");
var router = express.Router();

const controller = require("../../conrollers/users");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Users route");
});

// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });
//router.get("/:userName", controller.get());
module.exports = router;
