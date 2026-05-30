import { Link } from "react-router-dom";
import { ShieldUser, BriefcaseBusiness, GraduationCap } from "lucide-react";
import "../../styles/auth/auth.css";

const LoginRole = () => {
  const roles = [
    {
      title: "Admin",
      desc: "Manage institution, staff, students, fees and reports.",
      icon: ShieldUser,
      path: "/admin/login",
      className: "admin-role",
    },
    {
      title: "Staff",
      desc: "Manage classes, attendance, exams and student records.",
      icon: BriefcaseBusiness,
      path: "/staff/login",
      className: "staff-role",
    },
    {
      title: "Student",
      desc: "Access attendance, exams, fees, notices and profile.",
      icon: GraduationCap,
      path: "/student/login",
      className: "student-role",
    },
  ];

  return (
    <main className="auth-role-page">
      <Link to="/" className="auth-logo">
        <GraduationCap size={24} />
        <span>CampusCore</span>
      </Link>

      <section className="role-wrapper">
        <div className="role-header">
          <h1>Welcome to CampusCore</h1>
          <p>Select your role to continue</p>
        </div>

        <div className="role-grid">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Link to={role.path} className="role-card" key={role.title}>
                <div className={`role-icon ${role.className}`}>
                  <Icon size={32} />
                </div>

                <h3>{role.title}</h3>
                <p>{role.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default LoginRole;