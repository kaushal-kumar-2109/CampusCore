import {ROUTERS} from "../api.router.js";
import { fetchPostApi } from "../handler/fetch.post.js";


const verifyAdminSignupEmail = async (email) => {
    const data = {
        adminEmail: email
    };
    const res = await fetchPostApi(data,ROUTERS.postRouter.signupEmailVerify);
    return res;
};

const creteAdminAccount = async (data) => {
    const res = await fetchPostApi(data,ROUTERS.postRouter.adminSignup);
    return res;
}

const verifyAdminLoginEmail = async (email) => {
    const data = {
        adminEmail: email
    };
    const res = await fetchPostApi(data,ROUTERS.postRouter.loginEmailVerify);
    return res;
}

const adminLoginAccount = async (data) => {
    const res = await fetchPostApi(data,ROUTERS.postRouter.userLogin);
    return res;
}

export { verifyAdminSignupEmail, creteAdminAccount, verifyAdminLoginEmail, adminLoginAccount };