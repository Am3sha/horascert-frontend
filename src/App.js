import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { verifyAuth } from './services/api';
import { Toaster } from 'react-hot-toast';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Clients = lazy(() => import('./pages/Clients'));
const Application = lazy(() => import('./pages/Application'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminRequests = lazy(() => import('./pages/AdminRequests'));
const AdminRequestDetail = lazy(() => import('./pages/AdminRequestDetail'));
const CertificateDetail = lazy(() => import('./pages/CertificateDetail'));
const CertificateView = lazy(() => import('./pages/CertificateView'));
const CertificationValidation = lazy(() => import('./pages/CertificationValidation'));
const HorasCertServices = lazy(() => import('./pages/HorasCertServices'));
const AccreditationsRegistrations = lazy(() => import('./pages/AccreditationsRegistrations'));
const IsoCertificationServices = lazy(() => import('./pages/IsoCertificationServices'));
const QualityPolicy = lazy(() => import('./pages/QualityPolicy'));
const ImpartialityPolicy = lazy(() => import('./pages/ImpartialityPolicy'));
const ConfidentialityPolicy = lazy(() => import('./pages/ConfidentialityPolicy'));

function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      fontSize: '18px',
      color: '#0066cc'
    }}>
      Loading...
    </div>
  );
}

function AppContent() {
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Single auth check on app mount only
  // This is the definitive source of truth
  // Runs once, never again - prevents race conditions, ESLint clean
  useEffect(() => {
    let mounted = true;
    let intervalId;

    const initAuth = async () => {
      try {
        const res = await verifyAuth();
        if (mounted) {
          setIsAdmin(!!(res && res.success));
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    initAuth();

    // Re-verify auth every 10 minutes (keeps session fresh)
    intervalId = window.setInterval(() => {
      initAuth();
    }, 10 * 60 * 1000);

    return () => {
      mounted = false;
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (authLoading) {
      return <Loading />;
    }
    if (!isAdmin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Hide navbar and footer on admin pages
  const isAdminPath = location.pathname === '/dashboard' || location.pathname.startsWith('/admin/') || location.pathname === '/login';
  const hideNavbarAndFooter = isAdminPath;

  return (
    <div className="app-layout">
      {!hideNavbarAndFooter && <Navbar />}
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Default route → home */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute>
                  <AdminRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests/:id"
              element={
                <ProtectedRoute>
                  <AdminRequestDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/certificates/:certificateNumber" element={<CertificateDetail />} />
            <Route path="/certificate/:certificateId" element={<CertificateView />} />
            <Route path="/application" element={<Application />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/horas-cert-services" element={<HorasCertServices />} />
            <Route path="/about/accreditations-registrations" element={<AccreditationsRegistrations />} />
            <Route path="/about/iso-certification-services" element={<IsoCertificationServices />} />
            <Route path="/about/quality-policy" element={<QualityPolicy />} />
            <Route path="/about/impartiality-policy" element={<ImpartialityPolicy />} />
            <Route path="/about/confidentiality-policy" element={<ConfidentialityPolicy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/certification-validation" element={<CertificationValidation />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/clients" element={<Clients />} />
            {/* Catch-all → redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
