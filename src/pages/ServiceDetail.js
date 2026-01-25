import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Map service IDs to certificate images
  const certificateImages = {
    'iso-9001': '/imges/ISO_9001-2015-1003x1024.jpg',
    'iso-14001': '/imges/iso14001-1024x1024.png',
    'iso-45001': '/imges/iso-45001.png',
    'iso-22000': '/imges/ISO-22000-2018.jpg',
    'haccp': '/imges/HACCP-Certification-Logo-for-News-webpage-1024x750.jpg',
    'gmp': '/imges/gmp-good-manufacturing-practice-certified-round-stamp-on-white-background-vector-e1731932642480.jpg'
  };

  const serviceDetails = {
    'iso-9001': {
      name: 'ISO 9001:2015',
      fullName: 'ISO 9001:2015 - Quality Management System',
      description: 'ISO 9001:2015 is the international standard that specifies requirements for a quality management system (QMS). Organizations use this standard to demonstrate their ability to consistently provide products and services that meet customer and regulatory requirements.',
      benefits: [
        'Improved customer satisfaction and loyalty',
        'Enhanced process efficiency and productivity',
        'Better risk management',
        'Increased market credibility and competitive advantage',
        'Consistent quality of products and services',
        'Reduced waste and operational costs',
        'Improved employee engagement and morale',
        'Access to new markets and business opportunities'
      ],
      industries: [
        'Manufacturing',
        'Service providers',
        'Healthcare organizations',
        'Educational institutions',
        'Government agencies',
        'Construction companies',
        'IT and software development',
        'Retail and distribution'
      ],
      requirements: [
        'Context of the organization',
        'Leadership and commitment',
        'Planning for the QMS',
        'Support and resources',
        'Operation of processes',
        'Performance evaluation',
        'Continual improvement'
      ]
    },
    'iso-14001': {
      name: 'ISO 14001:2015',
      fullName: 'ISO 14001:2015 - Environmental Management System',
      description: 'ISO 14001:2015 sets out the criteria for an environmental management system and can be certified to. It maps out a framework that a company or organization can follow to set up an effective environmental management system.',
      benefits: [
        'Reduced environmental impact',
        'Compliance with environmental regulations',
        'Lower operational costs through resource efficiency',
        'Enhanced corporate image and reputation',
        'Improved stakeholder relationships',
        'Better risk management',
        'Access to new markets requiring environmental certification',
        'Increased employee engagement'
      ],
      industries: [
        'Manufacturing',
        'Construction',
        'Energy and utilities',
        'Transportation and logistics',
        'Chemical and pharmaceutical',
        'Food and beverage',
        'Mining and extraction',
        'Any organization with environmental impact'
      ],
      requirements: [
        'Environmental policy',
        'Environmental aspects and impacts',
        'Legal and other requirements',
        'Objectives and targets',
        'Environmental management programs',
        'Operational control',
        'Emergency preparedness and response',
        'Monitoring and measurement'
      ]
    },
    'iso-45001': {
      name: 'ISO 45001:2018',
      fullName: 'ISO 45001:2018 - Occupational Health and Safety Management System',
      description: 'ISO 45001:2018 is an international standard that specifies requirements for an occupational health and safety (OH&S) management system. It provides a framework to improve employee safety, reduce workplace risks, and create better, safer working conditions.',
      benefits: [
        'Reduced workplace accidents and injuries',
        'Improved employee health and safety',
        'Compliance with health and safety regulations',
        'Lower insurance premiums',
        'Enhanced corporate reputation',
        'Increased employee morale and productivity',
        'Better risk management',
        'Reduced absenteeism and turnover'
      ],
      industries: [
        'Construction',
        'Manufacturing',
        'Mining and extraction',
        'Transportation',
        'Healthcare',
        'Oil and gas',
        'Chemical processing',
        'Any organization with workplace hazards'
      ],
      requirements: [
        'OH&S policy',
        'Hazard identification and risk assessment',
        'Legal and other requirements',
        'OH&S objectives',
        'Operational planning and control',
        'Emergency preparedness and response',
        'Performance monitoring and measurement',
        'Incident investigation and corrective action'
      ]
    },
    'iso-22000': {
      name: 'ISO 22000:2018',
      fullName: 'ISO 22000:2018 - Food Safety Management System',
      description: 'ISO 22000:2018 specifies requirements for a food safety management system where an organization in the food chain needs to demonstrate its ability to control food safety hazards to ensure that food is safe at the time of human consumption.',
      benefits: [
        'Enhanced food safety',
        'Reduced food safety incidents',
        'Compliance with food safety regulations',
        'Improved customer confidence',
        'Better supply chain management',
        'Access to international markets',
        'Reduced product recalls',
        'Improved operational efficiency'
      ],
      industries: [
        'Food manufacturing',
        'Food processing',
        'Restaurants and catering',
        'Food retail',
        'Food packaging',
        'Agricultural production',
        'Food transportation and storage',
        'Feed production'
      ],
      requirements: [
        'Food safety policy',
        'Hazard analysis and critical control points (HACCP)',
        'Prerequisite programs (PRPs)',
        'Operational prerequisite programs (OPRPs)',
        'Traceability system',
        'Emergency preparedness and response',
        'Control of nonconformities',
        'Verification and validation'
      ]
    },
    'haccp': {
      name: 'HACCP',
      fullName: 'HACCP - Hazard Analysis Critical Control Points',
      description: 'HACCP is a systematic preventive approach to food safety that addresses physical, chemical, and biological hazards as a means of prevention rather than finished product inspection. HACCP is used in the food industry to identify potential food safety hazards.',
      benefits: [
        'Prevention of food safety hazards',
        'Compliance with food safety regulations',
        'Reduced risk of foodborne illness',
        'Improved product quality',
        'Enhanced customer confidence',
        'Better documentation and traceability',
        'Reduced product waste',
        'International recognition'
      ],
      industries: [
        'Food manufacturing',
        'Food processing',
        'Restaurants and food service',
        'Dairy processing',
        'Meat and poultry processing',
        'Seafood processing',
        'Beverage production',
        'Food packaging'
      ],
      requirements: [
        'Conduct hazard analysis',
        'Identify critical control points (CCPs)',
        'Establish critical limits',
        'Monitor CCPs',
        'Establish corrective actions',
        'Establish verification procedures',
        'Establish record-keeping procedures'
      ]
    },
    'gmp': {
      name: 'GMP',
      fullName: 'GMP - Good Manufacturing Practice',
      description: 'Good Manufacturing Practice (GMP) is a system for ensuring that products are consistently produced and controlled according to quality standards. It is designed to minimize the risks involved in any pharmaceutical, food, or cosmetic production.',
      benefits: [
        'Consistent product quality',
        'Compliance with regulatory requirements',
        'Reduced product defects and recalls',
        'Enhanced customer confidence',
        'Improved operational efficiency',
        'Better documentation and traceability',
        'Reduced waste and costs',
        'Access to regulated markets'
      ],
      industries: [
        'Pharmaceutical manufacturing',
        'Food and beverage production',
        'Cosmetic manufacturing',
        'Medical device manufacturing',
        'Dietary supplement production',
        'Biotechnology',
        'Chemical manufacturing',
        'Any regulated manufacturing'
      ],
      requirements: [
        'Quality management system',
        'Personnel qualifications and training',
        'Premises and equipment',
        'Documentation and records',
        'Production and process controls',
        'Quality control and testing',
        'Storage and distribution',
        'Complaint handling and recalls'
      ]
    }
  };

  const service = serviceDetails[serviceId] || serviceDetails['iso-9001'];


  return (
    <div className="service-detail-page">
      <div className="page-header">
        <div className="container">
          <h1>{service.fullName}</h1>
          <p className="page-subtitle">Professional certification services for {service.name}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="service-detail-content">
            <div className="service-main-content">
              <div className="service-intro">
                <h2>About {service.name}</h2>
                <p className="description-text">{service.description}</p>
              </div>

              <div className="service-benefits">
                <h2>Benefits of Certification</h2>
                <ul className="benefits-list">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>
                      <span className="check-icon">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-who">
                <h2>Who Needs It?</h2>
                <p>This certification is ideal for organizations in the following industries:</p>
                <div className="industries-grid">
                  {service.industries.map((industry, index) => (
                    <div key={index} className="industry-tag">{industry}</div>
                  ))}
                </div>
              </div>

              <div className="service-requirements">
                <h2>Key Requirements</h2>
                <ul className="requirements-list">
                  {service.requirements.map((requirement, index) => (
                    <li key={index}>
                      <span className="bullet-icon">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-sidebar">
              <div className="certificate-image-card">
                <h3>Certificate</h3>
                <div className="certificate-image-container">
                  <img
                    src={certificateImages[serviceId] || certificateImages['iso-9001']}
                    alt={`${service.name} Certificate`}
                    className="certificate-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="certificate-image-fallback" style={{ display: 'none' }}>
                    <span className="cert-icon">📜</span>
                    <p>Certificate Image</p>
                  </div>
                </div>
              </div>

              <div className="service-cta-card">
                <h3>Ready to Get Certified?</h3>
                <p>Contact us today to learn more about our certification process and get a free quote.</p>
                <div className="cta-buttons">
                  <Link to="/contact" className="btn btn-primary">Get Free Quote</Link>
                  <Link to="/application" className="btn btn-secondary">Apply Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
