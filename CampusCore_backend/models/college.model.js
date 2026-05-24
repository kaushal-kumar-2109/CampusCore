const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
    collegeName: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    collegeCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    collegeType: {
        type: String,
        enum: ["School", "College", "University", "Institute"],
        required: true,
    },
    collegeEmail:{
        type: String,
        default: "",
        unique: true
    },
    collegeContactNumber: {
        type: String,
        unique: true,
        default: ""
    },
    websites: [
        {
            type: {
                type: String,
                default: "link"
            },
            url: {
                type: String,
                default: null,
                trim: true,
            },
        },
    ],
    collefeLogo: {
        type: String,
        default: "",
    },
    collegeCoverImage: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: "India"
    },
    pincode: {
        type: String,
        default: null
    },
    place: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const College = mongoose.model("colleges", collegeSchema);

module.exports = College;