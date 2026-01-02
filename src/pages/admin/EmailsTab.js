import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    deleteEmail,
    fetchEmails,
    replyToEmail,
    updateEmailStatus
} from '../../services/api';

export default function EmailsTab({ onError, onSuccess }) {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [replyingId, setReplyingId] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchEmails({ page: 1, limit: 100 });
            if (res && res.success) {
                setEmails(res.data || []);
            } else {
                setEmails([]);
                if (onError) onError((res && (res.message || res.error)) || 'Failed to fetch emails');
            }
        } catch (err) {
            setEmails([]);
            if (onError) onError((err && err.message) || 'Failed to fetch emails');
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

    const formatMessage = (message) => {
        if (!message) return '';
        // Safely display message, truncate to 2000 chars if needed
        const truncated = message.substring(0, 2000);
        // Replace line breaks with spaces for table display, or show full with line breaks in tooltip
        return truncated;
    };


    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await updateEmailStatus(id, newStatus);
            if (!res || !res.success) {
                if (onError) onError((res && (res.message || res.error)) || 'Failed to update email status');
                return;
            }
            if (onSuccess) onSuccess('Email status updated');
            load();
        } catch (err) {
            if (onError) onError((err && err.message) || 'Failed to update email');
        }
    };

    const handleReply = async (emailId) => {
        if (!emailId) return;
        const replyMessage = window.prompt('Reply message:');
        if (!replyMessage) return;

        setReplyingId(emailId);
        try {
            const res = await replyToEmail(emailId, replyMessage);
            if (!res || !res.success) {
                if (onError) onError((res && (res.message || res.error)) || 'Failed to send reply');
                return;
            }
            if (onSuccess) onSuccess('Reply sent');
            load();
        } catch (err) {
            if (onError) onError((err && err.message) || 'Failed to send reply');
        } finally {
            setReplyingId(null);
        }
    };

    const handleDelete = (emailId) => {
        if (!emailId) return;

        // Show confirmation toast with action buttons
        const toastId = toast(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ flex: 1 }}>Delete this email?</span>
                <button
                    onClick={() => {
                        toast.dismiss(toastId);
                        performDelete(emailId);
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

    const performDelete = async (emailId) => {
        setDeletingId(emailId);
        try {
            const res = await deleteEmail(emailId);
            if (!res || !res.success) {
                toast.error((res && (res.message || res.error)) || 'Failed to delete email');
                return;
            }
            toast.success('Email deleted successfully');
            load();
        } catch (err) {
            toast.error((err && err.message) || 'Failed to delete email');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="tab-panel">
            <div className="panel-header">
                <h2>Contact Messages</h2>
            </div>

            {loading ? (
                <div className="loading">Loading emails...</div>
            ) : emails.length === 0 ? (
                <div className="empty-state">
                    <p>No emails found</p>
                </div>
            ) : (
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.map((email) => (
                                <tr key={email._id}>
                                    <td>{email.senderName}</td>
                                    <td>{email.senderEmail}</td>
                                    <td>{email.senderPhone}</td>
                                    <td className="full-text-cell">{email.subject}</td>
                                    <td className="full-text-cell" title={formatMessage(email.message)}>
                                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'inherit' }}>
                                            {formatMessage(email.message)}
                                        </pre>
                                    </td>
                                    <td>{formatDate(email.createdAt)}</td>
                                    <td>{email.status}</td>
                                    <td className="actions-cell">
                                        <select
                                            value={email.status}
                                            onChange={(e) => handleUpdateStatus(email._id, e.target.value)}
                                            className="status-select"
                                            aria-label="Update email status"
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <button
                                            type="button"
                                            className="btn-action btn-edit"
                                            onClick={() => handleReply(email._id)}
                                            disabled={replyingId === email._id}
                                        >
                                            {replyingId === email._id ? 'Replying...' : 'Reply'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-action btn-delete"
                                            onClick={() => handleDelete(email._id)}
                                            disabled={deletingId === email._id}
                                        >
                                            {deletingId === email._id ? 'Deleting...' : 'Delete'}
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
