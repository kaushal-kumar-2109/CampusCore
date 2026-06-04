const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
{
    /* ==========================
       Basic Information
    ========================== */

    employeeId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

    profileImage: {
        type: String,
        default: "",
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: {
        type: Date,
    },

    /* ==========================
       Contact Information
    ========================== */

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    contactNumber: {
        type: String,
        required: true,
    },

    alternateContactNumber: {
        type: String,
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

    /* ==========================
       Academic Information
    ========================== */

    qualification: {
        type: String,
    },

    specialization: {
        type: String,
    },

    experience: {
        type: Number,
        default: 0,
    },

    /* ==========================
       Organization Information
    ========================== */

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departments",
        required: true,
    },

    designation: {
        type: String,
        enum: [
            "Principal",
            "Vice Principal",
            "HOD",
            "Professor",
            "Associate Professor",
            "Assistant Professor",
            "Lecturer",
            "Lab Assistant",
            "Librarian",
            "Accountant",
            "Hostel Warden",
            "Transport Manager",
            "Office Staff",
            "Other",
        ],
        required: true,
    },

    joiningDate: {
        type: Date,
        default: Date.now,
    },

    employmentType: {
        type: String,
        enum: [
            "Permanent",
            "Contract",
            "Guest",
            "Part-Time",
        ],
        default: "Permanent",
    },

    salary: {
        type: String,
        default: "0",
    },

    /* ==========================
       Login Information
    ========================== */

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

    /* ==========================
       Status
    ========================== */

    status: {
        type: String,
        enum: [
            "Active",
            "Inactive",
            "Suspended",
            "Resigned",
        ],
        default: "Active",
    },

    /* ==========================
       References
    ========================== */

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

/* Employee ID unique per college */

staffSchema.index(
{
    collegeId: 1,
    employeeId: 1,
},
{
    unique: true,
}
);

/* Staff Email unique per college */

staffSchema.index(
{
    collegeId: 1,
    email: 1,
},
{
    unique: true,
}
);

module.exports = mongoose.model(
    "Staffs",
    staffSchema
);