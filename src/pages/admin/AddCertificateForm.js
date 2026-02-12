import React, { useState } from 'react';
import { createCertificate } from '../../services/api';
import QRCode from 'qrcode';
import './AddCertificateForm.css';

const AddCertificateForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        certificateNumber: '',
        companyName: '',
        companyAddress: '',
        standard: 'ISO 9001:2015',
        standardDescription: 'Quality Management System',
        scope: '',
        issueDate: '',
        expiryDate: '',
        firstIssueDate: '',
        status: 'Active'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const standards = [
        { value: 'ISO 9001:2015', desc: 'Quality Management System' },
        { value: 'ISO 14001:2015', desc: 'Environmental Management System' },
        { value: 'ISO 45001:2018', desc: 'Occupational Health and Safety' },
        { value: 'ISO 22000:2018', desc: 'Food Safety Management System' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'standard') {
            const selected = standards.find(s => s.value === value);
            if (selected) {
                setFormData(prev => ({ ...prev, standardDescription: selected.desc }));
            }
        }

        if (error) setError('');
    };

    const downloadQRCode = (dataUrl, filename) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateAndDownloadQR = async (certificateUrl, filename) => {
        try {
            const dataUrl = await QRCode.toDataURL(certificateUrl, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            downloadQRCode(dataUrl, filename);
        } catch (err) {
            // Silently handle QR code generation errors
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.certificateNumber.trim()) {
            setError('Certificate Number is required');
            setLoading(false);
            return;
        }

        if (!formData.companyName.trim()) {
            setError('Company Name is required');
            setLoading(false);
            return;
        }

        if (!formData.companyAddress.trim()) {
            setError('Company Address is required');
            setLoading(false);
            return;
        }

        if (!formData.scope.trim()) {
            setError('Scope of Registration is required');
            setLoading(false);
            return;
        }

        if (!formData.issueDate) {
            setError('Issue Date is required');
            setLoading(false);
            return;
        }

        if (!formData.expiryDate) {
            setError('Expiry Date is required');
            setLoading(false);
            return;
        }

        try {
            const data = await createCertificate({ ...formData });

            if (data && data.success && data.data && data.data.certificateId) {
                const certificateUrl = `${window.location.origin}/certificate/${data.data.certificateId}`;

                // Show success message IMMEDIATELY - data is safely in database!
                setSuccessMessage(`Certificate created successfully! Certificate Number: ${data.data.certificateNumber}, Certificate ID: ${data.data.certificateId}.`);
                setLoading(false); // Clear loading state instantly for instant UX feedback

                // Generate and download QR Code in background (non-blocking)
                // This doesn't block UX from showing success
                generateAndDownloadQR(certificateUrl, `QR_${data.data.certificateNumber}.png`)
                    .catch(() => {
                        // Silently handle QR code download errors - don't disrupt UX
                    });

                // Optional: Redirect after success is visible (brief pause for UX clarity)
                setTimeout(() => {
                    window.open(certificateUrl, '_blank');

                    if (onSuccess) {
                        onSuccess(data.data);
                    }

                    // Reset form and success message
                    setFormData({
                        certificateNumber: '',
                        companyName: '',
                        companyAddress: '',
                        standard: 'ISO 9001:2015',
                        standardDescription: 'Quality Management System',
                        scope: '',
                        issueDate: '',
                        expiryDate: '',
                        firstIssueDate: '',
                        status: 'Active'
                    });
                    setSuccessMessage('');
                }, 1000);

            } else {
                setError((data && (data.error || data.message)) || 'Failed to create certificate - Invalid response from server');
                setLoading(false);
            }

        } catch (err) {
            setError(`Network error: ${err.message || 'Failed to connect to server'}`);
            setLoading(false);
        }
    };

    return (
        <div className="add-certificate-form">
            <div className="form-header">
                <h2>Create New Certificate</h2>
                <p>Fill in the required information to issue a new certificate</p>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success" style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="certificate-form">

                <div className="form-grid">

                    <div className="form-group full-width">
                        <label>Certificate Number *</label>
                        <input
                            type="text"
                            name="certificateNumber"
                            value={formData.certificateNumber}
                            onChange={handleChange}
                            placeholder="HOR09152025112"
                            required
                            disabled={loading}
                        />
                        <small>Example: HOR09152025112</small>
                    </div>

                    <div className="form-group full-width">
                        <label>Company Name *</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Full Address *</label>
                        <textarea
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            placeholder="10 Bahaa El-Din Ibn Hanna Street, Bab Al-Sharia, Cairo - Egypt, Cairo, 11511, Egypt"
                            required
                            disabled={loading}
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label>ISO Standard *</label>
                        <select
                            name="standard"
                            value={formData.standard}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >
                            {standards.map(s => (
                                <option key={s.value} value={s.value}>
                                    {s.value} - {s.desc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Scope of Registration *</label>
                        <textarea
                            name="scope"
                            value={formData.scope}
                            onChange={handleChange}
                            placeholder="Import, export and general supplies"
                            required
                            disabled={loading}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Issue Date *</label>
                        <input
                            type="date"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                </div>

                <div className="form-actions">
                    <div className="form-actions-row">
                        <button
                            type="submit"
                            className="btn-create"
                            disabled={loading}
                        >
                            {loading ? 'Creating Certificate...' : 'Create Certificate'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AddCertificateForm;
