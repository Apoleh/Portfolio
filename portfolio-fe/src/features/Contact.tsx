import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const ContactForm: React.FC = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://getform.io/f/bvrwyekb', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Email sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
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

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ContactForm;
