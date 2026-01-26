const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ============================
// ORDER ID GENERATOR
// ============================
function generateOrderId() {
  return "PM-" + Math.floor(100000 + Math.random() * 900000);
}

// ============================
// CREATE ORDER (CUSTOMER)
// ============================
router.post("/", async (req, res) => {
  try {
    const orderId = generateOrderId();

    const order = new Order({
      ...req.body,
      orderId,
      status: "Pending"
    });

    await order.save();

    res.json({
      success: true,
      orderId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// GET ORDERS (ADMIN + CUSTOMER)
// 👉 admin: all orders
// 👉 customer: ?phone=XXXXXXXXXX
// ============================
router.get("/", async (req, res) => {
  try {
    const { phone } = req.query;

    const filter = phone ? { phone } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// TRACK SINGLE ORDER (BY ORDER ID)
// ============================
router.get("/track/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// UPDATE ORDER STATUS (ADMIN)
// ============================
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

// ============================
// DELETE ORDER (ADMIN)
// ============================
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
