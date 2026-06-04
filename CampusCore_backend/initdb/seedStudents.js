const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Department = require("../models/department.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/CampusCore";

const COLLEGE_ID = "6a213c8eba4a98d98a0839d8"; // Replace with your real college _id

/* Replace with your real admin _id */
const ADMIN_ID = "6a213c8eba4a98d98a0839d9";

const defaultPassword = "Student@123";

const studentNames = [
    ["Aarav", "Sharma", "Male"],
    ["Vivaan", "Verma", "Male"],
    ["Aditya", "Singh", "Male"],
    ["Arjun", "Kumar", "Male"],
    ["Sai", "Gupta", "Male"],
    ["Ananya", "Mishra", "Female"],
    ["Diya", "Yadav", "Female"],
    ["Ishita", "Jain", "Female"],
    ["Kavya", "Srivastava", "Female"],
    ["Riya", "Pandey", "Female"],
];

const getRollNumber = (courseCode, index) => {
    return `${courseCode}${String(index).padStart(3, "0")}`;
};

const getEnrollmentNumber = (batchYear, index) => {
    return `ENR${batchYear}${String(index).padStart(5, "0")}`;
};

const seedStudents = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");

        const courses = await Course.find({
            collegeId: COLLEGE_ID,
        }).populate("departmentId");

        if (!courses.length) {
            console.log("No courses found for this college");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        let count = 1;

        for (const course of courses) {
            for (let i = 0; i < studentNames.length; i++) {
                const [firstName, lastName, gender] = studentNames[i];

                const batchYear = 2025;
                const semester = Math.floor(Math.random() * course.totalSemesters) + 1;

                const rollNumber = getRollNumber(course.courseCode, count);
                const enrollmentNumber = getEnrollmentNumber(batchYear, count);

                const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${rollNumber.toLowerCase()}@campuscore.edu`;

                const existingStudent = await Student.findOne({
                    collegeId: COLLEGE_ID,
                    $or: [
                        { rollNumber },
                        { enrollmentNumber },
                        { email },
                    ],
                });

                if (existingStudent) {
                    console.log(`${rollNumber} already exists`);
                    count++;
                    continue;
                }

                await Student.create({
                    rollNumber,
                    enrollmentNumber,

                    firstName,
                    lastName,
                    gender,
                    dateOfBirth: "2003-09-21",
                    profileImage: "",

                    email,
                    alternateEmail: "",
                    contactNumber: `98765${String(10000 + count).slice(0, 5)}`,
                    alternateContactNumber: "",
                    FatherContactNumber: `98766${String(10000 + count).slice(0, 5)}`,
                    MotherContactNumber: `98767${String(10000 + count).slice(0, 5)}`,

                    address: "Greater Noida",
                    city: "Greater Noida",
                    state: "Uttar Pradesh",
                    country: "India",
                    pincode: "201310",

                    courseId: course._id,
                    departmentId: course.departmentId._id,
                    semester,
                    section: i % 2 === 0 ? "A" : "B",
                    batchYear,
                    admissionDate: new Date(),

                    fatherName: `${lastName} Father`,
                    motherName: `${lastName} Mother`,
                    guardianName: "",
                    parentContactNumber: `98768${String(10000 + count).slice(0, 5)}`,
                    parentEmail: `parent.${rollNumber.toLowerCase()}@gmail.com`,

                    password: hashedPassword,
                    isEmailVerified: true,

                    status: "Active",

                    createdBy: ADMIN_ID,
                    collegeId: COLLEGE_ID,
                });

                console.log(`Created student: ${rollNumber} - ${firstName} ${lastName}`);

                count++;
            }
        }

        console.log("All students inserted successfully");
        process.exit(0);

    } catch (error) {
        console.log("Error while seeding students:", error.message);
        process.exit(1);
    }
};

seedStudents();