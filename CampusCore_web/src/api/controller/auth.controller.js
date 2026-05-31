import API from "../apiConnect";
import { fetchPostApi } from "../handler/fetch.post";

const VerifyAdminLoginEmail = async (data) => {
    console.log(`Request go to api => ${API.ROLE_SETUP.adminLoginEmailVerify}`);
    const res = await fetchPostApi(data,API.ROLE_SETUP.adminLoginEmailVerify);
    return res;
}

const AdminRoleLogin = async (data) =>{
    console.log(`Request go to api => ${API.ROLE_SETUP.adminLogin}`);
    const res = await fetchPostApi(data,API.ROLE_SETUP.adminLogin);
    return res;
}

export { VerifyAdminLoginEmail, AdminRoleLogin };