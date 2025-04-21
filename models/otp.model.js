const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires after 5 mins (300 seconds)
});

// TTL index will auto-delete expired documents
module.exports = mongoose.model("Otp", otpSchema);
