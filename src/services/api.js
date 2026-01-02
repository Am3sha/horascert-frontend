import axios from 'axios';

export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';
export const API_PREFIX = String(API_BASE).replace(/\/$/, '').endsWith('/api/v1') ? '' : '/api/v1';
export const toApiUrl = (path) => `${API_BASE}${API_PREFIX}${path}`;

const instance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // CRITICAL: Send cookies in cross-domain requests
    timeout: 60000, // 60 seconds - sufficient for async processing (was 30000)
});

// Add Authorization header from localStorage for all requests
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

instance.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err && err.response ? err.response.status : undefined;
        if (status === 401 || status === 403) {
            // Clear token from localStorage on auth failure
            localStorage.removeItem('token');
            if (typeof window !== 'undefined') {
                const path = window.location && window.location.pathname;
                if (path !== '/login') {
                    window.location.replace('/login');
                }
            }
        }
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
    return handle(instance.get(`${API_PREFIX}/certificates`, { params }));
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

export async function fetchCertificateById(certificateId) {
    return handle(instance.get(`${API_PREFIX}/certificates/certificateId/${certificateId}`));
}

export async function fetchCertificateByNumber(certificateNumber) {
    const encoded = encodeURIComponent((certificateNumber || '').trim());
    return handle(instance.get(`${API_PREFIX}/certificates/${encoded}`));
}

export async function fetchCertificateQrBlob(certificateId) {
    const encoded = encodeURIComponent((certificateId || '').trim());
    const res = await instance.get(`${API_PREFIX}/certificates/${encoded}/qr`, {
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
        return handle(instance.post(`${API_PREFIX}/applications`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }));
    }
    return handle(instance.post(`${API_PREFIX}/applications`, payload));
}

export async function submitContactEmail(payload) {
    return handle(instance.post(`${API_PREFIX}/emails`, payload));
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
    submitContactEmail,
    fetchCertificateQrBlob
};
