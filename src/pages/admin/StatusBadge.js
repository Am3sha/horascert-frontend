import React from 'react';

export default function StatusBadge({ status }) {
    const text = status == null ? '' : String(status);
    const cls = `status-badge status-${text.toLowerCase()}`;
    return <span className={cls}>{text}</span>;
}
