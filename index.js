const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const verificationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Only 5 request per 10 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        "Too many requests from this IP, please try again after 10 minutes.",
    });
  },
});

const dbConnect = require("./utils/dbConnection");
const userRoutes = require("./routes/user.route");
const businessRoutes = require("./routes/business.route");
app.use("/api/users", require("./routes/user.route"));
app.use("/api/businesses", require("./routes/business.route"));
app.use("/api/bookings", require("./routes/booking.route"));
app.use("/api/deals", require("./routes/deal.route"));
app.use("/api/qrscans", require("./routes/qrscanlog.route"));
app.use(
  "/api/verification",
  verificationLimiter,
  require("./routes/send_verification_code.route")
);
app.use("/api/verify_email", require("./routes/verify_email.route"));
app.use(
  "/api/password_reset_otp",
  require("./routes/password_reset_otp.route")
);
app.use(
  "/api/password_reset_otp_verify",
  require("./routes/password_reset_otp_verify.route")
);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
dbConnect(app, PORT);
module.exports = app;
