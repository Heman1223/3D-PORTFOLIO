import React from "react";
import "../styles/skills.css";

function Skills() {
  const businessSkills = [
    {
      title: "Business Consulting",
      // icon: "💼",
      description:
        "Strategic business advice and comprehensive growth planning to drive sustainable success.",
      // level: "Expert",
    },
    {
      title: "Startup Marketing",
      // icon: "🎪",
      description:
        "Targeted marketing strategies and brand positioning for startup growth and market penetration.",
      // level: "Expert",
    },
    {
      title: "Founder Branding",
      // icon: "👑",
      description:
        "Personal branding development for business leaders to enhance credibility and influence.",
      // level: "Expert",
    },
    {
      title: "Digital Marketing",
      // icon: "📱",
      description:
        "Modern digital marketing campaigns to maximize online presence and customer engagement.",
      // level: "Advanced",
    },
    {
      title: "Project Management",
      // icon: "📊",
      description:
        "Efficient project planning, execution, and team leadership for successful delivery.",
      // level: "Expert",
    },
    {
      title: "Business Strategy",
      // icon: "🎯",
      description:
        "Comprehensive strategic planning and business development for long-term growth.",
      // level: "Expert",
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h3 className="section-label">KAPIL KHANDELWAL / EXPERTISE</h3>
          <h1 className="section-title">BUSINESS EXPERTISE</h1>
          <p className="skills-description">
            With over a decade of experience in business transformation and
            startup consulting, I bring strategic insights and practical
            solutions to drive your business forward.
          </p>
        </div>

        {/* Uniform Skills Grid */}
        <div className="skills-grid">
          {businessSkills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <span className="skill-level">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
