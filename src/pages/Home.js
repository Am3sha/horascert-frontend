import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/Hero/HeroSlider';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import ContactForm from '../components/ContactForm/ContactForm';
import './Home.css';

const Home = () => {
  const services = [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      tagline: 'Quality Management System',
      icon: '/imges/ISO_9001-2015-1003x1024.jpg',
      description: 'Quality Management System'
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      tagline: 'Environmental Management System',
      icon: '/imges/iso14001-1024x1024.png',
      description: 'Environmental Management System'
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      tagline: 'Occupational Health & Safety',
      icon: '/imges/iso-45001.png',
      description: 'Occupational Health & Safety'
    },
    {
      id: 'iso-22000',
      name: 'ISO 22000:2018',
      tagline: 'Food Safety Management System',
      icon: '/imges/ISO-22000-2018.jpg',
      description: 'Food Safety Management System'
    },
    {
      id: 'haccp',
      name: 'HACCP',
      tagline: 'Food Safety System',
      icon: '/imges/HACCP-Certification-Logo-for-News-webpage-1024x750.jpg',
      description: 'Food Safety System'
    },
    {
      id: 'gmp',
      name: 'GMP',
      tagline: 'Good Manufacturing Practice',
      icon: '/imges/gmp-good-manufacturing-practice-certified-round-stamp-on-white-background-vector-e1731932642480.jpg',
      description: 'Good Manufacturing Practice'
    }
  ];



  return (
    <article className="home-page">
      <header>
        <HeroSlider />
      </header>

      {/* Company Description Section */}
      <section className="company-description-section section">
        <div className="container">
          <div className="company-description-content">
            <div className="company-description-text">
              <h2 className="section-title">About HORAS Cert</h2>
              <p className="lead-text">
                <strong>HORAS Cert Organization for Quality Systems and Certifications</strong> is an accredited certification body recognized by the Egyptian Accreditation Council (EGAC) for the following international standards:
              </p>
              <ul className="standards-list">
                <li>Quality Management System ISO 9001:2015</li>
                <li>Environmental Management System ISO 14001:2015</li>
                <li>Occupational Health and Safety Management System ISO 45001:2018</li>
                <li>Food Safety Management Systems ISO 22000:2018</li>
              </ul>

              <Link to="/about" className="btn btn-secondary">
                Learn More About Us
              </Link>
            </div>
            <div className="company-description-image">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=75&fm=webp"
                alt="HORAS-Cert professional certification team"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Combined Section */}
      <section className="vision-mission-section section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="card-icon"></div>
              <h2>Our Vision</h2>
              <p>
                To be the leading certification body in the region, recognized for excellence, integrity, and innovation in quality management systems certification. We aim to help organizations achieve sustainable growth and international recognition through world-class certification services.
              </p>
            </div>
            <div className="mission-card">
              <div className="card-icon"></div>
              <h2>Our Mission</h2>
              <p>
                To provide reliable, impartial, and value-added certification services that enable organizations to demonstrate their commitment to quality, environmental responsibility, and occupational health and safety. We strive to build long-term partnerships with our clients based on trust and mutual success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="accreditation-section section">
        <div className="container">
          <h2 className="section-title">Accreditations and Registrations</h2>
          <p className="section-subtitle">
            HORAS Cert is accredited by leading national and international accreditation bodies, ensuring the highest standards of certification services
          </p>
          <div className="accreditation-grid">
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
                  alt="IAF Member"
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
              <h3>ESO</h3>
              <p>The Egyptian Organization for Standards and Quality (EOS)</p>
            </div>
            <div className="accreditation-card">
              <div className="accreditation-image-container">
                <img
                  src="/imges/logo-capq (1).webp"
                  alt="Certification Body"
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
              <h3> CAPQ </h3>
              <p>Authorized National Plant Protection Organization of the Arab Republic of Egypt (CAPQ)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <div className="container">
          <h2 className="section-title">Our Accredited Standards</h2>
          <p className="section-subtitle">
            Comprehensive ISO certification services to help your organization achieve international standards and enhance operational excellence
          </p>
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Certification Process Section */}
      <section id="certification-process" className="certification-process-section section">
        <div className="container">
          <h2 className="section-title">Our Certification Process</h2>
          <p className="section-subtitle">
            A clear, structured approach designed to help you achieve certification efficiently and effectively
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Application</h3>
              <p>Submit your application form with required documentation for initial review</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Document Review</h3>
              <p>Our expert team reviews your documentation and management system</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>On-site Audit</h3>
              <p>Comprehensive audit of your facilities, processes, and systems</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Certification Decision</h3>
              <p>Review and approval by our independent certification committee</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Surveillance Audits</h3>
              <p>Regular audits to ensure ongoing compliance and continuous improvement</p>
            </div>
          </div>
          <div className="process-cta">
            <Link to="/application" className="btn btn-secondary">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>



      {/* Contact CTA Section */}
      <section className="contact-cta-section section">
        <div className="container">
          <h2 className="section-title">Get Started Today</h2>
          <p className="section-subtitle">
            Contact us for a free consultation and quote. Our team is ready to help you achieve certification excellence.
          </p>
          <ContactForm />
        </div>
      </section>
    </article>
  );
};

export default Home;
