const mongoose = require("mongoose");

const QRScanLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    scannedAt: {
      type: Date,
      default: Date.now,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    userDeviceInfo: {
      type: String, // Optional: device/browser info for analytics
    },
  },
  { timestamps: true }
);

const QRScanLog = mongoose.model("QRScanLog", QRScanLogSchema);
module.exports = { QRScanLog, QRScanLogSchema };
