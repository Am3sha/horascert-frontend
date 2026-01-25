import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <img
            src="/imgeteam/78e306e6-0535-4e1c-a4ae-8f5895dc1c44.png"
            alt="HORAS Cert Logo"
            className="company-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1>WHO WE ARE</h1>
        </div>
      </div>

      <section className="section about-section">
        <div className="container">
          <p className="about-description">
            <strong>HORAS Cert</strong> Organization for Quality Systems and Certifications is the accredited certification body recognized by the National Accreditation Council.
          </p>

          <h3>Our Accredited Standards</h3>
          <ul className="standards-list">
            <li>ISO 9001:2015 - Quality Management System</li>
            <li>ISO 14001:2015 - Environmental Management System</li>
            <li>ISO 45001:2018 - Occupational Health and Safety Management System</li>
            <li>ISO 22000:2018 - Food Safety Management System</li>
          </ul>

          <h3>Industries We Serve</h3>
          <p className="industries-intro">
            HORAS provides expert certification and audit services across diverse sectors:
          </p>
          <ul className="industries-grid">
            <li>Food Products, Beverages & Tobacco</li>
            <li>Agriculture, Forestry & Fishing</li>
            <li>Wholesale & Retail Trade</li>
            <li>Automotive Services</li>
            <li>Health & Safety</li>
            <li>Environmental Services</li>
            <li>Retail Chains</li>
            <li>Hotels & Restaurants</li>
            <li>Information Technology</li>
            <li>Education</li>
            <li>Financial Services</li>
            <li>Real Estate</li>
            <li>Machinery & Equipment</li>
            <li>Chemicals & Petrochemicals</li>
            <li>General Administration</li>
          </ul>

          <div className="countries-section">
            <h3>Our Global Presence</h3>

            <h4>Currently Operating in 3 Countries:</h4>
            <div className="current-countries">
              <span className="country-badge">🇪🇬 Egypt</span>
              <span className="country-badge">🇸🇦 Saudi Arabia</span>
              <span className="country-badge">🇦🇪 United Arab Emirates</span>
            </div>

            <h4>Expanding Soon to:</h4>
            <div className="expanding-countries">
              <span>Sudan</span>
              <span>Jordan</span>
              <span>Libya</span>
              <span>Iraq</span>
              <span>Kuwait</span>
              <span>Oman</span>
              <span>Tunisia</span>
              <span>Algeria</span>
              <span>Morocco</span>
              <span>Kenya</span>
              <span>Tanzania</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section accreditation-section-about">
        <div className="container">
          <h2 className="section-title">Accreditations and Registrations</h2>
          <p className="section-subtitle">
            HORAS-Cert is accredited by leading national and international accreditation bodies, ensuring the highest standards of certification services
          </p>
          <div className="accreditations-grid">
            <div className="accreditation-card">
              <div className="accreditation-image-container">
                <img
                  src="/imges/img.png"
                  alt="EGAC Accredited"
                  className="accreditation-image"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="120"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="accreditation-placeholder" style={{ display: 'none' }}>
                  <span>EGAC</span>
                </div>
              </div>
              <h3>EGAC</h3>
              <p>Accredited by the Egyptian Accreditation Council (EGAC) for ISO certification services</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-image-container">
                <img
                  src="/imges/International_Accreditation_Forum_Logo.svg.png"
                  alt="IAF"
                  className="accreditation-image"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="120"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="accreditation-placeholder" style={{ display: 'none' }}>
                  <span>IAF</span>
                </div>
              </div>
              <h3>IAF</h3>
              <p>Internationally recognized through IAF (International Accreditation Forum) membership</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-image-container">
                <img
                  src="/imges/download.png"
                  alt="Accreditation"
                  className="accreditation-image"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="120"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="accreditation-placeholder" style={{ display: 'none' }}>
                  <span>Accreditation</span>
                </div>
              </div>
              <h3>EOS</h3>
              <p>Recognized accreditation for quality certification services</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-image-container">
                <img
                  src="/imges/logo-capq (1).webp"
                  alt="CAPQ"
                  className="accreditation-image"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="120"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="accreditation-placeholder" style={{ display: 'none' }}>
                  <span>Certification</span>
                </div>
              </div>
              <h3>CAPQ</h3>
              <p>Authorized certification body for international standards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

