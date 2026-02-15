import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import PageHero from '../components/PageHero/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  useScrollReveal();
  const breadcrumb = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact', isCurrent: true }
  ];

  return (
    <div className="contact-page">
      <PageHero
        title="Get in Touch"
        subtitle="Get in touch with us for inquiries, quotes, or support."
        breadcrumb={breadcrumb}
      />

      <section className="section-contact-main">
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className="contact-info">
          <div className="contact-info-card">
            <div className="icon-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.33337 5.83333L9.16671 9.58333C9.69537 9.91667 10.3047 9.91667 10.8334 9.58333L16.6667 5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2.5" y="4.16667" width="15" height="11.6667" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="info-title">Email Us</div>
              <div className="info-value">
                <a href="mailto:info@horascert.com">info@horascert.com </a> <br /> <a href="mailto:tarik@horascert.com">tarik@horascert.com</a>
              </div>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="icon-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.3333 14.1V16.6C18.3333 17.1523 17.8856 17.6 17.3333 17.6H17.1667C9.34234 17.6 3 11.2577 3 3.43333V3.26667C3 2.71438 3.44772 2.26667 4 2.26667H6.5C6.96024 2.26667 7.35775 2.58034 7.46358 3.02775L8.15385 5.79231C8.24872 6.19178 8.09615 6.60833 7.76289 6.85833L6.5 7.8C7.5 10.3 9.7 12.5 12.2 13.5L13.1417 12.2371C13.3917 11.9038 13.8082 11.7513 14.2077 11.8462L16.9723 12.5364C17.4197 12.6423 17.7333 13.0398 17.7333 13.5V14.1H18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="info-title">Call Us</div>
              <div className="info-value">
                <p>+20 1066672250 <br /> +20 1009551633 </p>

              </div>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="icon-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10.5C11.3807 10.5 12.5 9.38071 12.5 8C12.5 6.61929 11.3807 5.5 10 5.5C8.61929 5.5 7.5 6.61929 7.5 8C7.5 9.38071 8.61929 10.5 10 10.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 17.5C10 17.5 16.25 12.5 16.25 8C16.25 4.5 13.5 2.5 10 2.5C6.5 2.5 3.75 4.5 3.75 8C3.75 12.5 10 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="info-title">Visit Us</div>
              <div className="info-value">
                Building No 74 First District Sheikh Zayed -6th of October City-Egypt
              </div>
            </div>
          </div>
          <h3 className="contact-map-title">Our Location</h3>
          <div className="map-container">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d13821.526308232187!2d30.95466!3d29.997198!3m2!1i1024!2i768!4f13.1!2m1!1sBuilding%20%20No%20%2074%20%20-%20%20First%20District%20-%20Sheikh%20Zayed%20-%206th%20of%20October%20City%20-%20Egypt!5e0!3m2!1sen!2sus!4v1771116197497!5m2!1sen!2sus"
              style={{ width: '100%', height: '350px', border: '0', borderRadius: '8px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>


      </section>
    </div>
  );
};

export default Contact;

