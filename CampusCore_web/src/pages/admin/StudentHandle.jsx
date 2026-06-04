import { useState,useEffect } from "react";

import Sidebar from "../../components/admin/Sidebar";
import TopNavbar from "../../components/admin/TopNavbar";
import StudentAnalysis from "../../components/admin/studentManagement/analysis";

import {getStudentsData} from "../../api/controller/admin.controller.js";

import "../../styles/admin/admin.css";
import "../../styles/theam.css";

const StudentHandle = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getAllStudentsData = async () => {
    await getStudentsData();
  }

  useEffect(()=>{
    getAllStudentsData();
  },[]);
  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="admin-main">
        <TopNavbar
          title={"Student Management"}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <section className="admin-page-content">
          <StudentAnalysis />
        </section>
      </main>
    </div>
  );
};

export default StudentHandle;