import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        // Log errors and component stack for debugging/monitoring (Sentry, etc.)
        // Production-ready: Remove console logs for production
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 40, textAlign: 'center' }}>
                    <h2>Something went wrong.</h2>
                    <p>Please refresh the page or contact support if the problem persists.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
