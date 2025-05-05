const routes = require("express").Router();
const send_verification_code = require("../controllers/send_email_verfication_code.controller");
routes.post("/send_email_verification_code/:type", send_verification_code);
module.exports = routes;
