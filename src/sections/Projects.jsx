import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import "../styles/projects.css";

function Projects() { // CHANGED: Renamed from EnhancedProjects to Projects
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
          perspective: 1000,
        }}
      >
        <motion.div
          className="project-card-inner"
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setFlippedCard(isFlipped ? null : index)}
          whileHover={{ scale: isFlipped ? 1 : 1.02 }}
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

      <style jsx>{`
        .project-card-3d {
          height: 450px;
          perspective: 1000px;
          cursor: pointer;
        }

        .project-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .project-card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          overflow: hidden;
        }

        .project-card-front {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
        }

        .project-card-back {
          background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
          border: 1px solid var(--accent-primary);
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .flip-hint {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.8);
          color: var(--accent-tertiary);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .stats-container {
          width: 100%;
          text-align: center;
        }

        .stats-container h3 {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          color: var(--accent-secondary);
          margin-bottom: 30px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-item {
          background: var(--bg-primary);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--accent-primary);
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--accent-secondary);
          font-family: "Playfair Display", serif;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .back-button {
          background: var(--gradient-primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card-3d {
            max-width: 400px;
            margin: 0 auto;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
          .project-card-inner {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Projects; // CHANGED: Now exporting Projects