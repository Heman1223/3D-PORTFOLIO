import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import "../styles/projects.css";

function Projects() {
  const [flippedCard, setFlippedCard] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const projects = [
    {
      title: "Business Podcast Series",
      description:
        "Comprehensive podcast series helping startups with growth strategies and founder stories. Featured interviews with successful entrepreneurs.",
      video: "/videos/project1.mp4",
      stats: {
        episodes: "50+",
        downloads: "100K+",
        rating: "4.8/5",
      }
    },
    {
      title: "Startup Consultation",
      description:
        "Digital platform connecting startups with business consultants for personalized guidance and strategic growth planning.",
      video: "/videos/project2.mp4",
      stats: {
        clients: "200+",
        growth: "40%",
        satisfaction: "95%",
      }
    },
    {
      title: "Founder Branding",
      description:
        "Complete personal branding package for business leaders including content strategy and market presence enhancement.",
      video: "/videos/project3.mp4",
      stats: {
        brands: "75+",
        engagement: "+60%",
        reach: "500K+",
      }
    },
  ];

  const ProjectCard = ({ project, index }) => {
    const [cardRef, cardInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e) => {
      if (flippedCard === index) return;
      if (window.innerWidth <= 768) return; // Disable on mobile
      
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const isFlipped = flippedCard === index;

    return (
      <motion.div
        ref={cardRef}
        className="project-card-3d"
        initial={{ opacity: 0, y: 100, rotateX: -20 }}
        animate={cardInView ? { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
        } : {}}
        transition={{ 
          delay: index * 0.15,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        style={{
          perspective: window.innerWidth > 768 ? 1000 : 'none',
        }}
      >
        <motion.div
          className="project-card-inner"
          style={{
            rotateX: window.innerWidth > 768 && !isFlipped ? rotateX : 0,
            rotateY: window.innerWidth > 768 ? (isFlipped ? 180 : rotateY) : 0,
            transformStyle: window.innerWidth > 768 ? "preserve-3d" : "flat",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setFlippedCard(isFlipped ? null : index)}
          whileHover={window.innerWidth > 768 ? { scale: isFlipped ? 1 : 1.02 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Front of card */}
          <div className="project-card-face project-card-front">
            <div className="project-header">
              <h2>{project.title}</h2>
            </div>

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

              <motion.div 
                className="flip-hint"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Click to flip →
              </motion.div>
            </div>

            <div className="project-footer">
              <p className="project-description">{project.description}</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="project-card-face project-card-back">
            <motion.div
              className="stats-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Project Impact</h3>
              
              <div className="stats-grid">
                {Object.entries(project.stats).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    className="stat-item"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isFlipped ? { 
                      scale: 1, 
                      rotate: 0,
                    } : {}}
                    transition={{ 
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div 
                      className="stat-value"
                      animate={isFlipped ? {
                        textShadow: [
                          "0 0 10px rgba(74, 144, 226, 0)",
                          "0 0 20px rgba(74, 144, 226, 0.8)",
                          "0 0 10px rgba(74, 144, 226, 0)",
                        ],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      {value}
                    </motion.div>
                    <div className="stat-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="back-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlippedCard(null);
                }}
              >
                ← Back to Project
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="section-label">KAPIL KHANDELWAL / PROJECTS</h3>
          <h1 className="section-title">FEATURED WORK</h1>
        </motion.div>

        <div className="projects-grid" ref={ref}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;