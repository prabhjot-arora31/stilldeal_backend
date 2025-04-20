const sendVerificationCode = require("../utils/SendVerificationCode");
const otpGenerator = require("otp-generator");

const send_verification_code = async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    alphabets: false,
  });
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
