import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';
//import Galaxy from "./Galaxy";
import './styles/Prize.css';

const prizes = [
  {
    place: '2nd Place',
    amount: '₹10,000',
    icon: Award,
    color: '#C0C0C0',
    scale: 0.95
  },
  {
    place: '1st Place',
    amount: '₹15,000',
    icon: Trophy,
    color: '#FFD700',
    scale: 1.2
  },
  {
    place: '3rd Place',
    amount: '₹5,000',
    icon: Medal,
    color: '#CD7F32',
    scale: 0.9
  }
];

const PrizeSection = () => {
  return (
    
    <section id="prize" className="prize-section">
      {/* <Galaxy /> */}
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
            Win exciting cash prizes
          </p>
        </motion.div>

        <div className="prizes-wrapper">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            const baseRotate =
              index === 0 ? -15 : index === 2 ? 15 : 0;

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
  style={{
    scale: prize.scale
  }}
  whileHover={{ y: -12 }}
  onMouseMove={(e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // 🔥 VERY SUBTLE TILT
    const rotateX = -(y - midY) / 35;
    const rotateY = (x - midX) / 35;

    card.style.transition = 'transform 0.15s ease-out';
    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${prize.scale})
    `;
  }}
  onMouseLeave={(e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.4s ease';
    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale(${prize.scale})
    `;
  }}
>

                <div className="prize-glow" style={{ background: prize.color }} />

                <motion.div
                  className="prize-icon"
                  style={{ color: prize.color }}
                  animate={{
                    y: [0, -10, 0],
                    scale:
                      prize.place === '1st Place'
                        ? [1, 1.15, 1]
                        : [1, 1.05, 1]
                  }}
                  transition={{
                    duration: prize.place === '1st Place' ? 2 : 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Icon size={60} />
                </motion.div>

                <h3 className="prize-place" style={{ color: prize.color }}>
                  {prize.place}
                </h3>

                <div className="prize-amount">{prize.amount}</div>

                <div className="prize-shine" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;
