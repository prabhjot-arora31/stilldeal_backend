const sendVerificationCode = require("../utils/SendVerificationCode");
const otpGenerator = require("otp-generator");
const { User } = require("../models/user.model");
const send_verification_code = async (req, res) => {
  console.log("inside send_verification_code");
  const { email } = req.body;
  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Generate OTP
  // Generate a 4-digit OTP (numeric only)
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  console.log("generating:", otp);
  // Validate input
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Send verification code
  try {
    await sendVerificationCode(email, otp);
    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending verification code" });
  }
};

module.exports = send_verification_code;
