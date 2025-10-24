import React from "react";
import "../styles/projects.css";

function Projects() {
  const projects = [
    {
      title: "Business Podcast Series",
      description:
        "Comprehensive podcast series helping startups with growth strategies and founder stories. Featured interviews with successful entrepreneurs.",
      video: "/videos/project1.mp4", // Replace with your actual video
    },
    {
      title: "Startup Consultation",
      description:
        "Digital platform connecting startups with business consultants for personalized guidance and strategic growth planning.",
      video: "/videos/project2.mp4", // Replace with your actual video
    },
    {
      title: "Founder Branding",
      description:
        "Complete personal branding package for business leaders including content strategy and market presence enhancement.",
      video: "/videos/project3.mp4", // Replace with your actual video
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h3 className="section-label">KAPIL KHANDELWAL / PROJECTS</h3>
        <h1 className="section-title">FEATURED WORK</h1>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {/* Header - White Background */}
              <div className="project-header">
                <h2>{project.title}</h2>
              </div>

              {/* Video - Auto-playing Muted */}
              <div className="video-container">
                <video
                  className="project-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Live Status Indicator */}
                {/* <div className="video-status">
                  <div className="status-dot"></div>
                  <span>LIVE DEMO</span>
                </div> */}
              </div>

              {/* Footer - Description Only */}
              <div className="project-footer">
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
