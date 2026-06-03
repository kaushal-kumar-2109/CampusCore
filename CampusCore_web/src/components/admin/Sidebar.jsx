import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  CalendarCheck,
  FileText,
  ClipboardList,
  CalendarDays,
  Bell,
  Library,
  Home,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: Users },
    { name: "Teachers", path: "/admin/teachers", icon: GraduationCap },
    { name: "Departments", path: "/admin/departments", icon: Building2 },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Attendance", path: "/admin/attendance", icon: CalendarCheck },
    { name: "Exams", path: "/admin/exams", icon: FileText },
    { name: "Assignments", path: "/admin/assignments", icon: ClipboardList },
    { name: "Events", path: "/admin/events", icon: CalendarDays },
    { name: "Notices", path: "/admin/notices", icon: Bell },
    { name: "Library", path: "/admin/library", icon: Library },
    { name: "Hostel", path: "/admin/hostel", icon: Home },
    { name: "Fees & Payments", path: "/admin/fees", icon: Wallet },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      <div
        className={isOpen ? "admin-overlay show" : "admin-overlay"}
        onClick={closeSidebar}
      ></div>

      <aside className={isOpen ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="sidebar-header">
          <div className="sidebar-logo-box">
            <GraduationCap size={26} />
          </div>

          <h2>CampusCore</h2>

          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                onClick={closeSidebar}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-upgrade-box">
          <h3>Upgrade to Pro</h3>
          <p>Unlock premium features and advanced analytics.</p>
          <button>Upgrade Now</button>
        </div>

        <button className="sidebar-logout-btn">
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;