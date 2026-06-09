const Student = require("../../models/student.model");

const getStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "All",
      semester = "All",
      batchYear = "All",
    } = req.body;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const query = {};

    if (status !== "All") {
      query.status = status;
    }

    if (semester !== "All") {
      query.semester = Number(semester);
    }

    if (batchYear !== "All") {
      query.batchYear = Number(batchYear);
    }

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

       query.$and = [
        {
          $or: [
            { firstName: searchRegex },
            { lastName: searchRegex },
            { email: searchRegex },
            { contactNumber: searchRegex },
            { rollNumber: searchRegex },
            { enrollmentNumber: searchRegex },
          ]
        },
        {
          collegeId: req.user.collegeID // Must satisfy this condition
        }
      ];
    }

    const totalStudents = await Student.countDocuments(query);

    const students = await Student.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      message: "Students data fetched successfully",
      data: students,
      pagination: {
        totalStudents,
        totalPages: Math.ceil(totalStudents / limitNumber),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching students data",
      error: error.message,
    });
  }
};

const getSingleStudent = async (req,res) => {
  try{
    const {id} = req.body;
    if(!id) return res.status(401).json({message:"The parameter is missing"});

    const student = await Student.findOne({_id:id,collegeId:req.user.collegeID});
    if(!student) return res.status(404).json({message:"Student not found"});

    return res.status(200).json({message:"Student found!", student:student});
  }catch(error){
    return res.status(500).json({message:"There is an server error!",error:error.message});
  }
}

module.exports = { getStudents,getSingleStudent };