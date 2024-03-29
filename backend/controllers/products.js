const { validationResult } = require("express-validator");

const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check user
  if (!req.user.isAdmin) {
    return res.status(401).json({ msg: "User not authorized" });
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

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Check user
    if (!req.user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await product.remove();

    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server Error");
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check user
  if (!req.user.isAdmin) {
    return res.status(401).json({ msg: "User not authorized" });
  }

  const { title, sku, price, currencyFormat, quantity } = req.body;

  const productFields = {};
  productFields.product = req.params.id;
  if (title) productFields.title = title;
  if (sku) productFields.sku = sku;
  if (price) productFields.price = price;
  if (currencyFormat) productFields.currencyFormat = currencyFormat;
  if (quantity) productFields.quantity = quantity;

  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      // Update
      product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: productFields },
        { new: true, upsert: true }
      );

      await product.save();
      res.json(product);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
