import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';
import './PrizeSection.css';

const prizes = [
  {
    place: '1st Place',
    amount: '₹15,000',
    icon: Trophy,
    color: '#FFD700',
    scale: 1.1
  },
  {
    place: '2nd Place',
    amount: '₹10,000',
    icon: Award,
    color: '#C0C0C0',
    scale: 1
  },
  {
    place: '3rd Place',
    amount: '₹5,000',
    icon: Medal,
    color: '#CD7F32',
    scale: 0.95
  }
];

const PrizeSection = () => {
  return (
    <section id="prize" className="prize-section">
      <div className="prize-container">
        <motion.div
          className="section-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Prize <span className="title-highlight">Pool</span>
          </h2>
          <p className="section-subtitle">
            Win exciting cash prizes worth ₹30,000
          </p>
        </motion.div>

        <div className="prizes-wrapper">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <motion.div
                key={index}
                className="prize-card interactive"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: 'easeOut'
                }}
                whileHover={{
                  scale: prize.scale + 0.05,
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                style={{
                  transform: `scale(${prize.scale})`
                }}
              >
                <div className="prize-glow" style={{ background: prize.color }} />
                <div 
                  className="prize-icon"
                  style={{ color: prize.color }}
                >
                  <Icon size={60} />
                </div>
                <h3 className="prize-place" style={{ color: prize.color }}>
                  {prize.place}
                </h3>
                <div className="prize-amount">{prize.amount}</div>
                <div className="prize-shine" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="total-prize"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>Total Prize Pool</p>
          <h3>₹30,000</h3>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizeSection;