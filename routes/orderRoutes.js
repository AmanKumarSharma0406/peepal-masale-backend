const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

function generateOrderId() {
  return "PM-" + Math.floor(100000 + Math.random() * 900000);
}

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const orderId = generateOrderId();

    const order = new Order({
      ...req.body,
      orderId
    });

    await order.save();

    // 👇 FRONTEND KO ORDER ID BHEJ RAHE HAIN
    res.json({
      success: true,
      orderId: orderId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN GET ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
// UPDATE ORDER STATUS
router.put("/:id/status", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
