import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const services = [
    { name: 'ISO 9001:2015', id: 'iso-9001' },
    { name: 'ISO 14001:2015', id: 'iso-14001' },
    { name: 'ISO 45001:2018', id: 'iso-45001' },
    { name: 'ISO 22000:2018', id: 'iso-22000' },
    { name: 'HACCP', id: 'haccp' },
    { name: 'GMP', id: 'gmp' }
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Services' },
    { path: '/clients', label: 'Clients' },
    { path: '/application', label: 'Apply Now' },
    { path: '/contact', label: 'Contact Us' }
  ];

  const accreditations = [
    { name: 'EGAC', fullName: 'Egyptian Accreditation Council' },
    { name: 'IAF', fullName: 'International Accreditation Forum' },
    { name: 'CAPO', fullName: 'Central Agency for Public Mobilization and Statistics' },
    { name: 'EOS', fullName: 'Egyptian Organization for Standardization' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main-content">
          {/* Company Info */}
          <div className="footer-column footer-company">
            <div className="footer-logo-section">
              <h2 className="footer-logo">HORAS Cert</h2>
              <p className="footer-tagline">Quality Systems & Certifications</p>
            </div>
            <p className="footer-description">
              HORAS Cert is an EGAC Accredited certification body providing internationally recognized ISO certification services. We help organizations achieve excellence through quality management systems.
            </p>
            <div className="accreditation-badges">
              {accreditations.map((acc, index) => (
                <span key={index} className="accreditation-badge" title={acc.fullName}>
                  {acc.name}
                </span>
              ))}
            </div>
            <div className="footer-social-icons">
              <a href="#" aria-label="LinkedIn" className="social-icon linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="footer-column footer-services">
            <h3>Our Services</h3>
            <ul className="services-list">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-column footer-links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-column footer-contact">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10.5C11.3807 10.5 12.5 9.38071 12.5 8C12.5 6.61929 11.3807 5.5 10 5.5C8.61929 5.5 7.5 6.61929 7.5 8C7.5 9.38071 8.61929 10.5 10 10.5Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 17.5C10 17.5 16.25 12.5 16.25 8C16.25 4.5 13.5 2.5 10 2.5C6.5 2.5 3.75 4.5 3.75 8C3.75 12.5 10 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="contact-text">Building No 74 First District Sheikh Zayed -6th of October City-Egypt</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"></span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18.3333 14.1V16.6C18.3333 17.1523 17.8856 17.6 17.3333 17.6H17.1667C9.34234 17.6 3 11.2577 3 3.43333V3.26667C3 2.71438 3.44772 2.26667 4 2.26667H6.5C6.96024 2.26667 7.35775 2.58034 7.46358 3.02775L8.15385 5.79231C8.24872 6.19178 8.09615 6.60833 7.76289 6.85833L6.5 7.8C7.5 10.3 9.7 12.5 12.2 13.5L13.1417 12.2371C13.3917 11.9038 13.8082 11.7513 14.2077 11.8462L16.9723 12.5364C17.4197 12.6423 17.7333 13.0398 17.7333 13.5V14.1H18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="contact-text">
                  <a href="tel:+201234567890">+20 123 456 7890</a>
                </span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"></span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3.33337 5.83333L9.16671 9.58333C9.69537 9.91667 10.3047 9.91667 10.8334 9.58333L16.6667 5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2.5" y="4.16667" width="15" height="11.6667" rx="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="contact-text">
                  <a href="mailto:info@horas-cert.com">info@horascert.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} HORAS Cert All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
