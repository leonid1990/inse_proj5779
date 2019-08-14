var express = require("express");
var router = express.Router();

const controller = require("../../conrollers/products");

// @route  GET api/products
// @desc   Test route
// @access Public
router.get("/", (req, res) => {
  res.send("Products route");
});

module.exports = router;
