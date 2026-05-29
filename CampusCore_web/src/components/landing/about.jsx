
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about2.png";
import about3 from "../../assets/about3.png";

const About = () => {
  return (
    <section className="about-section" id="about">
      
      <div className="about-right">
        <div className="about-card large"> <img src={about1} className="about-card-image" /></div>

        <div className="about-small-grid">
          <div className="about-card"><img src={about2} className="about-card-image" /></div>
          <div className="about-card"><img src={about3} className="about-card-image" /></div>
        </div>
      </div>

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

    </section>
  );
};

export default About;