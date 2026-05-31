import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/landingPage";
import LoginRole from "../pages/auths/loginRole";
import AdminLogin from "../components/auth/adminLogin";
import AdminSignup from "../components/auth/adminSignup";
import StudentLogin from "../components/auth/studentLogin";
import StaffLogin from "../components/auth/staffLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login-role" element={<LoginRole />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
    </Routes>
  );
};

export default AppRoutes;