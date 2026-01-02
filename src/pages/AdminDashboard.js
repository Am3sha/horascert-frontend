import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogout, verifyAuth } from '../services/api';
import ApplicationsTab from './admin/ApplicationsTab';
import EmailsTab from './admin/EmailsTab';
import CertificatesTab from './admin/CertificatesTab';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('certificates');
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const check = async () => {
            try {
                const res = await verifyAuth();
                if (active && (!res || !res.success)) {
                    navigate('/login');
                }
            } catch {
                if (active) {
                    navigate('/login');
                }
            }
        };

        check();

        return () => {
            active = false;
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await adminLogout();
        } finally {
            navigate('/login');
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Admin Dashboard</h1>
                    <p>Manage certificates, applications, and emails</p>
                </div>
                <div className="header-right">
                    <button onClick={handleLogout} className="btn-logout" type="button">
                        Logout
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                    <button onClick={() => setError('')} className="alert-close" type="button">×</button>
                </div>
            )}

            <div className="dashboard-tabs">
                <button
                    type="button"
                    className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificates')}
                >
                    Certificates
                </button>
                <button
                    type="button"
                    className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    Applications
                </button>
                <button
                    type="button"
                    className={`tab-btn ${activeTab === 'emails' ? 'active' : ''}`}
                    onClick={() => setActiveTab('emails')}
                >
                    Emails
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'certificates' && <CertificatesTab onError={setError} />}
                {activeTab === 'applications' && <ApplicationsTab onError={setError} />}
                {activeTab === 'emails' && <EmailsTab onError={setError} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
