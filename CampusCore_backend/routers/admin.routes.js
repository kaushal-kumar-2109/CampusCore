const express = require("express");
const router = express.Router();

/* ******************** importing controller file start here ******************** */
const {createAdmin, adminLogin, verifyEmail_login, verifyEmail_signup} = require("../controllers/admin.controller.js");
const {getStudents, getSingleStudent } = require("../controllers/adminController/getData.controller.js");
/* ******************** importinf controller file end here ******************** */

/* ******************** importinf middleware file start here ******************** */
const {checkAuth} = require("../middleware/checkAuth.js");
/* ******************** importinf middleware file end here ******************** */


/* ******************** admin post routers start here ******************** */
router.route("/admin-signup").post(createAdmin);
router.route("/admin-login").post(adminLogin);
router.route("/verify-login-email").post(verifyEmail_login);
router.route("/verify-signup-email").post(verifyEmail_signup);
/* ******************** admin post routers ends here ******************** */


/* ******************** admin pages routers start here ******************** */
router.route("/admin-dashboard/students").post(checkAuth, getStudents);
router.route("/admin-dashboard/students-detail").post(checkAuth,getSingleStudent);
/* ******************** admin pages routers ends here ******************** */


module.exports = router;