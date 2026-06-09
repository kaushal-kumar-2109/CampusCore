const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Departments = require("../models/department.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/CampusCore";

const COLLEGE_ID = "6a213c8eba4a98d98a0839d8";
const ADMIN_ID = "6a213c8eba4a98d98a0839d9";

const defaultPassword = "Student@123";

const UNIVERSITY_START_YEAR = 2012;
const CURRENT_YEAR = 2026;

const MIN_STUDENTS_PER_COURSE_YEAR = 250;
const MAX_STUDENTS_PER_COURSE_YEAR = 300;

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Sai", "Rahul", "Aman", "Rohan",
  "Karan", "Ayush", "Akash", "Nikhil", "Harsh", "Yash", "Mohit", "Ritik",
  "Ananya", "Diya", "Ishita", "Kavya", "Riya", "Priya", "Neha", "Pooja",
  "Sneha", "Aditi", "Simran", "Nandini", "Muskan", "Sakshi"
];

const lastNames = [
  "Sharma", "Verma", "Singh", "Gupta", "Yadav", "Pandey", "Jain",
  "Mishra", "Kumar", "Srivastava", "Tiwari", "Chauhan", "Rathore",
  "Saxena", "Agarwal", "Malhotra", "Bansal", "Mehta", "Thakur", "Rajput"
];

const cities = [
  "Greater Noida", "Noida", "Delhi", "Ghaziabad", "Gurugram",
  "Lucknow", "Kanpur", "Agra", "Meerut", "Varanasi"
];

const states = [
  "Uttar Pradesh", "Delhi", "Haryana", "Rajasthan", "Madhya Pradesh"
];

const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getGender = (firstName) => {
  const femaleNames = [
    "Ananya", "Diya", "Ishita", "Kavya", "Riya", "Priya", "Neha", "Pooja",
    "Sneha", "Aditi", "Simran", "Nandini", "Muskan", "Sakshi"
  ];

  return femaleNames.includes(firstName) ? "Female" : "Male";
};

const cleanCode = (code = "") => {
  return String(code).replace(/[^A-Z0-9]/gi, "").toUpperCase();
};

const getRollNumber = (courseCode, batchYear, serialNumber) => {
  return `${cleanCode(courseCode)}${batchYear}${String(serialNumber).padStart(4, "0")}`;
};

const getEnrollmentNumber = (batchYear, globalCount) => {
  return `ENR${batchYear}${String(globalCount).padStart(6, "0")}`;
};

const getSemesterAndStatus = (batchYear, totalSemesters = 8, totalYears = 4) => {
  const academicYear = CURRENT_YEAR - batchYear + 1;

  if (academicYear > totalYears) {
    return {
      semester: totalSemesters,
      status: "Graduated",
    };
  }

  let semester = academicYear * 2 - 1;

  if (semester < 1) semester = 1;
  if (semester > totalSemesters) semester = totalSemesters;

  return {
    semester,
    status: "Active",
  };
};

const generatePhoneNumber = (prefix, count) => {
  return `${prefix}${String(100000 + count).slice(0, 6)}`;
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

    let globalCount = 1;
    let totalInserted = 0;

    for (const course of courses) {
      console.log(`\nCreating students for course: ${course.courseName}`);

      const studentsToInsert = [];

      for (
        let batchYear = UNIVERSITY_START_YEAR;
        batchYear <= CURRENT_YEAR;
        batchYear++
      ) {
        const studentsThisYear = randomNumber(
          MIN_STUDENTS_PER_COURSE_YEAR,
          MAX_STUDENTS_PER_COURSE_YEAR
        );

        for (
          let serial = 1;
          serial <= studentsThisYear;
          serial++
        ) {
          const firstName = randomItem(firstNames);
          const lastName = randomItem(lastNames);
          const gender = getGender(firstName);

          const rollNumber = getRollNumber(
            course.courseCode,
            batchYear,
            serial
          );

          const enrollmentNumber = getEnrollmentNumber(
            batchYear,
            globalCount
          );

          const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${rollNumber.toLowerCase()}@campuscore.edu`;

          const city = randomItem(cities);
          const state = randomItem(states);

          const { semester, status } = getSemesterAndStatus(
            batchYear,
            course.totalSemesters || 8,
            course.totalYears || 4
          );

          studentsToInsert.push({
            rollNumber,
            enrollmentNumber,

            firstName,
            lastName,
            gender,
            dateOfBirth: "2003-09-21",
            profileImage: "",

            email,
            alternateEmail: "",

            contactNumber: generatePhoneNumber("98765", globalCount),
            alternateContactNumber: "",
            FatherContactNumber: generatePhoneNumber("98766", globalCount),
            MotherContactNumber: generatePhoneNumber("98767", globalCount),

            address: city,
            city,
            state,
            country: "India",
            pincode: "201310",

            courseId: course._id,
            departmentId: course.departmentId?._id,
            semester,
            section: serial % 2 === 0 ? "A" : "B",
            batchYear,
            admissionDate: new Date(`${batchYear}-08-01`),

            fatherName: `${lastName} Father`,
            motherName: `${lastName} Mother`,
            guardianName: "",
            parentContactNumber: generatePhoneNumber("98768", globalCount),
            parentEmail: `parent.${rollNumber.toLowerCase()}@gmail.com`,

            password: hashedPassword,
            isEmailVerified: true,

            status,

            createdBy: ADMIN_ID,
            collegeId: COLLEGE_ID,
          });

          globalCount++;
        }

        console.log(
          `Prepared ${studentsThisYear} students for ${course.courseCode} - ${batchYear}`
        );
      }

      try {
        const result = await Student.insertMany(studentsToInsert, {
          ordered: false,
        });

        totalInserted += result.length;

        console.log(
          `Inserted ${result.length} students for ${course.courseName}`
        );
      } catch (error) {
        if (error.insertedDocs) {
          totalInserted += error.insertedDocs.length;
          console.log(
            `Inserted ${error.insertedDocs.length} students with some duplicates skipped`
          );
        } else {
          console.log(
            `Insert error for ${course.courseName}:`,
            error.message
          );
        }
      }
    }

    console.log(`\nSeeding completed successfully`);
    console.log(`Total students inserted: ${totalInserted}`);

    process.exit(0);
  } catch (error) {
    console.log("Error while seeding students:", error.message);
    process.exit(1);
  }
};

seedStudents();