const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },
  name: String,
  phone: String,
  email: String,
  city: String,
  address: String,
  items: Array,
  total: Number,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });



module.exports = mongoose.model("Order", orderSchema);
