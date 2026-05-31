import {
  ShieldCheck,
  BrainCircuit,
  Smartphone,
  Cloud,
} from "lucide-react";
import { Link } from "react-router-dom";

const WhyChoose = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: "Enterprise-Level Security",
      desc: "Your institutional data is protected with advanced security and role-based access.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Automation",
      desc: "Automate attendance, reports, notifications, and academic workflows intelligently.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly Platform",
      desc: "Access CampusCore seamlessly from desktop, tablet, or mobile devices.",
    },
    {
      icon: Cloud,
      title: "Cloud-Based Infrastructure",
      desc: "Fast, scalable, and accessible anywhere with secure cloud deployment.",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-left">
        <span>WHY CAMPUSCORE</span>

        <h2>
          Built For Modern
          <br />
          Educational Institutions
        </h2>

        <p>
          CampusCore is designed to simplify administration,
          improve academic workflows, and provide a seamless
          digital experience for students, staff, and management.
        </p>

        <Link to="/login-role" className="primary-btn">
          Explore Platform
        </Link>
      </div>

      <div className="why-right">
        {points.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="why-card" key={index}>
              <div className="why-icon">
                <Icon size={24} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChoose;