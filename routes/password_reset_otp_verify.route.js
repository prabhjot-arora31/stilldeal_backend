const routes = require("express").Router();
const {
  PasswordResetOTPVerify,
} = require("../controllers/password_reset_otp_verify.controller");
routes.post("/verify", PasswordResetOTPVerify);
module.exports = routes;
