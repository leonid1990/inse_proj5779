const { validationResult } = require("express-validator");

const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newProduct = new Product({
      title: req.body.title,
      sku: req.body.sku,
      price: req.body.price,
      currencyFormat: req.body.currencyFormat,
      quantity: req.body.quantity
    });

    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
