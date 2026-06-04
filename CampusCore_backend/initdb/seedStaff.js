const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Staff = require("../models/staff.model"); 
const Department = require("../models/department.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/CampusCore";

const COLLEGE_ID = "6a213c8eba4a98d98a0839d8"; // Replace with your real college _id

/* Replace with your real admin _id */
const ADMIN_ID = "6a213c8eba4a98d98a0839d9";

const defaultPassword = "Staff@123";

const getEmployeeId = (departmentCode, index) => {
    return `${departmentCode}EMP${String(index).padStart(3, "0")}`;
};

const staffTemplates = [
    {
        firstName: "Amit",
        lastName: "Sharma",
        gender: "Male",
        designation: "HOD",
        qualification: "Ph.D",
        experience: 12,
        salary: "90000",
    },
    {
        firstName: "Priya",
        lastName: "Verma",
        gender: "Female",
        designation: "Assistant Professor",
        qualification: "M.Tech",
        experience: 5,
        salary: "55000",
    },
    {
        firstName: "Rahul",
        lastName: "Singh",
        gender: "Male",
        designation: "Associate Professor",
        qualification: "M.Tech",
        experience: 8,
        salary: "70000",
    },
    {
        firstName: "Neha",
        lastName: "Gupta",
        gender: "Female",
        designation: "Lecturer",
        qualification: "M.Sc",
        experience: 3,
        salary: "40000",
    },
    {
        firstName: "Ravi",
        lastName: "Kumar",
        gender: "Male",
        designation: "Lab Assistant",
        qualification: "B.Tech",
        experience: 2,
        salary: "30000",
    },
];

const seedStaffs = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");

        const departments = await Department.find({
            collegeId: COLLEGE_ID,
        });

        if (!departments.length) {
            console.log("No departments found for this college");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        let count = 1;

        for (const department of departments) {
            for (const staff of staffTemplates) {
                const employeeId = getEmployeeId(
                    department.departmentCode,
                    count
                );

                const email = `${staff.firstName.toLowerCase()}.${staff.lastName.toLowerCase()}.${department.departmentCode.toLowerCase()}@campuscore.edu`;

                const existingStaff = await Staff.findOne({
                    collegeId: COLLEGE_ID,
                    $or: [
                        { employeeId },
                        { email },
                    ],
                });

                if (existingStaff) {
                    console.log(`${employeeId} already exists`);
                    count++;
                    continue;
                }

                await Staff.create({
                    employeeId,

                    firstName: staff.firstName,
                    lastName: staff.lastName,
                    gender: staff.gender,

                    email,
                    contactNumber: `98765${String(10000 + count).slice(0, 5)}`,
                    alternateContactNumber: "",

                    address: "Greater Noida",
                    city: "Greater Noida",
                    state: "Uttar Pradesh",
                    country: "India",
                    pincode: "201310",

                    qualification: staff.qualification,
                    specialization: department.departmentName,
                    experience: staff.experience,

                    departmentId: department._id,
                    designation: staff.designation,

                    joiningDate: new Date(),
                    employmentType: "Permanent",
                    salary: staff.salary,

                    password: hashedPassword,
                    isEmailVerified: true,

                    status: "Active",

                    collegeId: COLLEGE_ID,
                    createdBy: ADMIN_ID,
                });

                console.log(`Created staff: ${employeeId} - ${staff.firstName} ${staff.lastName}`);

                count++;
            }
        }

        console.log("All staff data inserted successfully");
        process.exit(0);

    } catch (error) {
        console.log("Error while seeding staffs:", error.message);
        process.exit(1);
    }
};

seedStaffs();