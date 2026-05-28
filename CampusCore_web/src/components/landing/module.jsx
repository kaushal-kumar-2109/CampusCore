const Modules = () => {
  const modules = [
    "Student Management",
    "Attendance Tracking",
    "Examination System",
    "Fee Management",
    "Staff Management",
    "Library Management",
    "Transport System",
    "Hostel Management",
    "AI Analytics",
    "Notice & Events",
    "Parent Portal",
    "Timetable Management",
  ];

  return (
    <section className="modules-section" id="modules">
      <div className="section-header">
        <span>MODULES</span>

        <h2>Complete Campus Ecosystem</h2>

        <p>
          Powerful integrated modules designed for modern educational institutions.
        </p>
      </div>

      <div className="modules-grid">
        {modules.map((module, index) => (
          <div className="module-card" key={index}>
            {module}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Modules;