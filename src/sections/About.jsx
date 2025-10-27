import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Briefcase, TrendingUp, DollarSign, Award, Building2, Recycle, Rocket, BookOpen, Target } from 'lucide-react';
import "../styles/about.css";

function About() {
  const [activeExp, setActiveExp] = useState(0);
  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const achievements = [
    { number: 7, suffix: "L+", label: "Business Consultations", Icon: Briefcase, color: "#4A90E2" },
    { number: 40, suffix: "%", label: "Engagement Boost", Icon: TrendingUp, color: "#50C878" },
    { number: 25, suffix: "%", label: "Revenue Growth", Icon: DollarSign, color: "#FFD700" },
    { number: 6, suffix: "+", label: "Years Experience", Icon: Award, color: "#FF6B6B" },
  ];

  const experiences = [
    {
      Icon: Building2,
      title: "Avani Enterprises",
      description: "3+ years of business consulting and startup guidance",
      details: "Led strategic initiatives for 50+ startups, focusing on growth hacking and market positioning."
    },
    {
      Icon: Recycle,
      title: "Scrap Shera",
      description: "Strategic role in business development and operations",
      details: "Revolutionized business model, achieving 30% engagement increase through customer-centric strategies."
    },
    {
      Icon: Rocket,
      title: "Startup Consulting",
      description: "Working with diverse startups since 2017",
      details: "Mentored founders across tech, e-commerce, and service industries with proven frameworks."
    },
  ];

  const cardVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    })
  };

  const experienceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
      }
    })
  };

  const highlightVariants = {
    hidden: { opacity: 0, rotateY: -20, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
      }
    })
  };

  return (
    <section id="about" className="about">
      <div className="about-wrapper">
        {/* Animated Header Section */}
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="section-label"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ABOUT / KP KHANDELWAL
          </motion.h3>
          
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Startup Growth Consultant
          </motion.h1>
          
          <motion.p 
            className="about-intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Hi, I'm KP Khandelwal! I help startups and business leaders grow
            through podcast promotion and strategic consultation. With extensive
            experience at Avani Enterprises and Scrap Shera, I've mastered what
            truly works for entrepreneurs.
          </motion.p>
        </motion.div>

        {/* Enhanced Achievement Stats with CountUp */}
        <div className="achievement-stats" ref={statsRef}>
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.Icon;
            return (
              <motion.div
                key={index}
                className="achievement-card"
                custom={index}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Professional Icon with Gradient Background */}
                <motion.div
                  className="achievement-icon-wrapper"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={statsInView ? { scale: [0, 1.2, 1], rotate: 0 } : { scale: 0 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                >
                  <IconComponent size={40} color="white" strokeWidth={2} />
                </motion.div>

                {/* CountUp Number */}
                <motion.div 
                  className="achievement-number-wrapper"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                >
                  <span className="achievement-number">
                    {statsInView && (
                      <CountUp
                        end={achievement.number}
                        duration={2.5}
                        delay={index * 0.15}
                        suffix={achievement.suffix}
                      />
                    )}
                  </span>
                </motion.div>

                <motion.span 
                  className="achievement-label"
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.15 + 0.7 }}
                >
                  {achievement.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Two Column Layout with Enhanced Animations */}
        <div className="about-content">
          <motion.div 
            className="content-left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              My Journey
            </motion.h2>

            <div className="experience-highlights">
              {experiences.map((exp, index) => {
                const IconComponent = exp.Icon;
                return (
                  <motion.div
                    key={index}
                    className={`experience-item ${activeExp === index ? 'active' : ''}`}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={experienceVariants}
                    onMouseEnter={() => setActiveExp(index)}
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="experience-icon"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.15,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent size={24} color="white" strokeWidth={2} />
                    </motion.div>
                    
                    <div className="experience-content">
                      <h4>{exp.title}</h4>
                      <p>{exp.description}</p>
                      
                      {/* Expandable Details */}
                      <motion.div
                        className="experience-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={activeExp === index ? { 
                          height: "auto", 
                          opacity: 1,
                          marginTop: 8,
                        } : { 
                          height: 0, 
                          opacity: 0,
                          marginTop: 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {exp.details}
                      </motion.div>
                    </div>

                    {/* Active Indicator */}
                    <motion.div
                      className="experience-indicator"
                      initial={{ scaleY: 0 }}
                      animate={activeExp === index ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            className="content-right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Enhanced Book Highlight */}
            <motion.div 
              className="highlight-box"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={highlightVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
            >
              <motion.div
                className="highlight-icon-wrapper"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <BookOpen size={36} color="white" strokeWidth={2} />
              </motion.div>
              
              <h3>Author: "The Startup Summary"</h3>
              <p>
                Sharing knowledge and insights to support small businesses and
                entrepreneurs in their growth journey. Passionate about
                empowering founders with practical strategies.
              </p>

              {/* Decorative Corner */}
              <motion.div 
                className="corner-decoration"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Enhanced Success Stories */}
            <motion.div 
              className="highlight-box"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={highlightVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
            >
              <motion.div
                className="highlight-icon-wrapper"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Target size={36} color="white" strokeWidth={2} />
              </motion.div>
              
              <h3>Proven Results</h3>
              <p>
                Created podcasts that boosted engagement by 40% for startup
                clients through strategic content and audience targeting.
                Delivered consultation that increased client revenue by 25% with
                simple, actionable strategies.
              </p>

              {/* Decorative Corner */}
              <motion.div 
                className="corner-decoration"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated CTA Section */}
        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="cta-icon-wrapper"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Award size={40} color="white" strokeWidth={2} />
          </motion.div>
          
          <p className="cta-text">
            Passionate about founder branding and digital marketing to tell your
            unique story.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;