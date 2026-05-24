const express = require("express");
const router = express.Router();

/* ******************** importing controller file start here ******************** */
const {createAdmin, adminLogin, verifyEmail} = require("../controllers/admin.controller.js");
/* ******************** importinf controller file end here ******************** */


/* ******************** admin post routers start here ******************** */
router.route("/admin-signup").post(createAdmin);
router.route("/admin-login").post(adminLogin);
router.route("/verify-email").post(verifyEmail);
/* ******************** admin post routers ends here ******************** */


module.exports = router;