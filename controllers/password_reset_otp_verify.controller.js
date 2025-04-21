const PasswordResetOTPModel = require("../models/password_reset_otp.model");
const { User } = require("../models/user.model");
const PasswordResetOTPVerify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!email || !code) {
      return res.status(400).json({ message: "Email and code required" });
    }
    const user = await PasswordResetOTPModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please ask for OTP first" });
    }
    console.log("saved code:", user.otp);
    console.log("received code:", code);
    if (user.otp != code) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    // Cleanup after successful match
    await PasswordResetOTPModel.deleteOne({ _id: user._id });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { PasswordResetOTPVerify };
