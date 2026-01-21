import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo">
              <span className="logo-x-footer">X</span>
              <span className="logo-yntra-footer">YNTRA</span>
            </div>
            <p className="footer-tagline">
              Innovate. Create. Transform.
            </p>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-links">
              <a href="mailto:xyntra@rec.edu" className="footer-link interactive">
                <Mail size={18} />
                <span>xyntra@rec.edu</span>
              </a>
              <a href="tel:+919876543210" className="footer-link interactive">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </a>
              <div className="footer-link">
                <MapPin size={18} />
                <span>Rajalakshmi Engineering College, Chennai</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a href="#home" className="footer-link interactive">Home</a>
              <a href="#domains" className="footer-link interactive">Domains</a>
              <a href="#prize" className="footer-link interactive">Prize Pool</a>
              <a href="#timeline" className="footer-link interactive">Timeline</a>
              <a href="/register" className="footer-link interactive">Register</a>
            </div>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link interactive" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="social-link interactive" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="social-link interactive" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="social-link interactive" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="footer-divider" />

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="footer-credits">
            <p>Organized by <strong>IEEE Computer Society</strong></p>
            <p>Rajalakshmi Engineering College</p>
          </div>
          <p className="footer-copyright">
            © 2025 Xyntra. All rights reserved.
          </p>
        </motion.div>
      </div>

      <div className="footer-glow footer-glow-1" />
      <div className="footer-glow footer-glow-2" />
    </footer>
  );
};

export default Footer;