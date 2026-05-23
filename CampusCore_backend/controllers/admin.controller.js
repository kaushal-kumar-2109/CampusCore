const Admin = require("../models/admin.model");
const College = require("../models/college.model");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dotenv = require("dotenv");
var jwt = require('jsonwebtoken');

dotenv.config();


/* ******************** create admin controller start here ******************** */
const createAdmin = async (req,res) => {
    try{
        const {
            collegeName,collegeCode,collegeType,collegeEmail,
            collegeContactNumber,
            adminName,adminEmail,adminContactNumber,password
        } = req.body;
        if(!collegeName || !collegeCode || !collegeType || !collegeEmail || !collegeContactNumber || !adminContactNumber || !adminName || !adminEmail || !password){
            return res.status(400).json({message:"All field are required"});
        }

        const college = await College.findOne({$or:[{"collegeCode":collegeCode},{"collegeName":collegeName}]});
        if(college) return res.status(400).json({tag:"collegeCode,collegeNane",message:"College allready in use"});

        const admin = await Admin.findOne({$or:[{"adminEmail":adminEmail},{"adminContactNumber":adminContactNumber}]});
        if(admin) return res.status(400).json({tag:"adminEmail,adminContactNumber",message:"User already exist"});

        const newCollege = new College({
            collegeName,collegeCode,collegeType,collegeEmail,collegeContactNumber
        });
        await newCollege.save();
        const createdCollege = await College.findOne({collegeCode});

        const hashedPassword = await bcrypt.hash(password,10);
        const newAdmin = new Admin({
            adminName,adminEmail,adminContactNumber,password:hashedPassword,collegeID:createdCollege._id
        });
        await newAdmin.save();

        return res.status(200).json({message:"Admin created successfully"});
    }catch(err){
        return res.status(500).json({message:"Error in creating admin",error:err.message});
    }
}
/* ******************** create admin controller end here ******************** */


/* ******************** admin login controller start here ******************** */
const adminLogin = async (req,res) => {
    try{
        const {adminEmail,password} = req.body;
        if(!adminEmail || !password) return res.status(401).json({message:"All fields are required"});

        const admin = await Admin.findOne({adminEmail});
        if(!admin) return res.status(404).json({tag:"email",message:"User not found with this email"});

        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch) return res.status(400).json({tag:"password", message:"Invalid password"});
        
        const token = jwt.sign(
            {
                id:admin._id,
                collegeId:admin.collegeID,
                authorize:"college_admin"
            }, 
            process.env.JWT_PRIVATE_KEY, 
            { algorithm: process.env.JWT_ALGORITHUM }
        );
        await Admin.updateOne({_id:admin._id},{token});
        return res.status(200).json({message:"Admin loged in successfully",token:token});
    }catch(err){
        return res.status(500).json({message:"Error in login user", error:err.message});
    }
}
/* ******************** admin login controller end here ******************** */

module.exports = {createAdmin,adminLogin};
