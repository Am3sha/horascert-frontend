import axios from 'axios';

export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';
export const API_PREFIX = String(API_BASE).replace(/\/$/, '').endsWith('/api/v1') ? '' : '/api/v1';
export const toApiUrl = (path) => `${API_BASE}${API_PREFIX}${path}`;

// ========================================================================
// PROTECTED INSTANCE: For authenticated admin endpoints
// Includes auth token, handles 401 by redirecting to login
// ========================================================================
const instance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // CRITICAL: Send cookies in cross-domain requests
    timeout: 60000, // 60 seconds - sufficient for async processing (was 30000)
});

// Add Authorization header from localStorage for authenticated requests
// This acts as fallback if cookies are not sent
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Only add Authorization header if not already present
        if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    // Ensure withCredentials is set on every request
    config.withCredentials = true;
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Handle 401/403 for protected endpoints ONLY
// Redirect to login only when accessing admin endpoints (not public routes)
instance.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err && err.response ? err.response.status : undefined;
        if (status === 401 || status === 403) {
            // Clear token from localStorage on auth failure
            localStorage.removeItem('token');
            if (typeof window !== 'undefined') {
                const path = window.location && window.location.pathname;
                // ONLY redirect to login for admin/protected routes
                // Don't redirect for public routes like /certificate, /application, /contact
                const isProtectedRoute = path && (
                    path === '/dashboard' ||
                    path.startsWith('/admin/') ||
                    path === '/login'
                );
                if (isProtectedRoute && path !== '/login') {
                    window.location.replace('/login');
                }
                // If public route, just reject the error and let component handle it
            }
        }
        return Promise.reject(err);
    }
);

// ========================================================================
// PUBLIC INSTANCE: For public endpoints (certificates, applications, etc)
// NO auth interceptor, NO redirect on 401
// Allows public access without requiring authentication
// ========================================================================
const publicInstance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 60000,
});

// Public instance: no auth interceptor, no redirect logic
// Let errors be handled by the component or handler function
publicInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        // Public endpoints don't redirect to login on error
        // Errors are returned to calling function for handling
        return Promise.reject(err);
    }
);


async function handle(req) {
    try {
        const res = await req;
        if (res && res.data && typeof res.data === 'object' && Object.prototype.hasOwnProperty.call(res.data, 'success')) {
            return res.data;
        }
        return { success: true, data: res.data };
    } catch (err) {
        if (err && err.response && err.response.data && typeof err.response.data === 'object') {
            return err.response.data;
        }
        const error = err && err.message ? err.message : 'Request failed';
        return { success: false, error };
    }
}

export async function fetchEmails(params = {}) {
    return handle(instance.get(`${API_PREFIX}/admin/emails`, { params }));
}

export async function fetchApplications(params = {}) {
    return handle(instance.get(`${API_PREFIX}/admin/applications`, { params }));
}

export async function fetchApplicationById(id) {
    return handle(instance.get(`${API_PREFIX}/admin/applications/${id}`));
}

export async function updateApplicationStatus(id, status) {
    return handle(instance.put(`${API_PREFIX}/admin/applications/${id}`, { status }));
}

export async function updateApplication(id, payload) {
    return handle(instance.put(`${API_PREFIX}/admin/applications/${id}`, payload));
}

export async function updateEmailStatus(id, status) {
    return handle(instance.put(`${API_PREFIX}/admin/emails/${id}/status`, { status }));
}

export async function fetchCertificates(params = {}) {
    return handle(publicInstance.get(`${API_PREFIX}/certificates`, { params }));
}

export async function createCertificate(payload) {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;

    try {
        let response;
        if (isFormData) {
            response = await instance.post(`${API_PREFIX}/certificates`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 60000 // Explicit timeout for this operation
            });
        } else {
            response = await instance.post(`${API_PREFIX}/certificates`, payload, {
                timeout: 60000
            });
        }

        // Handle both 201 (Created) and 202 (Accepted - async processing)
        if (response && response.status && (response.status === 201 || response.status === 202)) {
            return {
                success: true,
                ...response.data
            };
        }

        return handle(response);
    } catch (err) {
        // Log timeout errors specifically
        if (err.code === 'ECONNABORTED') {
            return {
                success: false,
                error: 'Timeout',
                message: 'Certificate creation is taking longer than expected. Please try again.'
            };
        }
        return handle(err);
    }
}

// PUBLIC: Fetch certificate by ID (no auth required)
// Uses publicInstance to prevent auth redirect on 401
export async function fetchCertificateById(certificateId) {
    return handle(publicInstance.get(`${API_PREFIX}/certificates/certificateId/${certificateId}`));
}

// PUBLIC: Fetch certificate by number (no auth required)
// Uses publicInstance to prevent auth redirect on 401
export async function fetchCertificateByNumber(certificateNumber) {
    const encoded = encodeURIComponent((certificateNumber || '').trim());
    return handle(publicInstance.get(`${API_PREFIX}/certificates/${encoded}`));
}

export async function fetchCertificateQrBlob(certificateId) {
    const encoded = encodeURIComponent((certificateId || '').trim());
    const res = await publicInstance.get(`${API_PREFIX}/certificates/${encoded}/qr`, {
        responseType: 'blob'
    });
    return res.data;
}

export async function deleteCertificateById(certificateId) {
    return handle(instance.delete(`${API_PREFIX}/certificates/certificateId/${certificateId}`));
}

export async function updateCertificateById(certificateId, payload) {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    if (isFormData) {
        return handle(instance.put(`${API_PREFIX}/certificates/certificateId/${certificateId}`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
    return handle(instance.put(`${API_PREFIX}/certificates/certificateId/${certificateId}`, payload));
}

export async function deleteApplicationById(applicationId) {
    return handle(instance.delete(`${API_PREFIX}/admin/applications/${applicationId}`));
}

export async function deleteEmail(id) {
    return handle(instance.delete(`${API_PREFIX}/admin/emails/${id}`));
}

export async function replyToEmail(emailId, replyMessage) {
    return handle(instance.post(`${API_PREFIX}/admin/emails/${emailId}/reply`, { replyMessage }));
}

export async function adminLogin(email, password) {
    try {
        const response = await instance.post(`${API_PREFIX}/auth/login`, { email, password });

        return handle(response);
    } catch (error) {

        return handle(error);
    }
}

export async function adminLogout() {
    try {
        // Clear localStorage token
        localStorage.removeItem('token');
        // Call backend logout to clear cookie
        const response = await handle(instance.post(`${API_PREFIX}/auth/logout`));
        return response;
    } catch (error) {
        // Still clear localStorage even if backend call fails
        localStorage.removeItem('token');
        return { success: true, message: 'Logged out successfully' };
    }
}

export async function verifyAuth() {
    return handle(instance.get(`${API_PREFIX}/auth/verify`));
}

export async function submitApplication(payload) {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    if (isFormData) {
        return handle(publicInstance.post(`${API_PREFIX}/applications`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
    return handle(publicInstance.post(`${API_PREFIX}/applications`, payload));
}

export async function submitContactEmail(payload) {
    return handle(publicInstance.post(`${API_PREFIX}/emails`, payload));
}

export default {
    fetchEmails,
    fetchApplications,
    fetchApplicationById,
    updateApplicationStatus,
    updateApplication,
    updateEmailStatus,
    deleteApplicationById,
    fetchCertificates,
    createCertificate,
    fetchCertificateById,
    fetchCertificateByNumber,
    deleteCertificateById,
    updateCertificateById,
    deleteEmail,
    replyToEmail,
    adminLogin,
    adminLogout,
    verifyAuth,
    submitApplication,
    submitContactEmail
    // fetchCertificateQrBlob - DEPRECATED: QR codes now generated in Frontend using qrcode.react and qrcode libraries
};
