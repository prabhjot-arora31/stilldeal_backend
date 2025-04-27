const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "stilldealofficial@zohomail.in",
    pass: process.env.ZOHO_AUTH_PASS,
  },
});

module.exports = transporter;
