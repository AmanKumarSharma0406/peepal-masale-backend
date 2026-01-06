const express = require("express");
const router = express.Router();

let cart = [];

router.get("/", (req, res) => {
  res.json(cart);
});

router.post("/add", (req, res) => {
  cart.push(req.body);
  res.json({ success: true, cart });
});

module.exports = router;
