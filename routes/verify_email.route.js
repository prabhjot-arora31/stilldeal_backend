const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controllers/verify_email.controller");

router.post("/verify", verifyEmail);

module.exports = router;
