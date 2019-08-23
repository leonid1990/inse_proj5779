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

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
