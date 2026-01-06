const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// frontend folder public
app.use(express.static(path.join(__dirname, "../frontend")));

// test route
app.get("/", (req, res) => {
  res.send("Peepal Masale Backend Running ✅");
});

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/peepal_masale")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("Mongo error ❌", err));

// routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


