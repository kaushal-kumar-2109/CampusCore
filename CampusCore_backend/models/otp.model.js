const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // auto delete after 5 minutes
    },
  },
  {
    timestamps: false,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;