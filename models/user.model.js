const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      match: /.+\@.+\..+/,
    },
    username: { type: String, unique: true },
    password: { type: String, select: false, minlength: 6, required: true },
    age: { type: Number },
    address: { type: String },
    phoneNumber: { type: String },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    loyalty: {
      globalPoints: { type: Number, default: 0 },
      businessPoints: [
        {
          businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
          points: { type: Number, default: 0 },
        },
      ],
    },
    bookedDeals: [
      {
        dealId: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
        status: {
          type: String,
          enum: ["booked", "redeemed", "expired"],
          default: "booked",
        },
        bookingTime: { type: Date, default: Date.now },
      },
    ],
    qrScans: [
      {
        businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
        scannedAt: { type: Date, default: Date.now },
        amountPaid: { type: Number },
        pointsEarned: { type: Number },
        confirmed: { type: Boolean, default: false },
      },
    ],
    reviews: [
      {
        businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    votedDeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    notifications: {
      dealAlerts: { type: Boolean, default: true },
      referralUpdates: { type: Boolean, default: true },
      reviewReminders: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };
