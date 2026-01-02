import React from 'react';
import './SimplePage.css';

export default function ConfidentialityPolicy() {
    return (
        <div className="page-container">
            <header>
                <h1>Confidentiality Policy</h1>
                <p className="paragraph">
                    HORAS Cert protects confidential information and ensures that all data obtained through certification activities is handled responsibly and securely.
                </p>
            </header>

            <section className="section">
                <h2 className="section-title">Confidentiality Policy</h2>
                <p className="paragraph">
                    Information obtained during applications, audits, and certification activities is treated as confidential. We disclose information only with authorization from the client or when required by law or accreditation obligations.
                </p>

                <p className="paragraph">Requirements for employees and subcontractors</p>
                <p className="paragraph">
                    All employees, subcontractors, and committee members are required to maintain confidentiality of any information received or generated during certification activities. Such information shall not be disclosed to any third party without explicit authorization, except as permitted by applicable requirements.
                </p>
                <p className="paragraph">
                    Confidentiality obligations also apply when information is reviewed by parties with a legitimate right to audit our activities (for example, accreditation bodies), subject to appropriate safeguards.
                </p>
                <p className="paragraph">
                    Where disclosure is required by law, the client will be informed in advance of the information provided, unless prohibited by law.
                </p>
                <p className="paragraph">
                    Where serious legal or safety concerns are identified, HORAS Cert may be required to communicate with relevant authorities in accordance with legal obligations and governance controls.
                </p>

                <p className="paragraph">Access to records</p>
                <p className="paragraph">
                    All records are maintained securely and are accessible only to authorized personnel through controlled paper records or access-restricted electronic systems.
                </p>
                <ul className="list">
                    <li>Subcontractors are restricted to information necessary for the activities they perform.</li>
                    <li>Records are disclosed only to organizations that can demonstrate a legitimate and lawful right to access them, including accreditation bodies where applicable.</li>
                </ul>

                <p className="paragraph">Confidentiality statements</p>
                <p className="paragraph">
                    All employees, subcontractors, managers, and committee members are required to agree to this policy and sign appropriate confidentiality agreements. These obligations remain in effect during and after engagement.
                </p>

                <p className="paragraph">Approved by signature</p>
                <p className="paragraph">Date: 30/09/2023</p>
            </section>
        </div>
    );
}
