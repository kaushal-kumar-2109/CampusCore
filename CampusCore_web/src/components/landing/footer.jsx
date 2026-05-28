import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">
              <GraduationCap size={22} />
            </div>
            <span>CampusCore</span>
          </div>

          <p>
            A smart campus management platform for schools, colleges,
            universities, students, staff, and administrators.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            <a href="#pricing">Pricing</a>
            <a href="#demo">Book Demo</a>
          </div>

          <div>
            <h4>Users</h4>
            <a href="/admin-login">Admin Login</a>
            <a href="/staff-login">Staff Login</a>
            <a href="/student-login">Student Login</a>
            <a href="/login-role">Get Started</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 CampusCore. All rights reserved.</p>
        <p>Designed for modern educational institutions.</p>
      </div>
    </footer>
  );
};

export default Footer;