const { Business } = require("../models/business.model");
const PasswordResetOTPModel = require("../models/password_reset_otp.model");
const { User } = require("../models/user.model");
const nodemailer = require("nodemailer");

const sendPasswordResetCode = async (email, code) => {
  await PasswordResetOTPModel.deleteMany({ email }); // Delete any existing OTPs for the email
  await new PasswordResetOTPModel({ email, otp: code }).save(); // Store the new OTP in the database
  console.log("code is:", code);
  const mailOptions = {
    from: "Still Deal <stilldealofficial@zohomail.in>",
    to: email,
    subject: "Still Deal Password Reset OTP",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Still Deal Password Reset OTP</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .footer { font-size: 0.8em; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear User,</p>
        
        <p>Your OTP for password reset is <strong style="font-size: 1.2em;">${code}</strong>.</p>
        
        <p>If you did not request this code, please ignore this email.</p>
        
        <p>Thank you for using our service!</p>
        
        <p>Best regards,<br>
        Still Deal Team</p>
        
        <div class="footer">
            <p>This is an automated message, please do not reply.</p>
            <p>If you have any questions, please contact us at <a href="mailto:support@stilldeal.com">support@stilldeal.com</a></p>
            <p>© ${new Date().getFullYear()} Still Deal. All rights reserved.</p>
            <p><em>Disclaimer: This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed.</em></p>
        </div>
    </div>
</body>
</html>`,
    headers: {
      "List-Unsubscribe":
        "<mailto:unsubscribe@stilldeal.com?subject=Unsubscribe>",
      "X-Mailer": "Nodemailer",
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "High",
    },
  };

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: "stilldealofficial@zohomail.in",
        pass: process.env.ZOHO_AUTH_PASS,
      },
    });
    await transporter.sendMail(mailOptions);
    console.log("Password Reset Code Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const passwordResetOtp = async (req, res) => {
  const { email } = req.body;
  const { type } = req.params;
  console.log("came here");
  // Check if user already exists

  if (type == "GU") {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
  } else {
    var business = await Business.findOne({ email });
    if (!business) {
      return res.status(400).json({ message: "Business does not exist" });
    }
  }
  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendPasswordResetCode(email, otp);
    res.status(200).json({ message: "Password reset code sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .json({ message: "Error sending password reset code", msg: err.message });
  }
};
module.exports = { passwordResetOtp };
