import React from "react";
import "../styles/experience.css";

function Experience() {
  const experiences = [
    {
      title: "Co-Founder",
      company: "Scrap Shera",
      period: "Jun 2023 - Present",
      description:
        "Helped grow Scrap Shera by creating customer-focused strategies, boosting engagement by 30% (estimated). Loved guiding my team to meet client expectations!",
    },
    {
      title: "Co-Founder",
      company: "Vorette Indica pvt ltd company",
      period: "Sep 2019 - Mar 2020",
      description:
        "The basic model and feature of startup was to provide food essentials and groceries to the households while not burning cash in conventional delivery model.",
    },
    {
      title: "Proprietor",
      company: "Avani Enterprises",
      period: "Nov 2021 - Present",
      description:
        "Managed Avani Enterprises with a focus on helping startups, growing client revenue by 25% (estimated) through consultation. Enjoyed experimenting with podcast ideas to boost brands!",
    },
    {
      title: "Sales Consultant",
      company: "Urban Company",
      period: "Apr 2021 - Nov 2021",
      description:
        "As per the opportunity provided by the Urban Company to be a duly registered service professional on the Urban Company platform and being a representative of the company directly with the customer base.",
    },
    {
      title: "Assistant Project Manager",
      company: "MRS Institute",
      period: "Jul 2017 - Aug 2019",
      description:
        "Coordinated teamwork efforts for brand strategy formulation and new business development, focusing on unified brand messaging and market opportunities.",
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <h3 className="section-label">KAPIL KHANDELWAL / JOURNEY</h3>
        <h1 className="section-title">PROFESSIONAL EXPERIENCE</h1>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h2>{exp.title}</h2>
                <h3>{exp.company}</h3>
                <span className="period">{exp.period}</span>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
