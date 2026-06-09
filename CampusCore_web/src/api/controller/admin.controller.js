import { authFetchGetApi } from "../handler/authData.get.js";
import API from "../apiConnect.js";

const getStudentsData = async (filters) => {
  const res = await authFetchGetApi(filters,API.ADMIN_MANAGEMENT.getStudentsData);
  return res;
};

const getSingleStudentData = async(data) => {
  const res = await authFetchGetApi(data,API.ADMIN_MANAGEMENT.getSingleStudent);
  return res;
}


export { getStudentsData,getSingleStudentData };