const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// middleware
app.use(cors());
app.use(express.json());

// frontend folder public
app.use(express.static(path.join(__dirname, "../frontend")));

// test route
app.get("/", (req, res) => {
  res.send("Peepal Masale Backend Running ✅");
});

console.log("RENDER MONGO URI:", process.env.MONGO_URI);
// MongoDB connect
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
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


