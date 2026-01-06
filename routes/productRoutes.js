const express = require("express");
const router = express.Router();

let products = [
  { id: 1, name: "Haldi (Turmeric)", price: 120, weight: "50g" },
  { id: 2, name: "Mirch (Chilli)", price: 140, weight: "50g" },
];

// GET products
router.get("/", (req, res) => {
  res.json(products);
});

// POST product
router.post("/", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
