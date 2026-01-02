import React from 'react';
import './SimplePage.css';

export default function QualityPolicy() {
    return (
        <div className="page-container">
            <header>
                <h1>Quality Policy</h1>
                <p className="paragraph">
                    HORAS Cert is committed to delivering certification services that consistently meet applicable standards, accreditation requirements, and customer expectations.
                </p>
            </header>

            <section className="section">
                <h2 className="section-title">Quality Policy</h2>

                <p className="paragraph">
                    We implement and maintain an effective management system aligned with ISO/IEC 17021-1 and applicable accreditation criteria. Our objective is to provide reliable certification services based on competence, consistency, and continual improvement.
                </p>

                <p className="paragraph">We achieve this through:</p>
                <ul className="list">
                    <li>
                        Delivering certification services in accordance with ISO/IEC 17021-1 and relevant accreditation requirements,
                    </li>
                    <li>
                        Ensuring professional, responsive service that adds value and meets agreed requirements,
                    </li>
                    <li>Applying sound certification principles through competent personnel and effective oversight,</li>
                    <li>Maintaining training and competence to support consistent audit performance,</li>
                    <li>
                        Continually improving our processes based on feedback, performance monitoring, and risk-based thinking,
                    </li>
                    <li>
                        Maintaining appropriate communication with customers and interested parties regarding our certification services,
                    </li>
                    <li>
                        Protecting confidentiality and managing impartiality and conflicts of interest to ensure objective decisions,
                    </li>
                    <li>
                        Maintaining controlled records in accordance with applicable requirements and retention periods.
                    </li>
                    <li>Reviewing this policy periodically to ensure continuing suitability and effectiveness.</li>
                </ul>
            </section>
        </div>
    );
}
