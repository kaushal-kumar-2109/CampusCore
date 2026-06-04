const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

const checkAuth = async (req, res, next) => {
  console.log(req.cookies);
  console.log("checkAuth middleware called");
  try {
    const token = req.cookies.CampusCoreToken;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const tokenExists = await Token.findOne({token});
    if (!tokenExists) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = {checkAuth};