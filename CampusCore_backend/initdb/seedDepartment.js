const mongoose = require("mongoose");
const Department = require("../models/department.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/CampusCore";

const collegeId = "6a213c8eba4a98d98a0839d8";

const departments = [
  {
    departmentName: "Computer Science and Engineering",
    departmentCode: "CSE",
    description: "Department of Computer Science and Engineering",
    departmentEmail: "cse@campuscore.edu",
    departmentContactNumber: "9876543210",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Information Technology",
    departmentCode: "IT",
    description: "Department of Information Technology",
    departmentEmail: "it@campuscore.edu",
    departmentContactNumber: "9876543211",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Electronics and Communication Engineering",
    departmentCode: "ECE",
    description: "Department of Electronics and Communication Engineering",
    departmentEmail: "ece@campuscore.edu",
    departmentContactNumber: "9876543212",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Mechanical Engineering",
    departmentCode: "ME",
    description: "Department of Mechanical Engineering",
    departmentEmail: "me@campuscore.edu",
    departmentContactNumber: "9876543213",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Civil Engineering",
    departmentCode: "CE",
    description: "Department of Civil Engineering",
    departmentEmail: "ce@campuscore.edu",
    departmentContactNumber: "9876543214",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Electrical Engineering",
    departmentCode: "EE",
    description: "Department of Electrical Engineering",
    departmentEmail: "ee@campuscore.edu",
    departmentContactNumber: "9876543215",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Data Science",
    departmentCode: "DS",
    description: "Department of Data Science",
    departmentEmail: "ds@campuscore.edu",
    departmentContactNumber: "9876543216",
    collegeId,
    createdBy: "Admin",
  },
  {
    departmentName: "Artificial Intelligence and Machine Learning",
    departmentCode: "AIML",
    description: "Department of Artificial Intelligence and Machine Learning",
    departmentEmail: "aiml@campuscore.edu",
    departmentContactNumber: "9876543217",
    collegeId,
    createdBy: "Admin",
  },
];

const seedDepartments = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");

    for (const department of departments) {
      const existingDepartment = await Department.findOne({
        collegeId: department.collegeId,
        departmentCode: department.departmentCode,
      });

      if (existingDepartment) {
        console.log(`${department.departmentCode} already exists`);
        continue;
      }

      await Department.create(department);
      console.log(`${department.departmentName} added successfully`);
    }

    console.log("Department seeding completed");
    process.exit(0);
  } catch (error) {
    console.log("Error while seeding departments:", error.message);
    process.exit(1);
  }
};

seedDepartments();