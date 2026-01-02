import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <li>Get in touch with us for inquiries, quotes, or support</li>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

