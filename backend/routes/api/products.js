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

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get("/", productController.getAllProducts);

// @route    GET api/products/:id
// @desc     Get product by ID
// @access   Public
router.get("/:id", productController.getProductById);

// @route    POST api/products/:id
// @desc     Update a product
// @access   Private
router.post(
  "/:id",
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

  productController.updateProduct
);

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete("/:id", auth, productController.deleteProductById);

// @route  GET api/products
// @desc   Test route
// @access Public
// router.get("/", (req, res) => {
//   res.send("Products route");
// });

module.exports = router;
