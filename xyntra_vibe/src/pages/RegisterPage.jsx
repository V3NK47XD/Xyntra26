import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-bg-orb orb-1" />
      <div className="register-bg-orb orb-2" />
      
      <motion.button
        className="back-button interactive"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft size={20} />
        Back to Home
      </motion.button>

      <div className="register-container">
        <motion.div
          className="register-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="register-logo">
            <span className="logo-x">X</span>
            <span className="logo-yntra">YNTRA</span>
          </div>
          <h1 className="register-title">Registration</h1>
          <p className="register-subtitle">Join us for an incredible hackathon experience</p>
        </motion.div>

        <motion.div
          className="register-info-cards"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="info-card">
            <Calendar size={32} />
            <h3>Event Date</h3>
            <p>March 15-18, 2025</p>
          </div>
          <div className="info-card">
            <Users size={32} />
            <h3>Team Size</h3>
            <p>2-4 Members</p>
          </div>
          <div className="info-card">
            <Lightbulb size={32} />
            <h3>Prize Pool</h3>
            <p>₹30,000</p>
          </div>
        </motion.div>

        <motion.div
          className="register-coming-soon"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="coming-soon-content">
            <h2>Registration Opens Soon!</h2>
            <p>Stay tuned for registration updates</p>
            <div className="coming-soon-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;