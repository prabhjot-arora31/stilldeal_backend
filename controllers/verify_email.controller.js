const Otp = require("../models/otp.model");

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "Email and code required" });
  }

  const otpRecord = await Otp.findOne({ email });

  if (!otpRecord) {
    return res.status(404).json({ message: "No OTP found or it expired" });
  }

  if (otpRecord.code !== code) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  await Otp.deleteOne({ _id: otpRecord._id }); // Cleanup after successful match

  res.status(200).json({ message: "Email verified successfully" });
};

module.exports = { verifyEmail };
