const MAIN_API_PATH = "http://192.168.1.18:3000//CampusCore";

ROUTERS = {
    getRouter: {
    },
    postRouter: {
        adminSignup: `${MAIN_API_PATH}/admin-signup`,
        userLogin: `${MAIN_API_PATH}/admin-login`,
    }
};

export {ROUTERS};