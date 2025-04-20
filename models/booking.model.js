const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "redeemed", "expired", "cancelled"],
      default: "booked",
    },

    bookingTime: {
      type: Date,
      default: Date.now,
    },

    redemptionTime: {
      type: Date,
    },

    qrScanned: {
      type: Boolean,
      default: false,
    },

    finalAmountPaid: {
      type: Number,
    },

    confirmedByUser: {
      type: Boolean,
      default: false,
    },

    pointsEarned: {
      type: Number,
      default: 0,
    },

    receiptUrl: {
      type: String, // optional proof for anti-fraud
    },

    disputeFlag: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String, // optional field for dispute comments
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = { Booking, BookingSchema };
