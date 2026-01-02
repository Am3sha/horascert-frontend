import React, { useMemo } from 'react';

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export default function PaginationControls({ page, limit, total, onPageChange }) {
    const totalPages = useMemo(() => {
        const safeLimit = Math.max(1, parseInt(limit, 10) || 1);
        const safeTotal = Math.max(0, parseInt(total, 10) || 0);
        return Math.max(1, Math.ceil(safeTotal / safeLimit));
    }, [limit, total]);

    const currentPage = clamp(parseInt(page, 10) || 1, 1, totalPages);

    const pages = useMemo(() => {
        const windowSize = 5;
        const half = Math.floor(windowSize / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + windowSize - 1);
        start = Math.max(1, end - windowSize + 1);
        const out = [];
        for (let p = start; p <= end; p += 1) out.push(p);
        return out;
    }, [currentPage, totalPages]);

    if (!total || total <= limit) {
        return null;
    }

    return (
        <div className="pagination">
            <button
                className="pagination-btn"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                type="button"
            >
                Previous
            </button>

            <div className="pagination-pages">
                {pages.map((p) => (
                    <button
                        key={p}
                        className={`pagination-btn ${p === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(p)}
                        type="button"
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button
                className="pagination-btn"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                type="button"
            >
                Next
            </button>

            <div className="pagination-info">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
}
