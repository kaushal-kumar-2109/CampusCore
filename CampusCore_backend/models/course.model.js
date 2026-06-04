const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    courseName: {
        type: String,
        required: true,
        trim: true,
    },

    courseCode: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true,
    },

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departments",
        required: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    durationType: {
        type: String,
        enum: ["Year", "Semester"],
        default: "Year",
    },

    totalSemesters: {
        type: Number,
        default: 0,
    },

    totalYears: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
    },

    courseType: {
        type: String,
        enum: [
            "UG",
            "PG",
            "Diploma",
            "Certificate",
            "Doctorate",
        ],
        required: true,
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },

    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
},
{
    timestamps: true,
}
);

/* Course code unique inside same college */

courseSchema.index(
{
    collegeId: 1,
    courseCode: 1,
},
{
    unique: true,
}
);

module.exports = mongoose.model(
    "Courses",
    courseSchema
);