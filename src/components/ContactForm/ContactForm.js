import React, { useState } from 'react';
import { submitContactEmail } from '../../services/api';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Numeric validation helper
  const isNumericOnly = (value) => /^[0-9+\-\s()]*$/.test(value);

  // Sanitize and validate form data
  const sanitizeAndValidateForm = (formData, validationRules) => {
    const sanitized = {};
    const errors = {};

    // Sanitize and validate each field
    Object.keys(validationRules).forEach(field => {
      const value = formData[field]?.trim() || '';
      const rules = validationRules[field];

      sanitized[field] = value;

      // Required validation
      if (rules.required && !value) {
        errors[field] = rules.requiredMessage || `${field} is required`;
      }

      // Email validation
      if (rules.email && value && !value.includes('@')) {
        errors[field] = rules.emailMessage || 'Please enter a valid email address';
      }

      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} must be at least ${rules.minLength} characters`;
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
      }
    });

    return { sanitized, errors };
  };

  // Sanitize data for submission
  const sanitizeForSubmission = (value) => {
    if (typeof value !== 'string') return value;
    return value.trim().replace(/[<>]/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone field: allow only numeric characters, +, -, spaces, and parentheses
    if (name === 'phone' && !isNumericOnly(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Phone number can only contain digits, +, -, spaces, and parentheses'
      }));
      return;
    }

    // Enforce max length for message field
    if (name === 'message' && value.length > 2000) {
      return; // Prevent setting value beyond max length
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const validationRules = {
      name: {
        required: true,
        requiredMessage: 'Name is required',
        minLength: 2,
        maxLength: 100
      },
      email: {
        required: true,
        requiredMessage: 'Email is required',
        email: true,
        emailMessage: 'Please enter a valid email address'
      },
      phone: {
        required: true,
        requiredMessage: 'Phone is required',
        minLength: 8,
        maxLength: 20
      },
      subject: {
        required: true,
        requiredMessage: 'Subject is required',
        minLength: 3,
        maxLength: 200
      },
      message: {
        required: true,
        requiredMessage: 'Message is required',
        minLength: 10,
        maxLength: 2000
      }
    };

    const { sanitized, errors: validationErrors } = sanitizeAndValidateForm(formData, validationRules);
    setFormData(sanitized);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Check if backend is enabled via environment variable
      const backendEnabled = process.env.REACT_APP_BACKEND_ENABLED === "true";

      // Prepare sanitized data
      const sanitizedData = {
        name: sanitizeForSubmission(formData.name),
        email: sanitizeForSubmission(formData.email),
        phone: sanitizeForSubmission(formData.phone),
        subject: sanitizeForSubmission(formData.subject),
        message: sanitizeForSubmission(formData.message),
        type: 'contact'
      };



      if (backendEnabled) {

        const responseData = await submitContactEmail(sanitizedData);

        if (responseData && responseData.success) {
          setSubmitStatus("success");
          setErrorMessage(null);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        } else {
          const backendError =
            (responseData && (responseData.message || responseData.error)) ||
            (responseData && Array.isArray(responseData.errors) && responseData.errors[0] && responseData.errors[0].msg) ||
            "Failed to send message. Please try again.";
          setErrorMessage(backendError);
          setSubmitStatus("error");
        }
      } else {
        // Fallback: show warning if backend is not enabled
        setErrorMessage(null);
        setSubmitStatus("warning");
      }
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }

    // Clear message after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="contact-form-section">
      <div className="container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone <span className="required">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="+20 XXX XXX XXXX"
                inputMode="numeric"
                pattern="[0-9+\-\s()]*"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject <span className="required">*</span></label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? 'error' : ''}
                placeholder="What is this regarding?"
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span className="required">*</span></label>
            <div style={{ position: 'relative' }}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                rows="6"
                placeholder="Tell us about your requirements..."
                maxLength="2000"
              ></textarea>
              <div style={{
                fontSize: '12px',
                color: formData.message.length >= 1800 ? '#dc2626' : '#6b7280',
                marginTop: '4px',
                textAlign: 'right'
              }}>
                {formData.message.length} / 2000 characters
              </div>
            </div>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {submitStatus === 'success' && (
            <div className="success-message">
              ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}

          {submitStatus === 'warning' && (
            <div className="warning-message" style={{ padding: '16px', backgroundColor: '#fef3cd', color: '#856404', borderRadius: '4px', marginBottom: '20px' }}>
              ⚠ Thank you for your message. Our contact service is being configured. We will contact you shortly.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message" style={{ padding: '16px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '20px' }}>
              ✗ {errorMessage || "There was an error sending your message. Please try again or contact us directly."}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

