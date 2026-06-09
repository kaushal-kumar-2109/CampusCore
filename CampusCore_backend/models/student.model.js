const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    /* =============================
       Basic Information
    ============================= */

    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    enrollmentNumber: {
        type: String,
        unique: true,
        trim: true,
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        trim: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: {
        type: String,
    },

    profileImage: {
        type: String,
        default: "",
    },

    /* =============================
       Contact Information
    ============================= */

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    alternateEmail: {
        type: String,
        lowercase: true,
        trim: true,
        default: "",
    },
    contactNumber: {
        type: String,
        required: true,
    },

    alternateContactNumber: {
        type: String,
        default: "",
    },
    FatherContactNumber: {
        type: String,
        default: "",
    },
    MotherContactNumber: {
        type: String,
        default: "",
    },
    address: {
        type: String,
    },

    city: {
        type: String,
    },

    state: {
        type: String,
    },

    country: {
        type: String,
        default: "India",
    },

    pincode: {
        type: String,
    },

    /* =============================
       Academic Information
    ============================= */

    courseId: {
        type: String,
        ref: "Courses",
        required: true,
    },

    departmentId: {
        type: String,
        ref: "Departments",
        required: true,
    },

    semester: {
        type: Number,
        required: true,
    },

    section: {
        type: String,
    },

    batchYear: {
        type: Number,
    },

    admissionDate: {
        type: Date,
        default: Date.now,
    },

    /* =============================
       Parent Information
    ============================= */

    fatherName: {
        type: String,
    },

    motherName: {
        type: String,
    },

    guardianName: {
        type: String,
    },

    parentContactNumber: {
        type: String,
    },

    parentEmail: {
        type: String,
    },

    /* =============================
       Login Information
    ============================= */

    password: {
        type: String,
        required: true,
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    lastLogin: {
        type: Date,
    },

    /* =============================
       ERP Status
    ============================= */

    status: {
        type: String,
        enum: [
            "Active",
            "Inactive",
            "Suspended",
            "Graduated",
            "Dropped",
        ],
        default: "Active",
    },

    /* =============================
       References
    ============================= */

    createdBy: {
        type: String,
        ref: "Admin",
    },

    collegeId: {
        type: String,
        ref: "College",
        required: true,
    },

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Students", studentSchema);