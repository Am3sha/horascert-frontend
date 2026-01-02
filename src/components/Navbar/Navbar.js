import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsAboutDropdownOpen(false);
  };

  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us', hasDropdown: true },
    { path: '/services', label: 'Services' },
    { path: '/clients', label: 'Our Clients' },
    { path: '/application', label: 'Applications' },
    { path: '/contact', label: 'Contact' }
  ];

  const aboutDropdownItems = [
    { path: '/about/horas-cert-services', label: 'HORAS Cert Services' },
    { path: '/about/accreditations-registrations', label: 'Our Accreditations and Registrations' },
    { path: '/about/iso-certification-services', label: 'ISO Certification Services' },
    { path: '/about/quality-policy', label: 'Quality Policy' },
    { path: '/about/impartiality-policy', label: 'Impartiality Policy' },
    { path: '/about/confidentiality-policy', label: 'Confidentiality Policy' }
  ];

  return (
    <>
      <TopBar />
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="logo">
              <div className="logo-text">
                <h2>HORAS-Cert</h2>
                <p>Organization for Quality Systems and Certifications</p>
              </div>
            </Link>

            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className={item.hasDropdown ? 'nav-dropdown' : ''}
                  onMouseEnter={() => item.hasDropdown && setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsAboutDropdownOpen(false)}
                >
                  {item.hasDropdown ? (
                    <>
                      <Link
                        to={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                        onClick={toggleMobileDropdown}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.label}
                      </Link>
                      <div className={`about-dropdown ${isAboutDropdownOpen ? 'open' : ''}`}>
                        {aboutDropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="dropdown-item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

