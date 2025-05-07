const routes = require("express").Router();
const {
  passwordResetOtp,
} = require("../controllers/password_reset_otp.controller");

routes.post("/send/:type", passwordResetOtp);
module.exports = routes;
