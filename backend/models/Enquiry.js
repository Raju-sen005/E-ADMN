const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    phone: { type: String },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
