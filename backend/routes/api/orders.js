var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

const orderController = require("../../controllers/orders");
const auth = require("../../middleware/auth");

// @route    POST api/orders
// @desc     Create a order
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("address", "address is required")
        .not()
        .isEmpty(),
      check(
        "details.*.product",
        "array of products and their quantities is required"
      )
        .not()
        .isEmpty(),
      check(
        "details.*.quantity",
        "array of products and their quantities is required"
      )
        .not()
        .isEmpty()
    ]
  ],
  orderController.createOrder
);

// @route    GET api/orders
// @desc     Get all orders
// @access   Private
router.get("/", auth, orderController.getAllOrders);

// @route    GET api/orders/:id
// @desc     Get order by ID
// @access   Private
router.get("/:id", auth, orderController.getOrderById);

// @route    DELETE api/orders/:id
// @desc     Delete an order
// @access   Private
router.delete("/:id", auth, orderController.deleteOrderById);

module.exports = router;
