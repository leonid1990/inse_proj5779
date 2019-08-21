var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

const productController = require("../../controllers/products");
const auth = require("../../middleware/auth");

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("sku", "sku is required")
        .not()
        .isEmpty(),
      check("price", "price is required")
        .not()
        .isEmpty(),
      check("currencyFormat", "price is required")
        .not()
        .isEmpty(),
      check("quantity", "price is required")
        .not()
        .isEmpty()
    ]
  ],

  productController.createProduct
);

// @route  GET api/products
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("Products route");
// });

module.exports = router;
