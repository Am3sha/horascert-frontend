import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApplicationById, toApiUrl, updateApplication } from '../services/api';
import StatusBadge from './admin/StatusBadge';
import './AdminDashboard.css';

const safeParseJson = (value) => {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
        return JSON.parse(trimmed);
    } catch {
        return null;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleString();
    } catch {
        return String(dateString);
    }
};

const yesNo = (value) => {
    const v = String(value || '').toLowerCase();
    if (v === 'yes' || v === 'true') return 'Yes';
    if (v === 'no' || v === 'false') return 'No';
    return value || '';
};

export default function AdminRequestDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [request, setRequest] = useState(null);
    const [fileUrls, setFileUrls] = useState({});
    const [fileUrlErrors, setFileUrlErrors] = useState({});

    const [activeTab, setActiveTab] = useState('step1');
    const [statusDraft, setStatusDraft] = useState('');

    const additionalInfo = useMemo(() => {
        const parsed = safeParseJson(request && request.description);
        return parsed && typeof parsed === 'object' ? parsed : null;
    }, [request]);

    const loadFileUrls = useCallback(async (files) => {
        const urls = {};
        const urlErrors = {};

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // New format: storageKey present
            if (file.storageKey) {
                try {
                    const endpoint = toApiUrl(`/admin/applications/${id}/files/${i}`);
                    const response = await fetch(`${endpoint}?t=${Date.now()}`, {
                        credentials: 'include',
                        cache: 'no-store',
                        headers: {
                            Accept: 'application/json'
                        }
                    });

                    if (response.status === 401 || response.status === 403) {
                        if (typeof window !== 'undefined') {
                            window.location.replace('/login');
                        }
                        urls[i] = null;
                        urlErrors[i] = 'Session expired. Please log in again.';
                        continue;
                    }

                    let result = null;
                    try {
                        result = await response.json();
                    } catch (parseErr) {
                        urls[i] = null;
                        urlErrors[i] = `Invalid response from server (HTTP ${response.status})`;
                        continue;
                    }

                    if (result.success && result.data?.url) {
                        urls[i] = result.data.url;
                        urlErrors[i] = '';
                    } else {
                        urls[i] = null;
                        urlErrors[i] = result.message || result.error || `Failed to load file URL (HTTP ${response.status})`;
                    }
                } catch (err) {
                    urls[i] = null;
                    urlErrors[i] = (err && err.message) ? err.message : 'Network error while loading file URL';
                }
            } else {
                // Legacy fallback: if URL exists in DB, use it
                if (file.url) {
                    urls[i] = file.url;
                    urlErrors[i] = '';
                } else {
                    urls[i] = null;
                    urlErrors[i] = 'Missing storageKey (legacy record)';
                }
            }
        }

        setFileUrls(urls);
        setFileUrlErrors(urlErrors);
    }, [id]);

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetchApplicationById(id);
            if (res && res.success) {
                setRequest(res.data || null);
                setStatusDraft((res.data && res.data.status) || '');
            } else {
                setRequest(null);
                setError((res && (res.message || res.error)) || 'Failed to load request');
            }
        } catch (err) {
            setRequest(null);
            setError((err && err.message) || 'Failed to load request');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    // Always trigger signed URL fetch after request data is loaded
    useEffect(() => {
        const reqId = request && request._id;
        const files = Array.isArray(request && request.files) ? request.files : [];

        if (!reqId) return;
        if (files.length === 0) return;

        loadFileUrls(files);
    }, [request, loadFileUrls]);

    const handleSaveStatus = async () => {
        setSaving(true);
        setError('');
        try {
            const res = await updateApplication(id, { status: statusDraft });
            if (res && res.success) {
                setRequest(res.data || request);
            } else {
                setError((res && (res.message || res.error)) || 'Failed to update status');
            }
        } catch (err) {
            setError((err && err.message) || 'Failed to update status');
        } finally {
            setSaving(false);
        }
    };

    const standards = Array.isArray(request && request.standards)
        ? request.standards
        : request && request.serviceType
            ? [request.serviceType]
            : [];

    const files = Array.isArray(request && request.files) ? request.files : [];

    const renderFilePreview = (file, index) => {
        const url = fileUrls[index];
        const urlError = fileUrlErrors[index];

        if (!url) {
            return (
                <li key={`${file.name || `File ${index + 1}`}-${index}`}>
                    <span className="file-unavailable">
                        {file.name || `File ${index + 1}`} (File unavailable{urlError ? `: ${urlError}` : ''})
                    </span>
                </li>
            );
        }

        const isImage = file.mimeType?.startsWith('image/');
        const isPdf = file.mimeType === 'application/pdf';

        if (isImage) {
            return (
                <li key={`${file.name || `File ${index + 1}`}-${index}`}>
                    <div className="file-preview">
                        <img
                            src={url}
                            alt={file.name || 'Document'}
                            className="file-preview-image"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'inline';
                            }}
                        />
                        <a href={url} target="_blank" rel="noreferrer" className="file-link" style={{ display: 'none' }}>
                            {file.name || `File ${index + 1}`}
                        </a>
                    </div>
                </li>
            );
        }

        if (isPdf) {
            return (
                <li key={`${file.name || `File ${index + 1}`}-${index}`}>
                    <a href={url} target="_blank" rel="noreferrer" className="file-link pdf-link">
                        📄 {file.name || `File ${index + 1}`}
                    </a>
                </li>
            );
        }

        // Default for other file types
        return (
            <li key={`${file.name || `File ${index + 1}`}-${index}`}>
                <a href={url} target="_blank" rel="noreferrer" className="file-link">
                    📎 {file.name || `File ${index + 1}`}
                </a>
            </li>
        );
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Request Details</h1>
                    <p>View full request data, uploaded files, and update status</p>
                </div>
                <div className="header-right" style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => navigate('/admin/requests')} className="btn-primary" type="button">
                        Back to Requests
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary" type="button" style={{ background: '#64748b' }}>
                        Admin Dashboard
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    {error}
                    <button onClick={() => setError('')} className="alert-close" type="button">×</button>
                </div>
            )}

            <div className="dashboard-content">
                {loading ? (
                    <div className="loading">Loading request...</div>
                ) : !request ? (
                    <div className="empty-state"><p>Request not found</p></div>
                ) : (
                    <>
                        <div className="panel-header" style={{ gap: 12, flexWrap: 'wrap' }}>
                            <h2 style={{ marginRight: 'auto' }}>{request.companyName || 'Request'}</h2>
                            <div className="header-stats" style={{ alignItems: 'center' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    <span>Status:</span>
                                    <StatusBadge status={request.status} />
                                </span>
                                <span>Created: {formatDate(request.createdAt)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                            <button
                                type="button"
                                className={`tab-btn ${activeTab === 'step1' ? 'active' : ''}`}
                                onClick={() => setActiveTab('step1')}
                            >
                                Step 1: Company
                            </button>
                            <button
                                type="button"
                                className={`tab-btn ${activeTab === 'step2' ? 'active' : ''}`}
                                onClick={() => setActiveTab('step2')}
                            >
                                Step 2: Standards & Files
                            </button>
                            <button
                                type="button"
                                className={`tab-btn ${activeTab === 'step3' ? 'active' : ''}`}
                                onClick={() => setActiveTab('step3')}
                            >
                                Step 3: Standard Questions
                            </button>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, marginBottom: 18 }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ fontWeight: 700, color: '#1e293b' }}>Update Status</div>
                                <select
                                    className="status-select"
                                    value={statusDraft}
                                    onChange={(e) => setStatusDraft(e.target.value)}
                                    style={{ minWidth: 220 }}
                                >
                                    <option value="new">New</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="approved">Approved</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="pending">Pending (legacy)</option>
                                    <option value="cancelled">Cancelled (legacy)</option>
                                </select>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleSaveStatus}
                                    disabled={saving}
                                    style={{ background: '#28a745' }}
                                >
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>

                        {activeTab === 'step1' && (
                            <div className="admin-form-view">
                                {/* Company Basic Information */}
                                <div className="form-section">
                                    <h3 className="form-section-title">Company Information</h3>

                                    <div className="form-row-admin">
                                        <div className="form-field-admin">
                                            <div className="field-label">Name of Company <span className="required">*</span></div>
                                            <div className="field-placeholder">Enter company name</div>
                                            <div className="field-value">{request.companyName || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Telephone No. <span className="required">*</span></div>
                                            <div className="field-placeholder">+20 XXX XXX XXXX</div>
                                            <div className="field-value">{request.telephone || request.companyTelephone || request.phone || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Fax No.</div>
                                            <div className="field-placeholder">Optional</div>
                                            <div className="field-value">{request.fax || additionalInfo?.company?.fax || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Email <span className="required">*</span></div>
                                            <div className="field-placeholder">company@example.com</div>
                                            <div className="field-value">{request.email || request.companyEmail || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Website / URL</div>
                                            <div className="field-placeholder">https://</div>
                                            <div className="field-value">{request.website || additionalInfo?.company?.website || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Address */}
                                <div className="form-section">
                                    <h3 className="form-section-title">Company Address</h3>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Address Line 1 <span className="required">*</span></div>
                                            <div className="field-value">{request.addressLine1 || additionalInfo?.company?.addressLine1 || (request.companyAddress ? request.companyAddress.split('\n')[0] : 'Not provided')}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Address Line 2</div>
                                            <div className="field-value">{request.addressLine2 || additionalInfo?.company?.addressLine2 || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">City</div>
                                            <div className="field-value">{request.city || additionalInfo?.company?.city || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">State / Province / Region</div>
                                            <div className="field-value">{request.state || additionalInfo?.company?.stateRegion || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Postal Code</div>
                                            <div className="field-value">{request.postalCode || additionalInfo?.company?.postalCode || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Country <span className="required">*</span></div>
                                            <div className="field-value">{request.country || additionalInfo?.company?.country || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Executive Manager */}
                                <div className="form-section">
                                    <h3 className="form-section-title">Executive Manager</h3>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Name</div>
                                            <div className="field-value">{request.executiveManagerName || additionalInfo?.executiveManager?.name || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Mobile No. <span className="required">*</span></div>
                                            <div className="field-value">{request.executiveManagerMobile || additionalInfo?.executiveManager?.mobile || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Email</div>
                                            <div className="field-value">{request.executiveManagerEmail || additionalInfo?.executiveManager?.email || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Person */}
                                <div className="form-section">
                                    <h3 className="form-section-title">Contact Person</h3>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Name</div>
                                            <div className="field-value">{additionalInfo?.contactPerson?.name || request.clientName || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Position</div>
                                            <div className="field-value">{request.contactPersonPosition || additionalInfo?.contactPerson?.position || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Mobile No.</div>
                                            <div className="field-value">{request.contactPersonMobile || additionalInfo?.contactPerson?.mobile || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Email</div>
                                            <div className="field-value">{request.contactPersonEmail || additionalInfo?.contactPerson?.email || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Workforce */}
                                <div className="form-section">
                                    <h3 className="form-section-title">Workforce</h3>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Total Number of Employees</div>
                                            <div className="field-value">{request.workforceTotalEmployees || additionalInfo?.workforce?.totalEmployees || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Number of Employees per Shift</div>
                                            <div className="field-value">{request.workforceEmployeesPerShift || additionalInfo?.workforce?.employeesPerShift || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-row-admin compact">
                                        <div className="form-field-admin">
                                            <div className="field-label">Number of Shifts</div>
                                            <div className="field-value">{request.workforceNumberOfShifts || additionalInfo?.workforce?.numberOfShifts || 'Not provided'}</div>
                                        </div>
                                        <div className="form-field-admin">
                                            <div className="field-label">Number of Seasonal Employees</div>
                                            <div className="field-value">{request.workforceSeasonalEmployees || additionalInfo?.workforce?.seasonalEmployees || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'step2' && (
                            <div className="admin-form-view">
                                <div className="form-section">
                                    <h3 className="form-section-title">Certification Request</h3>

                                    <div className="form-field-admin full-width">
                                        <div className="field-label">Desired Standards <span className="required">*</span></div>
                                        {standards.length === 0 ? (
                                            <div className="field-value not-provided">Not provided</div>
                                        ) : (
                                            <div className="field-value">
                                                <ul className="standards-list">
                                                    {standards.map((s) => (
                                                        <li key={s}>{s}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-row-admin">
                                        <div className="form-field-admin">
                                            <div className="field-label">Certification Programme Requested <span className="required">*</span></div>
                                            <div className="field-value">{request.programme || additionalInfo?.certificationRequest?.programme || 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="form-field-admin full-width">
                                        <div className="field-label">Certification Scope</div>
                                        <div className="field-value">{additionalInfo?.certificationRequest?.scope || 'Not provided'}</div>
                                    </div>
                                </div>

                                {(additionalInfo?.certificationRequest?.programme || '').toLowerCase() === 'transfer' && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">Transfer Details</h3>

                                        <div className="form-field-admin full-width">
                                            <div className="field-label">Reason for Transfer</div>
                                            <div className="field-value">{request.transferReason || additionalInfo?.certificationRequest?.transferReason || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Expiry Date of Current Certificate</div>
                                            <div className="field-value">{request.transferExpiringDate || additionalInfo?.certificationRequest?.transferExpiryDate || 'Not provided'}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="form-section">
                                    <h3 className="form-section-title">Uploaded Files</h3>
                                    {files.length === 0 ? (
                                        <div className="field-value not-provided">No files uploaded</div>
                                    ) : (
                                        <ul className="files-list">
                                            {files.map((file, idx) => renderFilePreview(file, idx))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'step3' && (
                            <div className="admin-form-view">
                                {standards.includes('ISO 9001') && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">ISO 9001 (Quality Management System)</h3>

                                        <div className="form-field-admin">
                                            <div className="field-label">Design & Development Included in Scope</div>
                                            <div className="field-value">{yesNo(request.iso9001DesignAndDevelopment || additionalInfo?.standardSpecific?.iso9001?.designAndDevelopmentIncluded) || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Other Non-Applicable Clauses</div>
                                            <div className="field-value">{yesNo(request.iso9001OtherNonApplicableClauses || additionalInfo?.standardSpecific?.iso9001?.otherNonApplicable) || 'Not provided'}</div>
                                        </div>

                                        {(String(request.iso9001OtherNonApplicableClauses || '').toLowerCase() === 'yes' || additionalInfo?.standardSpecific?.iso9001?.otherNonApplicable === 'yes') && (
                                            <div className="form-field-admin full-width">
                                                <div className="field-label">Please specify the non-applicable clauses</div>
                                                <div className="field-value">{request.iso9001OtherNonApplicableClausesText || additionalInfo?.standardSpecific?.iso9001?.otherNonApplicableDetails || 'Not provided'}</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {standards.includes('ISO 14001') && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">ISO 14001 (Environmental Management System)</h3>

                                        <div className="form-field-admin">
                                            <div className="field-label">Sites Managed Simultaneously</div>
                                            <div className="field-value">{request.iso14001SitesManaged || additionalInfo?.standardSpecific?.iso14001?.sitesManagedSimultaneously || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Register of Significant Environmental Aspects</div>
                                            <div className="field-value">{yesNo(request.iso14001RegisterOfSignificantAspects || additionalInfo?.standardSpecific?.iso14001?.registerOfSignificantEnvironmentalAspects) || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Environmental Management Manual</div>
                                            <div className="field-value">{yesNo(request.iso14001EnvironmentalManagementManual || additionalInfo?.standardSpecific?.iso14001?.environmentalManagementManual) || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Internal Environmental Audit Programme</div>
                                            <div className="field-value">{yesNo(request.iso14001InternalAuditProgramme || additionalInfo?.standardSpecific?.iso14001?.internalEnvironmentalAuditProgramme) || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Audit Programme Implemented</div>
                                            <div className="field-value">{yesNo(request.iso14001InternalAuditImplemented || additionalInfo?.standardSpecific?.iso14001?.auditProgrammeImplemented) || 'Not provided'}</div>
                                        </div>
                                    </div>
                                )}

                                {standards.includes('ISO 22000') && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">ISO 22000 (Food Safety Management System)</h3>

                                        <div className="form-field-admin">
                                            <div className="field-label">HACCP Implementation or Study Conducted</div>
                                            <div className="field-value">{yesNo(request.iso22000HaccpImplementation || additionalInfo?.standardSpecific?.iso22000?.haccpConducted) || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Number of HACCP Studies</div>
                                            <div className="field-value">{request.iso22000HaccpStudies || additionalInfo?.standardSpecific?.iso22000?.numberOfStudies || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Number of Sites</div>
                                            <div className="field-value">{request.iso22000Sites || additionalInfo?.standardSpecific?.iso22000?.numberOfSites || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Number of Process Lines</div>
                                            <div className="field-value">{request.iso22000ProcessLines || additionalInfo?.standardSpecific?.iso22000?.numberOfProcessLines || 'Not provided'}</div>
                                        </div>

                                        <div className="form-field-admin">
                                            <div className="field-label">Processing Type</div>
                                            <div className="field-value">{request.iso22000ProcessingType || additionalInfo?.standardSpecific?.iso22000?.processingType || 'Not provided'}</div>
                                        </div>
                                    </div>
                                )}

                                {standards.includes('ISO 45001') && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">ISO 45001 (Occupational Health & Safety)</h3>

                                        <div className="form-field-admin">
                                            <div className="field-label">Hazards Identified</div>
                                            <div className="field-value">{yesNo(request.iso45001HazardsIdentified || additionalInfo?.standardSpecific?.iso45001?.hazardsIdentified) || 'Not provided'}</div>
                                        </div>

                                        {(String(request.iso45001HazardsIdentified || '').toLowerCase() === 'yes' || additionalInfo?.standardSpecific?.iso45001?.hazardsIdentified === 'yes') && (
                                            <div className="form-field-admin full-width">
                                                <div className="field-label">Critical Occupational Health & Safety Risks</div>
                                                <div className="field-value">{request.iso45001CriticalRisks || additionalInfo?.standardSpecific?.iso45001?.criticalRisks || 'Not provided'}</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!standards.length && (
                                    <div className="form-section">
                                        <h3 className="form-section-title">Standard-Specific Questions</h3>
                                        <div className="field-value not-provided">No ISO standards selected</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
