const sendVerificationCode = require("../utils/SendVerificationCode");
const otpGenerator = require("otp-generator");
const { User } = require("../models/user.model");
const { Business } = require("../models/business.model");
const send_verification_code = async (req, res) => {
  console.log("inside send_verification_code");
  console.log("code trying to send to:", req.params.type);
  const { email } = req.body;
  // Check if user already exists
  var user;
  if (req.params.type == "GU") {
    user = await User.findOne({ email });
  } else user = await Business.findOne({ email });
  if (user && req.params.type == "GU") {
    return res.status(400).json({ message: "User already exists" });
  } else if (user && req.params.type == "business") {
    return res.status(400).json({ message: "Business already exists" });
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
    await sendVerificationCode(email, otp, res);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending verification code" });
  }
};

module.exports = send_verification_code;
