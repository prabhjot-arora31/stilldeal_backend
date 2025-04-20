const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "food",
        "electronics",
        "fashion",
        "services",
        "travel",
        "health",
        "grocery",
        "other",
      ],
      required: true,
    },
    tags: [String], // e.g., ["student", "group", "limited-time"]

    dealType: {
      type: String,
      enum: ["solo", "group", "student", "senior", "tourist", "public"],
      default: "public",
    },

    minGroupSize: { type: Number }, // if group deal
    maxUsage: { type: Number }, // total redemptions allowed
    usageCount: { type: Number, default: 0 },

    startTime: { type: Date },
    endTime: { type: Date },

    isActive: { type: Boolean, default: true },

    bookedUsers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        bookingTime: { type: Date, default: Date.now },
        redeemed: { type: Boolean, default: false },
        redeemedAt: { type: Date },
      },
    ],

    votes: {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
    },

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    images: [String],
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", DealSchema);
module.exports = { Deal, DealSchema };
