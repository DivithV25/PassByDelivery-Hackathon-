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
  .connect("mongodb://127.0.0.1:27017/volunteer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a Mongoose Schema for Volunteer Data
const volunteerSchema = new mongoose.Schema({
  availability: String,
  startTime: String,
  route: String,
  deviations: Number,
  confirm: String,
});

const Volunteer = mongoose.model("VolunteerData", volunteerSchema);

// API Endpoint to Save Volunteer Data
app.post("/api/volunteer", async (req, res) => {
  const { availability, startTime, route, deviations, confirm } = req.body;

  try {
    const newVolunteer = new Volunteer({
      availability,
      startTime,
      route,
      deviations,
      confirm,
    });

    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer data saved successfully!" });
    console.log("Data Entered Successfully")
  } catch (error) {
    res.status(500).json({ message: "Error saving volunteer data", error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});