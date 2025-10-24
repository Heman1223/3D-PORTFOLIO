import React from "react";
import "../styles/about.css";

function About() {
  const achievements = [
    { number: "7L+", label: "Business Consultations" },
    { number: "40%", label: "Engagement Boost" },
    { number: "25%", label: "Revenue Growth" },
    { number: "6+", label: "Years Experience" },
  ];

  const experiences = [
    {
      icon: "🏢",
      title: "Avani Enterprises",
      description: "3+ years of business consulting and startup guidance",
    },
    {
      icon: "♻️",
      title: "Scrap Shera",
      description: "Strategic role in business development and operations",
    },
    {
      icon: "🚀",
      title: "Startup Consulting",
      description: "Working with diverse startups since 2017",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="about-wrapper">
        {/* Header Section */}
        <div className="about-header">
          <h3 className="section-label">ABOUT / KP KHANDELWAL</h3>
          <h1 className="section-title">Startup Growth Consultant</h1>
          <p className="about-intro">
            Hi, I'm KP Khandelwal! I help startups and business leaders grow
            through podcast promotion and strategic consultation. With extensive
            experience at Avani Enterprises and Scrap Shera, I've mastered what
            truly works for entrepreneurs.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="achievement-stats">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <span className="achievement-number">{achievement.number}</span>
              <span className="achievement-label">{achievement.label}</span>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="about-content">
          <div className="content-left">
            <h2>My Journey</h2>

            <div className="experience-highlights">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-icon">{exp.icon}</div>
                  <div className="experience-content">
                    <h4>{exp.title}</h4>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-right">
            {/* Book Highlight */}
            <div className="highlight-box">
              <h3>Author: "The Startup Summary"</h3>
              <p>
                Sharing knowledge and insights to support small businesses and
                entrepreneurs in their growth journey. Passionate about
                empowering founders with practical strategies.
              </p>
            </div>

            {/* Success Stories - Same styling as book highlight */}
            <div className="highlight-box">
              <h3>Proven Results</h3>
              <p>
                Created podcasts that boosted engagement by 40% for startup
                clients through strategic content and audience targeting.
                Delivered consultation that increased client revenue by 25% with
                simple, actionable strategies.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <p className="cta-text">
            Passionate about founder branding and digital marketing to tell your
            unique story.
          </p>
          {/* <p className="cta-text">
            <strong>
              Let's connect—I'd love to chat about your podcast or growth goals!
            </strong>
          </p> */}
        </div>
      </div>
    </section>
  );
}

export default About;
