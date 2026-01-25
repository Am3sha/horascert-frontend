import React from 'react';
import './Clients.css';

const Clients = () => {
  const clients = [
    { id: 1, name: 'MEDITERRANEAN AGRICUTURAL PRODUCTSCO (MAPCO)', logo: '/imgesclinet/8787687.jpg' },
    { id: 2, name: 'ZAD For Export', logo: '/imgesclinet/WhatsApp-Image-2024-12-17-at-11.33.48-AM.jpeg' },
    { id: 3, name: 'Al Remas Furniture', logo: '/imgesclinet/WhatsApp-Image-2024-12-17-at-11.34.36-AM.jpeg' },
    { id: 4, name: 'Abdelwahab Fruits', logo: '/imgesclinet/WhatsApp-Image-2024-12-17-at-11.35.15-AM-1024x277.jpeg' },
    { id: 5, name: 'Green Harvest Egypt', logo: '/imgesclinet/WhatsApp-Image-2024-12-17-at-11.36.13-AM-1024x633.jpeg' },
    { id: 6, name: 'Cotton & More', logo: '/imgesclinet/WhatsApp-Image-2024-12-17-at-11.36.47-AM.jpeg' },
    { id: 7, name: 'Royal', logo: '/imgesclinet/WhatsApp-Image-2025-01-30-at-10.17.05-AM-768x512.jpeg' },
    { id: 8, name: 'CPT', logo: '/imgesclinet/WhatsApp-Image-2025-01-30-at-10.17.06-AM-1024x248.jpeg' },
    { id: 9, name: 'ITA', logo: '/imgesclinet/WhatsApp-Image-2025-01-30-at-10.17.07-AM-300x93.jpeg' },
    { id: 10, name: 'ARC', logo: '/imgesclinet/WhatsApp-Image-2025-01-30-at-10.24.32-AM-300x134.jpeg' },
    { id: 11, name: 'MHA', logo: '/imgesclinet/WhatsApp-Image-2025-01-30-at-10.27.24-AM-1024x512.jpeg' }
  ];

  return (
    <div className="clients-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Clients</h1>
        </div>
      </div>

      <section className="section clients-section">
        <div className="container">
          <div className="clients-grid">
            {clients.map(client => (
              <div key={client.id} className="client-card">
                <div className="client-logo-wrapper">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="client-logo"
                    loading="lazy"
                    decoding="async"
                    width="150"
                    height="150"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="client-name">{client.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;

