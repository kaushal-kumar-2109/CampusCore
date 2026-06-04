import {authFetchGetApi} from "../handler/authData.get.js";
import API from "../apiConnect.js";

const getStudentsData = async () => {
    console.log(`Request go to api => ${API.ADMIN_MANAGEMENT.getStudentsData}`);
    const res = await authFetchGetApi(API.ADMIN_MANAGEMENT.getStudentsData);
    return res;
}

export {getStudentsData};