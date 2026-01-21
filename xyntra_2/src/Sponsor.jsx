import { motion } from 'framer-motion';
import './styles/Sponsor.css';

const SponsorsSection = () => {
  const sponsors = [
    { id: 1, name: 'Sponsor 1' },
    { id: 2, name: 'Sponsor 2' },
    { id: 3, name: 'Sponsor 3' },
    { id: 4, name: 'Sponsor 4' },
    { id: 5, name: 'Sponsor 5' },
    { id: 6, name: 'Sponsor 6' }
  ];

  return (
    <section className="sponsors-section">
      <div className="sponsors-container">
        <motion.div
          className="section-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Our <span className="title-highlight">Sponsors</span>
          </h2>
          <p className="section-subtitle">
            Proudly supported by industry leaders
          </p>
        </motion.div>

        <motion.div
          className="sponsors-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              className="sponsor-card interactive"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="sponsor-placeholder">
                <div className="placeholder-text">{sponsor.name}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;