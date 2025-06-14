const mongoose = require("mongoose");
const BusinessSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    match: /.+\@.+\..+/,
  },
  password: { type: String, required: true, select: false, minlength: 6 },
  addressLine1: { type: String },
  businessType: { type: String },
  businessWebsite: { type: [String] },
  businessCategory: { type: String },
  businessStartDate: { type: String },
  profilePicture: { type: String },
  profileCompleted: { type: Boolean, default: false },
  loyaltyProgram: {
    pointsPerAmount: { type: Number, default: 0 }, // e.g. 1 point per ₹100
    redemptionRule: { type: String }, // e.g. "100 points = ₹50 off"
    maxPointsPerPurchase: { type: Number }, // optional cap
  },
  referralRewards: {
    referrerPoints: { type: Number, default: 0 },
    refereePoints: { type: Number, default: 0 },
  },
  dealStats: {
    totalDealsPosted: { type: Number, default: 0 },
    totalRedemptions: { type: Number, default: 0 },
    totalScans: { type: Number, default: 0 },
    repeatCustomers: { type: Number, default: 0 },
  },
  qrAnalytics: {
    dailyScans: { type: Map, of: Number }, // { '2025-04-18': 23 }
    peakHours: { type: [String] }, // ['4PM–6PM']
  },
  tags: { type: [String] }, // e.g., ["pizza", "vegan", "student-friendly"]
  paymentMethods: {
    cash: { type: Boolean, default: true },
    card: { type: Boolean, default: false },
    upi: { type: Boolean, default: false },
    wallet: { type: Boolean, default: false },
  },
  businessDocs: {
    license: { type: String }, // file URL
    gstNumber: { type: String },
    uploadedAt: { type: Date },
  },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  socialLinks: [String],
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  openingHours: {
    type: String,
  },
  services: {
    type: [String],
  },
  images: {
    type: [String],
  },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Business = mongoose.model("Business", BusinessSchema);
module.exports = { Business, BusinessSchema };
