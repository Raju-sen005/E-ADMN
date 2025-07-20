const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  image: String,
  title: String,
  date: String,
  location: String,
  registerLink: String,
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
