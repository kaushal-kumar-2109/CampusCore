import {ROUTERS} from "../api.router.js";
import { fetchPostApi } from "../handler/fetch.post.js";


const verifyAdminSignupEmail = async (email) => {
    const data = {
        "adminEmail": email
    }
    const res = await fetchPostApi(data,ROUTERS.postRouter.signupEmailVerify);
    return res;
};

export { verifyAdminSignupEmail };