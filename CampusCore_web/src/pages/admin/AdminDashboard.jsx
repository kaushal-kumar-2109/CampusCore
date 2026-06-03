import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import TopNavbar from "../../components/admin/TopNavbar";

import "../../styles/admin/admin.css";
import "../../styles/theam.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="admin-main">
        <TopNavbar
          title={"Dashboard"}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <section className="admin-page-content"></section>
      </main>
    </div>
  );
};

export default AdminDashboard;