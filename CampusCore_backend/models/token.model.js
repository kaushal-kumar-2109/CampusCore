const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    adminEmail:{
        type: String,
        required: true,
        unique: true
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 604800, // 7 days
    },
  },
  {
    timestamps: false,
  }
);

const Token = mongoose.model("tokens", tokenSchema);

module.exports = Token;