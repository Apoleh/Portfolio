import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const ContactForm: React.FC = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const contactData = {
      name,
      email,
      message,
    };

    try {
      // Assuming you will call an API to submit the form (or use another method to handle submission)
      console.log('Contact form submitted:', contactData);
      alert('Your message has been sent successfully!');
      navigate('/felix'); // Navigate to a "Thank You" page or similar
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-form">
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="button btn">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
