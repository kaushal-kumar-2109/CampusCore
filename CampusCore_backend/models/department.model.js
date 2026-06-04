const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
{
    departmentName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    departmentCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },
    departmentEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },

    departmentContactNumber: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },

    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colleges",
        required: true,
    },

    createdBy: {
        type: String,
        enum: ["Admin", "SuperAdmin"],
        required: true,
    },
},
{
    timestamps: true,
}
);

/* Department code unique inside same college */

departmentSchema.index(
{
    collegeId: 1,
    departmentCode: 1,
},
{
    unique: true,
}
);

module.exports = mongoose.model(
    "Departments",
    departmentSchema
);