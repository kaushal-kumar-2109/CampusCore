const API_SUB_PATH = "http://192.168.1.18:3000";
const COMMON_PATH = "/CampusCore";

const API_PATH = `${API_SUB_PATH}${COMMON_PATH}`;

const API = {
    ROLE_SETUP : {
        adminLoginEmailVerify:`${API_PATH}/verify-login-email`,
        adminSignupEmailVerify:`${API_PATH}/verify-signup-email`,
        adminLogin:`${API_PATH}/admin-login`,
        adminSignup:`${API_PATH}/admin-signup`
    }
}

export default API;