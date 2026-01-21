import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

const faqData = [
  {
    question: 'Who can participate in Xyntra?',
    answer: 'Xyntra is open to all undergraduate and postgraduate students from any college. Teams can have 2-4 members.'
  },
  {
    question: 'What is the registration fee?',
    answer: 'Registration is completely free! Just sign up and start building your innovative project.'
  },
  {
    question: 'Can I participate individually?',
    answer: 'We encourage team participation (2-4 members), but individual participation is also allowed in certain categories.'
  },
  {
    question: 'What technologies can we use?',
    answer: 'You are free to use any technology stack, framework, or tools that best suit your project requirements.'
  },
  {
    question: 'Will accommodation be provided?',
    answer: 'Accommodation details will be shared with shortlisted teams. Local participants can commute daily.'
  },
  {
    question: 'What should we bring on the event day?',
    answer: 'Bring your laptops, chargers, student ID cards, and most importantly - your creativity and enthusiasm!'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <motion.div
          className="section-header"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Frequently Asked <span className="title-highlight">Questions</span>
          </h2>
          <p className="section-subtitle">
            Got questions? We've got answers
          </p>
        </motion.div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={`faq-question interactive ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="answer-content">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;