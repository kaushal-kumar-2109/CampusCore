const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const Admin = require("../models/admin.model");

const checkAuth = async (req, res, next) => {
  try{
    console.log("Checking authentication...");
    const {token} = req.body;
    if(!token) return res.status(401).json({message: "Unauthorized access, token missing !",});

    const checkToken = await Token.findOne({token:token});
    if(!checkToken) return res.status(401).json({message: "Unauthorized access, invalid token !",});

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  
    const checkUser = await Admin.findOne({_id:decoded.id});
    if(!checkUser) return res.status(401).json({message: "Unauthorized access, invalid user !",});

    req.user = checkUser;
    next();
    
  }catch(error){
    return res.status(401).json({
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

module.exports = {checkAuth};