import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentHandle from "../pages/admin/StudentHandle";
import TeacherHandle from "../pages/admin/TeacherHandle";
import DepartmentHandle from "../pages/admin/DepartmentHandle";
import CoursesHandle from "../pages/admin/CoursesHandle";
import AttendanceHandle from "../pages/admin/AttendanceHandle";
import ExamsHandle from "../pages/admin/ExamsHandle";
import EventsHandle from "../pages/admin/EventsHandle";
import NoticeHandle from "../pages/admin/NoticeHandle";
import FeesHandle from "../pages/admin/FeesHandle";
import SettingsHandle from "../pages/admin/SettingsHandle";

const AdminRoutes = () => {
  return (
    <Routes>

      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/students" element={<StudentHandle />} />
      <Route path="/teachers" element={<TeacherHandle />} />
      <Route path="/departments" element={<DepartmentHandle /> } /> 
      <Route path="/courses" element={<CoursesHandle />} />
      <Route path="/attendance" element={<AttendanceHandle />} />
      <Route path="/exams" element={<ExamsHandle />} />
      <Route path="/events" element={<EventsHandle />} />
      <Route path="/notices" element={<NoticeHandle />} />
      <Route path="/fees" element={<FeesHandle />} />
      <Route path="/settings" element={<SettingsHandle />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
      
    </Routes>
  );
};

export default AdminRoutes;