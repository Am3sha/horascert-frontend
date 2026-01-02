import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    deleteApplicationById,
    fetchApplications,
    updateApplicationStatus
} from '../../services/api';

export default function ApplicationsTab({ onError, onSuccess }) {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchApplications({ page: 1, limit: 100 });
            if (res && res.success) {
                setApplications(res.data || []);
            } else {
                setApplications([]);
                if (onError) onError((res && (res.message || res.error)) || 'Failed to fetch applications');
            }
        } catch (err) {
            setApplications([]);
            if (onError) onError((err && err.message) || 'Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    }, [onError]);

    useEffect(() => {
        load();
    }, [load]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await updateApplicationStatus(id, newStatus);
            if (!res || !res.success) {
                if (onError) onError((res && (res.message || res.error)) || 'Failed to update status');
                return;
            }
            if (onSuccess) onSuccess('Status updated successfully');
            load();
        } catch (err) {
            if (onError) onError((err && err.message) || 'Failed to update status');
        }
    };

    const handleDelete = (id) => {
        if (!id) return;

        // Show confirmation toast with action buttons
        const toastId = toast(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ flex: 1 }}>Delete this application?</span>
                <button
                    onClick={() => {
                        toast.dismiss(toastId);
                        performDelete(id);
                    }}
                    style={{
                        padding: '4px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        background: '#dc2626',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => toast.dismiss(toastId)}
                    style={{
                        padding: '4px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: '#f3f4f6',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Cancel
                </button>
            </div>,
            {
                duration: 10000, // 10 seconds to decide
                position: 'top-right',
                style: {
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    color: '#111827',
                    padding: '12px 16px'
                }
            }
        );
    };

    const performDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await deleteApplicationById(id);
            if (!res || !res.success) {
                toast.error((res && (res.message || res.error)) || 'Failed to delete application');
                return;
            }
            toast.success('Application deleted successfully');
            load();
        } catch (err) {
            toast.error((err && err.message) || 'Failed to delete application');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="tab-panel">
            <div className="panel-header">
                <h2>Applications</h2>
            </div>

            {loading ? (
                <div className="loading">Loading applications...</div>
            ) : applications.length === 0 ? (
                <div className="empty-state">
                    <p>No applications found</p>
                </div>
            ) : (
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Telephone</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Programme</th>
                                <th>Standards</th>
                                <th>Files</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id}>
                                    <td>{app.companyName || '-'}</td>
                                    <td>{app.phone || '-'}</td>
                                    <td>{app.email || '-'}</td>
                                    <td>{app.country || '-'}</td>
                                    <td className="message-cell" title={app.programme || ''}>{app.programme || '-'}</td>
                                    <td className="message-cell" title={(app.standards || []).join(', ')}>{(app.standards || []).join(', ') || '-'}</td>
                                    <td>{Array.isArray(app.files) ? app.files.length : 0}</td>
                                    <td>{formatDate(app.createdAt)}</td>
                                    <td>{app.status}</td>
                                    <td className="actions-cell">
                                        <select
                                            value={app.status}
                                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                                            className="status-select"
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
                                            onClick={() => navigate(`/admin/requests/${app._id}`)}
                                            className="btn-action btn-view"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="btn-action btn-delete"
                                            disabled={deletingId === app._id}
                                            type="button"
                                        >
                                            {deletingId === app._id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
