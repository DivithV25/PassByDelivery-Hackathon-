const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a Mongoose Schema for Orders
const orderSchema = new mongoose.Schema({
  itemName: String,
  itemDetails: String,
  pickupAddress: String,
  dropAddress: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
});

const Order = mongoose.model("Order", orderSchema);

// API Endpoint to Save Order
app.post("/api/orders", async (req, res) => {
  const {
    itemName,
    itemDetails,
    pickupAddress,
    dropAddress,
    cardNumber,
    expiryDate,
    cvv,
  } = req.body;

  try {
    const newOrder = new Order({
      itemName,
      itemDetails,
      pickupAddress,
      dropAddress,
      cardNumber,
      expiryDate,
      cvv,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});