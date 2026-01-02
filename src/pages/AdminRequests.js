import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApplications } from '../services/api';
import PaginationControls from './admin/PaginationControls';
import StatusBadge from './admin/StatusBadge';
import './AdminDashboard.css';

export default function AdminRequests() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [page, setPage] = useState(1);
    const [limit] = useState(25);
    const [total, setTotal] = useState(0);

    const [status, setStatus] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [search, setSearch] = useState('');

    const params = useMemo(() => {
        const out = { page, limit };
        if (status) out.status = status;
        if (from) out.from = from;
        if (to) out.to = to;
        if (search) out.search = search;
        return out;
    }, [page, limit, status, from, to, search]);

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetchApplications(params);
            if (res && res.success) {
                setRequests(res.data || []);
                setTotal(typeof res.total === 'number' ? res.total : 0);
            } else {
                setRequests([]);
                setTotal(0);
                setError((res && (res.message || res.error)) || 'Failed to fetch requests');
            }
        } catch (err) {
            setRequests([]);
            setTotal(0);
            setError((err && err.message) || 'Failed to fetch requests');
        } finally {
            setLoading(false);
        }
    }, [params]);

    useEffect(() => {
        load();
    }, [load]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleApplyFilters = (e) => {
        e.preventDefault();
        setPage(1);
        load();
    };

    const shortId = (id) => {
        const text = id == null ? '' : String(id);
        if (text.length <= 10) return text;
        return `${text.slice(0, 6)}...${text.slice(-4)}`;
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Requests</h1>
                    <p>Admin-only requests dashboard</p>
                </div>
                <div className="header-right">
                    <button onClick={() => navigate('/dashboard')} className="btn-primary" type="button">
                        Back to Admin Dashboard
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
                <div className="panel-header" style={{ gap: 12, flexWrap: 'wrap' }}>
                    <h2 style={{ marginRight: 'auto' }}>Client Requests</h2>
                    <div className="header-stats">
                        <span>Total: {total}</span>
                    </div>
                </div>

                <form onSubmit={handleApplyFilters} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12, marginBottom: 18 }}>
                    <div style={{ gridColumn: 'span 3' }}>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6 }}>Status</label>
                        <select className="status-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="approved">Approved</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div style={{ gridColumn: 'span 3' }}>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6 }}>From</label>
                        <input className="status-select" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                    </div>

                    <div style={{ gridColumn: 'span 3' }}>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6 }}>To</label>
                        <input className="status-select" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                    </div>

                    <div style={{ gridColumn: 'span 3' }}>
                        <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6 }}>Search</label>
                        <input
                            className="status-select"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Company / Contact / Email"
                        />
                    </div>

                    <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                        <button className="btn-primary" type="submit" style={{ background: '#28a745' }}>
                            Apply Filters
                        </button>
                        <button
                            className="btn-primary"
                            type="button"
                            onClick={() => {
                                setStatus('');
                                setFrom('');
                                setTo('');
                                setSearch('');
                                setPage(1);
                            }}
                            style={{ background: '#64748b' }}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {loading ? (
                    <div className="loading">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="empty-state">
                        <p>No requests found</p>
                    </div>
                ) : (
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Company Name</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req._id}>
                                        <td className="cert-number" title={req._id}>{shortId(req._id)}</td>
                                        <td>{req.companyName || '-'}</td>
                                        <td>{req.clientName || '-'}</td>
                                        <td><StatusBadge status={req.status} /></td>
                                        <td>{formatDate(req.createdAt)}</td>
                                        <td className="actions-cell">
                                            <button
                                                type="button"
                                                className="btn-action btn-view"
                                                onClick={() => navigate(`/admin/requests/${req._id}`)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <PaginationControls
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={(p) => setPage(p)}
                />
            </div>
        </div>
    );
}
