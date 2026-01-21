import { motion } from 'framer-motion';
import { Cpu, Heart, GraduationCap, DollarSign, Sparkles } from 'lucide-react';
import './DomainsSection.css';

const domains = [
  {
    id: 1,
    title: 'Health',
    icon: Heart,
    description: 'Healthcare innovation and medical technology solutions',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: 'Defense',
    icon: Cpu,
    description: 'Security systems and defense technology',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: 'EdTech',
    icon: GraduationCap,
    description: 'Educational technology and learning platforms',
    color: '#95E1D3'
  },
  {
    id: 4,
    title: 'FinTech / Blockchain',
    icon: DollarSign,
    description: 'Financial technology and blockchain solutions',
    color: '#FFD93D'
  },
  {
    id: 5,
    title: 'Open Domain',
    icon: Sparkles,
    description: 'Innovative ideas across any domain',
    color: '#C56CF0'
  }
];

const DomainsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.01,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="domains" className="domains-section">
      <div className="domains-container">
        <motion.div
          className="section-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.01 }}
        >
          <h2 className="section-title">
            Choose Your <span className="title-highlight">Domain</span>
          </h2>
          <p className="section-subtitle">
            Select from our diverse range of technology domains
          </p>
        </motion.div>

        <motion.div
          className="domains-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.id}
                className="domain-card interactive"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.01 }
                }}
              >
                <div className="card-glow" style={{ background: domain.color }} />
                <div 
                  className="card-icon"
                  style={{ color: domain.color }}
                >
                  <Icon size={48} />
                </div>
                <h3 className="card-title">{domain.title}</h3>
                <p className="card-description">{domain.description}</p>
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DomainsSection;