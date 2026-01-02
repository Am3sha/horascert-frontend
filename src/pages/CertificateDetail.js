import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

export default function CertificateDetail() {
    const { certificateNumber } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await api.fetchCertificateByNumber(certificateNumber);
                if (res && res.success) {
                    setCert(res.data || null);
                } else {
                    setCert(null);
                }
            } catch (err) {
                // Error handled by loading state
            }
            finally { setLoading(false); }
        };
        load();
    }, [certificateNumber]);

    if (loading) return <div>Loading...</div>;
    if (!cert) return <div>Certificate not found</div>;

    // Generate certificate URL dynamically using current domain
    const certificateUrl = `${window.location.origin}/certificate/${cert.certificateId}`;

    const placeholderLogo =
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60" viewBox="0 0 160 60">' +
            '<rect width="160" height="60" rx="8" fill="#f3f4f6"/>' +
            '<rect x="10" y="10" width="40" height="40" rx="6" fill="#e5e7eb"/>' +
            '<text x="60" y="35" font-family="Arial" font-size="14" fill="#6b7280">Company Logo</text>' +
            '</svg>'
        );

    const companyAddress =
        cert.companyAddress?.fullAddress ||
        cert.companyAddress?.street ||
        (typeof cert.companyAddress === 'string' ? cert.companyAddress : '');

    return (
        <div style={{ padding: 24, maxWidth: 920, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <img
                    src={placeholderLogo}
                    alt="Company logo"
                    style={{ width: 160, height: 60, objectFit: 'contain' }}
                />
                <div>
                    <h2 style={{ margin: 0 }}>Certificate Details</h2>
                    <p style={{ margin: '6px 0 0', color: '#4b5563' }}>Certificate No: {cert.certificateNumber}</p>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18 }}>
                <p><strong>Company:</strong> {cert.companyName}</p>
                <p><strong>Standard:</strong> {cert.standard}</p>
                <p><strong>Scope:</strong> {cert.scope}</p>
                <p><strong>Issue Date:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
                <p><strong>Expiry Date:</strong> {new Date(cert.expiryDate).toLocaleDateString()}</p>
                {companyAddress ? <p><strong>Address:</strong> {companyAddress}</p> : null}

                <div style={{ marginTop: 18 }}>
                    <QRCodeSVG
                        value={certificateUrl}
                        size={160}
                        level="H"
                        includeMargin={true}
                    />
                </div>
            </div>
        </div>
    );
}
