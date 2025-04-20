const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "stilldealofficial@gmail.com",
    pass: "frhs uztn tweu jlvr", // get from Google account settings
  },
});

const sendVerificationCode = async (email, code) => {
  console.log("code is:", code);
  const mailOptions = {
    from: "Still Deal <stilldealofficial@gmail.com>",
    to: email,
    subject: "Still Deal Verification OTP",
    html: `<div>
    Dear User,<br><br>
    Your OTP for verification is <strong>${code}</strong>.<br><br>
    Please enter this code in the application to verify your email address.<br><br>
    If you did not request this code, please ignore this email.<br><br>
    Thank you for using our service!<br><br>
    Best regards,<br>
    Still Deal Team<br><br>
    <small>This is an automated message, please do not reply.</small><br>
    <small>If you have any questions, please contact us at <a href="mailto:stilldealofficial@gmail.com"> </small>
    Still Deal. All rights reserved.
    <br><br>
    <small>Disclaimer: This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender and delete it from your system.</small><br>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendVerificationCode;
