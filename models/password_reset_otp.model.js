const mongoose = require("mongoose");
const PasswordResetOTPSchema = new mongoose.Schema({
  otp: Number,
  email: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires after 5 mins (300 seconds)
});
const PasswordResetOTPModel = mongoose.model(
  "PasswordResetOTP",
  PasswordResetOTPSchema
);
module.exports = PasswordResetOTPModel;
