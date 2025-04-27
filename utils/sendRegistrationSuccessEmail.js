const transporter = require("./transporter");
const sendRegistrationSuccess = async (email) => {
  const mailOptions = {
    from: "Still Deal <stilldealofficial@zohomail.in>",
    to: email,
    subject: "Still Deal Registration Success",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Still Deal Registration Success</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .footer { font-size: 0.8em; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear User,</p>
        
        <p>We are pleased to inform you that your registration on Still Deal was successful.</p>
        
        <p>If you did not attempt to register, please contact us immediately.</p>
        
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
</html>
`,
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
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendRegistrationSuccess;
