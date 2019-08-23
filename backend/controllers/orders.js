const { validationResult } = require("express-validator");

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    for (const item of req.body.details) {
      await Product.findById(item.product, (err, product) => {
        item.title = product.title;
      });
    }

    const newOrder = new Order({
      user: req.body.user,
      name: user.name,
      details: req.body.details,
      address: req.body.address
    });

    const order = await newOrder.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllOrders = async (req, res) => {
  // Check user
  if (!req.user.isAdmin) {
    return res.status(401).json({ msg: "User not authorized" });
  }
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getOrderById = async (req, res) => {
  // Check user
  if (!req.user.isAdmin && order.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not authorized" });
  }
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.deleteOrderById = async (req, res) => {
  // Check user
  if (!req.user.isAdmin && order.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not authorized" });
  }
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await order.remove();

    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error");
  }
};
