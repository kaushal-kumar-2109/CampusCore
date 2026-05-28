const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-left">
        <span>ABOUT CAMPUSCORE</span>

        <h2>
          Transforming Traditional
          <br />
          Campuses Into Smart Campuses
        </h2>

        <p>
          CampusCore is an AI-powered campus management platform designed
          to simplify administration, improve communication, and automate
          educational workflows for schools, colleges, and universities.
        </p>

        <p>
          From admissions and attendance to examinations and analytics,
          CampusCore centralizes everything into one secure ecosystem.
        </p>
      </div>

      <div className="about-right">
        <div className="about-card large"></div>

        <div className="about-small-grid">
          <div className="about-card"></div>
          <div className="about-card"></div>
        </div>
      </div>
    </section>
  );
};

export default About;