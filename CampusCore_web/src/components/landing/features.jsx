import {
  Users,
  GraduationCap,
  ClipboardCheck,
  Wallet,
  Library,
  BarChart3,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      desc: "Manage admissions, profiles, attendance, and academic records.",
    },
    {
      icon: GraduationCap,
      title: "Academic Management",
      desc: "Handle courses, departments, faculty, and class schedules.",
    },
    {
      icon: ClipboardCheck,
      title: "Exams & Results",
      desc: "Create exams, publish results, and monitor student performance.",
    },
    {
      icon: Wallet,
      title: "Fees & Payments",
      desc: "Track fee payments, pending dues, and transaction history.",
    },
    {
      icon: Library,
      title: "Library Management",
      desc: "Manage books, issue records, and student library activity.",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      desc: "Get real-time reports and institutional performance insights.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <span>FEATURES</span>

        <h2>Everything You Need, All In One Platform</h2>

        <p>
          Powerful modules to streamline every aspect of campus management.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <Icon size={28} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;