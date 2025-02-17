import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="cv-download">
        <a href="/assets/CV.pdf" download className="cv-button">
          Download CV (EN)
        </a>
        <a href="/assets/CV(French).pdf" download className="cv-button">
          Download CV (FR)
        </a>
      </div>

      <div className="contact-me">
        <p>
          Feel free to reach out!{' '}
          <a href="mailto:2231308@champlaincollege.qc.ca" className="contact-me-link">
            Contact Me
          </a>
        </p>
      </div>

      <div className="copyright">
        <p>&copy; 2025 Felix Zhang | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
