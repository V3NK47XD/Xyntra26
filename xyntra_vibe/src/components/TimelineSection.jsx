import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from "lucide-react";
import "./TimelineSection.css";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { date: "Jan 15, 2025", title: "Registration Opens", description: "Start your journey" },
  { date: "Feb 10, 2025", title: "Team Formation Deadline", description: "Form your dream team" },
  { date: "Feb 20, 2025", title: "Idea Submission", description: "Submit your innovative ideas" },
  { date: "Mar 5, 2025", title: "Shortlisting Results", description: "Selected teams announced" },
  { date: "Mar 15, 2025", title: "Hackathon Begins", description: "Let the coding begin" },
  { date: "Mar 16, 2025", title: "Mid-Event Check", description: "Progress evaluation" },
  { date: "Mar 17, 2025", title: "Final Submission", description: "Submit your projects" },
  { date: "Mar 18, 2025", title: "Results & Prize Distribution", description: "Winners announced" }
];

const TimelineSection = () => {
  const pathRef = useRef(null);
  const particleRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const particle = particleRef.current;

    if (path && particle) {
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: 'top 70%',
          once: true,
          markers: false
        }
      });

      gsap.to(particle, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".timeline-section",
          start: 'top 70%',
          once: true,
          markers: false
        }
      });
    }
  }, []);

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-container">
        <motion.div
          className="section-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Event <span className="title-highlight">Timeline</span>
          </h2>
          <p className="section-subtitle">
            Mark your calendars for these important dates
          </p>
        </motion.div>

        <div className="timeline-wrapper">
          <svg
            className="timeline-path-svg"
            width="100%"
            height="100%"
            viewBox="0 0 400 800"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d="M 100 50 Q 300 50 300 150 T 100 250 Q 100 350 300 350 T 100 450 Q 100 550 300 550 T 100 650 Q 100 750 300 750"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#8B2FC9" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </svg>

          <div
            ref={particleRef}
            className="timeline-particle"
            style={{ opacity: 0 }}
          />

          <div className="timeline-items">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="timeline-card interactive">
                  <div className="card-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="card-date">{item.date}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                  <div className="card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
