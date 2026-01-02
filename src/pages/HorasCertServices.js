import React from 'react';
import './SimplePage.css';

export default function HorasCertServices() {
    return (
        <div className="page-container">
            <header>
                <h1>HORAS Cert Services</h1>
                <p className="paragraph">
                    HORAS Cert provides professional support services to organizations operating in regulated and export-oriented sectors. We assist clients in meeting national requirements, preparing for inspections, and maintaining compliance through structured documentation and technical guidance.
                </p>
            </header>

            <section className="section">
                <h2 className="section-title">Services</h2>
                <p className="paragraph">Our service scope includes, but is not limited to, the following activities:</p>
                <ul className="list">
                    <li>Registration support with the National Food Safety Authority (NFSA)</li>
                    <li>Readiness support to meet NFSA requirements for inclusion in the White List (where applicable)</li>
                    <li>Preparation and coordination for examination and inspection of export shipments to markets requiring NFSA conformity documentation</li>
                    <li>Coding support for farms and packing stations with the Egyptian Agricultural Quarantine</li>
                    <li>Coding support for packing stations with the NFSA and alignment with applicable food safety requirements</li>
                    <li>Preparation of export records and supporting documentation with the Egyptian Agricultural Quarantine</li>
                </ul>
            </section>
        </div>
    );
}
