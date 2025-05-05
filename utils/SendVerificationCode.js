const nodemailer = require("nodemailer");
const Otp = require("../models/otp.model");
const transporter = require("./transporter"); // Import the transporter configuration

const sendVerificationCode = async (email, code, res) => {
  await Otp.deleteMany({ email }); // Delete any existing OTPs for the email
  await new Otp({ email, code }).save(); // Store the new OTP in the database
  console.log("code is:", code);
  const mailOptions = {
    from: "Still Deal <stilldealofficial@zohomail.in>",
    to: email,
    subject: "Still Deal Verification OTP",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Still Deal Verification OTP</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .footer { font-size: 0.8em; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear User,</p>
        
        <p>Your OTP for verification is <strong style="font-size: 1.2em;">${code}</strong>.</p>
        
        <p>Please enter this code in the application to verify your email address.</p>
        
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
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", email);
    res.status(200).json({
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = sendVerificationCode;
