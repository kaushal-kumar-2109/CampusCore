const Admin = require("../models/admin.model");
const College = require("../models/college.model");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dotenv = require("dotenv");
var jwt = require('jsonwebtoken');

const getOtp = require("../utils/otpCreate.js");
const { sendOtpMail } = require("../handlers/emailVerification.js");
const Otp = require("../models/otp.model.js");

dotenv.config();


/* ******************** create admin controller start here ******************** */
const createAdmin = async (req,res) => {
    try{
        const {
            collegeName,collegeCode,collegeType,
            adminName,adminEmail,adminContactNumber,password,
            otp
        } = req.body;
        if(!collegeName || !collegeCode || !collegeType || !adminContactNumber || !adminName || !adminEmail || !password || !otp){
            return res.status(400).json({message:"All field are required"});
        }

        const college = await College.findOne({$or:[{"collegeCode":collegeCode},{"collegeName":collegeName}]});
        if(college) return res.status(400).json({tag:"collegeCode,collegeNane",message:"College allready in use"});

        const admin = await Admin.findOne({$or:[{"adminEmail":adminEmail},{"adminContactNumber":adminContactNumber}]});
        if(admin) return res.status(400).json({tag:"adminEmail,adminContactNumber",message:"User already exist"});

        const otpData = await Otp.findOne({adminEmail});
        if(!otpData) return res.status(404).json({tag:"otp", message:"Invalid or expired otp"});
        if(parseInt(otpData.otp) != parseInt(otp)) return res.status(400).json({tag:"otp",message:"Invaid otp"});

        const newCollege = new College({
            collegeName,collegeCode,collegeType
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
        const {adminEmail,password,otp} = req.body;
        if(!adminEmail || !password) return res.status(401).json({message:"All fields are required"});

        const admin = await Admin.findOne({adminEmail});
        if(!admin) return res.status(404).json({tag:"email",message:"User not found with this email"});

        const otpData = await Otp.findOne({adminEmail});
        if(!otpData) return res.status(404).json({messsage:"Invalid or expired otp"});
        if(parseInt(otpData.otp) != parseInt(otp)) return res.status(400).json({tag:"otp",message:"Invaid otp"});

        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch) return res.status(400).json({tag:"password", message:"Invalid password"});
        
        const token = jwt.sign(
            {
                id:admin._id,
                collegeId:admin.collegeID,
                authorize:admin.role
            }, 
            process.env.JWT_PRIVATE_KEY, 
            { 
                algorithm: process.env.JWT_ALGORITHUM,
                expiresIn: "7d"
            }
        );

        res.cookie("CampusCoreToken",token,{
            httpOnly: true,
            secure:false, // true when production with https
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        });

        await Admin.updateOne({_id:admin._id},{token});

        return res.status(200).json({message:"Admin loged in successfully",role:admin.role});
    }catch(err){
        return res.status(500).json({message:"Error in login user", error:err.message});
    }
}
/* ******************** admin login controller end here ******************** */


/* ******************** admin email verify for login controller start here ******************** */
const verifyEmail_login = async (req,res) => {
    try{
        const {adminEmail} = req.body;
        if(!adminEmail) return res.status(400).json({tag:"email",message:"Email is required"});

        const admin = await Admin.findOne({adminEmail});
        if(!admin) return res.status(404).json({tag:"email",message:"User not found with this email"});

        const otp = getOtp();
        const emailStatus = await sendOtpMail(adminEmail,otp);

        if(emailStatus.status == 200){
            const oldOTP = await Otp.findOne({adminEmail});
            if(oldOTP){
                await Otp.updateOne({adminEmail},{otp});
                return res.status(200).json({message:"Otp send successfully"});
            }

            const newOtp = new Otp({
                adminEmail,
                otp
            });
            await newOtp.save();
            return res.status(200).json({message:"Otp send successfully "});
        }
        return emailStatus;

    }catch(err){
        return res.status(500).json({message:"There is and error in sending mail",error:err.message});
    };
}
/* ******************** admin email verify for login controller end here ******************** */

/* ******************** admin email verify for signup controller start here ******************** */
const verifyEmail_signup = async (req,res) => {

    try{
        const {adminEmail} = req.body;
        if(!adminEmail) return res.status(400).json({tag:"email",message:"Email is required"});

        const admin = await Admin.findOne({adminEmail});
        if(admin) return res.status(400).json({tag:"email",message:"User found with this email"});

        const otp = getOtp();
        const emailStatus = await sendOtpMail(adminEmail,otp);

        if(emailStatus.status == 200){
            const oldOTP = await Otp.findOne({adminEmail});
            if(oldOTP){
                await Otp.updateOne({adminEmail},{otp});
                return res.status(200).json({message:"Otp send successfully"});
            }

            const newOtp = new Otp({
                adminEmail,
                otp
            });
            await newOtp.save();
            return res.status(200).json({message:"Otp send successfully "});
        }
        return emailStatus;

    }catch(err){
        return res.status(500).json({message:"There is and error in sending mail",error:err.message});
    };
}
/* ******************** admin email verify for signup controller end here ******************** */

module.exports = {createAdmin,adminLogin,verifyEmail_login,verifyEmail_signup};
