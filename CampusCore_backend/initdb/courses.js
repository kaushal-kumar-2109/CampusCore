const mongoose = require("mongoose");

const Course = require("../models/course.model");
const Department = require("../models/department.model");

const MONGO_URI = "mongodb://127.0.0.1:27017/CampusCore";

const COLLEGE_ID = "6a213c8eba4a98d98a0839d8";

/* Change this to your Admin ObjectId */
const ADMIN_ID = "6a213c8eba4a98d98a0839d9";

const seedCourses = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Database Connected");

        const departments = await Department.find({
            collegeId: COLLEGE_ID,
        });

        if (!departments.length) {
            console.log("No departments found");
            process.exit(0);
        }

        const courseTemplates = [
            {
                name: "Bachelor of Technology",
                shortCode: "BTECH",
                duration: 4,
                totalSemesters: 8,
                totalYears: 4,
                courseType: "UG",
            },
            {
                name: "Master of Computer Applications",
                shortCode: "MCA",
                duration: 2,
                totalSemesters: 4,
                totalYears: 2,
                courseType: "PG",
            },
            {
                name: "Bachelor of Computer Applications",
                shortCode: "BCA",
                duration: 3,
                totalSemesters: 6,
                totalYears: 3,
                courseType: "UG",
            },
            {
                name: "Master of Technology",
                shortCode: "MTECH",
                duration: 2,
                totalSemesters: 4,
                totalYears: 2,
                courseType: "PG",
            },
        ];

        let randomNumber = 101;

        for (const department of departments) {

            for (const template of courseTemplates) {

                const courseCode =
                    `${department.departmentCode}${template.shortCode}${randomNumber}`;

                const exists = await Course.findOne({
                    collegeId: COLLEGE_ID,
                    courseCode,
                });

                if (exists) {
                    console.log(`${courseCode} already exists`);
                    randomNumber++;
                    continue;
                }

                await Course.create({
                    courseName: `${template.name} (${department.departmentCode})`,
                    courseCode,

                    departmentId: department._id,

                    duration: template.duration,
                    durationType: "Year",

                    totalSemesters:
                        template.totalSemesters,

                    totalYears:
                        template.totalYears,

                    description:
                        `${template.name} program under ${department.departmentName}`,

                    courseType:
                        template.courseType,

                    collegeId: COLLEGE_ID,

                    createdBy: ADMIN_ID,
                });

                console.log(
                    `Created -> ${courseCode}`
                );

                randomNumber++;
            }
        }

        console.log(
            "\nAll Courses Added Successfully"
        );

        process.exit(0);

    } catch (error) {

        console.log(error.message);

        process.exit(1);
    }
};

seedCourses();