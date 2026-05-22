const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        adminName: {
            type: String,
            required: true,
            trim: true,
        },
        adminEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        adminContactNumber: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            min:8
        },
        collegeID: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["SUPER_ADMIN", "COLLEGE_ADMIN"],
            default: "COLLEGE_ADMIN",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        subscriptionPlan: {
            type: String,
            enum: ["FREE", "BASIC", "PRO", "ENTERPRISE"],
            default: "FREE",
        },
        subscriptionStatus: {
            type: String,
            enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
            default: "ACTIVE",
        },
        token: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        UpdatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;