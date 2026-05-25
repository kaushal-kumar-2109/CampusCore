const MAIN_API_PATH = "http://192.168.1.18:3000/CampusCore";

const ROUTERS = {
    getRouter: {
    },
    postRouter: {
        adminSignup: `${MAIN_API_PATH}/admin-signup`,
        userLogin: `${MAIN_API_PATH}/admin-login`,
        signupEmailVerify: `${MAIN_API_PATH}/verify-signup-email`,
        loginEmailVerify: `${MAIN_API_PATH}/verify-login-email`
    }
};

export {ROUTERS};