import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/landingPage";
import LoginRole from "../pages/auths/loginRole";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login-role" element={<LoginRole />} />
    </Routes>
  );
};

export default AppRoutes;