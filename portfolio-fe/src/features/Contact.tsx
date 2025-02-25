import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const ContactForm: React.FC = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div className="contact-form">
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
      <h2>Contact Me</h2>

      <form action="https://getform.io/f/bvrwyekb" method="POST">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            required
          />
        </div>
        
        <input type="hidden" name="_gotcha" style={{ display: 'none' }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
