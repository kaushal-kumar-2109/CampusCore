import { UserStar, LibraryBig, Highlighter, GraduationCap, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import lineImage from "../../assets/lineGraph.png";
const Hero = () => {
  return (
    <section className="hero-section">
      {/* Left Side */}
      <div className="hero-content">
        <div className="hero-badge">
          AI-Powered Campus Management Platform
        </div>

        <h1>
          Simplify Campus.
          <br />
          <span>Elevate Education.</span>
        </h1>

        <p>
          CampusCore helps schools, colleges, and universities manage
          students, staff, attendance, fees, exams, library, and academic
          operations — all in one smart platform.
        </p>

        <div className="hero-buttons">
          
          <Link to="/login-role" className="primary-btn">
            Get Started Free
          </Link>
       
          {/* <button className="secondary-btn">
            Book Demo
          </button> */}
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <h3>10K+</h3>
            <p>Active Students</p>
          </div>

          <div className="hero-stat-card">
            <h3>500+</h3>
            <p>Institutions</p>
          </div>

          <div className="hero-stat-card">
            <h3>20+</h3>
            <p>Modules</p>
          </div>

          <div className="hero-stat-card">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hero-image-section">
        <div className="dashboard-preview">
          <div className="dashboard-sidebar"></div>

          <div className="dashboard-main">
            <div className="dashboard-top"></div>

            <div className="dashboard-cards">
              <div className="mini-card"><UserStar size={60}/></div>
              <div className="mini-card"><GraduationCap size={60}/></div>
              <div className="mini-card"><LibraryBig size={60}/></div>
              <div className="mini-card"><Highlighter size={60}/></div>
            </div>

            <div className="graph-section"><img src={lineImage} className="graph-section-image"/></div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;