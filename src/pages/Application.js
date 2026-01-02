import React, { useState } from 'react';
import './Application.css';

// Country list
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
  'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
  'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
  'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].sort();

// Numeric validation function
const isNumericOnly = (value) => /^[0-9]*$/.test(value);

const Application = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    telephone: '',
    fax: '',
    email: '',
    website: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',

    executiveManagerName: '',
    executiveManagerMobile: '',
    executiveManagerEmail: '',

    contactPersonName: '',
    contactPersonPosition: '',
    contactPersonMobile: '',
    contactPersonEmail: '',

    workforceTotalEmployees: '',
    workforceEmployeesPerShift: '',
    workforceNumberOfShifts: '',
    workforceSeasonalEmployees: '',

    desiredStandards: [],
    certificationProgramme: '',
    transferReason: '',
    transferExpiringDate: '',

    iso9001DesignAndDevelopment: '',
    iso9001OtherNonApplicableClauses: '',
    iso9001OtherNonApplicableClausesText: '',

    iso14001SitesManaged: '',
    iso14001RegisterOfSignificantAspects: '',
    iso14001EnvironmentalManagementManual: '',
    iso14001InternalAuditProgramme: '',
    iso14001InternalAuditImplemented: '',

    iso22000HaccpImplementation: '',
    iso22000HaccpStudies: '',
    iso22000Sites: '',
    iso22000ProcessLines: '',
    iso22000ProcessingType: '',

    iso45001HazardsIdentified: '',
    iso45001CriticalRisks: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [dropActive, setDropActive] = useState(false);
  const [openPanels, setOpenPanels] = useState({
    iso9001: true,
    iso14001: false,
    iso22000: false,
    iso45001: false
  });

  const standardsList = [
    { value: 'ISO 9001', label: 'ISO 9001' },
    { value: 'ISO 22000', label: 'ISO 22000' },
    { value: 'ISO 14001', label: 'ISO 14001' },
    { value: 'ISO 45001', label: 'ISO 45001' }
  ];

  const setField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'desiredStandards') {
      const next = [...formData.desiredStandards];
      if (checked) {
        next.push(value);
      } else {
        const idx = next.indexOf(value);
        if (idx > -1) next.splice(idx, 1);
      }
      setField(name, next);
      return;
    }

    // Numeric-only fields: phone, fax, postal code, workforce numbers
    const numericOnlyFields = [
      'telephone', 'executiveManagerMobile', 'contactPersonMobile', 'fax',
      'postalCode', 'workforceTotalEmployees', 'workforceEmployeesPerShift',
      'workforceNumberOfShifts', 'workforceSeasonalEmployees'
    ];

    if (numericOnlyFields.includes(name)) {
      if (value === '' || isNumericOnly(value)) {
        setField(name, value);
        // Clear numeric error when valid
        if (errors[name] === 'Numbers only are allowed') {
          setErrors((prev) => ({
            ...prev,
            [name]: ''
          }));
        }
      } else {
        // Set error for non-numeric input
        setErrors((prev) => ({
          ...prev,
          [name]: 'Numbers only are allowed'
        }));
      }
      return;
    }

    setField(name, value);
  };

  const validateStep = (targetStep) => {
    const validationRules = {};

    if (targetStep === 1) {
      validationRules.companyName = {
        required: true,
        requiredMessage: 'Name of Company is required',
        minLength: 2,
        maxLength: 200
      };
      validationRules.telephone = {
        required: true,
        requiredMessage: 'Telephone No. is required',
        minLength: 6,
        maxLength: 30
      };
      validationRules.email = {
        required: true,
        requiredMessage: 'Email is required',
        email: true,
        emailMessage: 'Please enter a valid email address'
      };
      validationRules.website = {
        required: false,
        url: true,
        urlMessage: 'Please enter a valid URL'
      };
      validationRules.addressLine1 = {
        required: true,
        requiredMessage: 'Address Line 1 is required',
        minLength: 2,
        maxLength: 200
      };
      validationRules.city = {
        required: true,
        requiredMessage: 'City is required',
        minLength: 2,
        maxLength: 100
      };
      validationRules.country = {
        required: true,
        requiredMessage: 'Country is required',
        minLength: 2,
        maxLength: 100
      };
      validationRules.executiveManagerMobile = {
        required: true,
        requiredMessage: 'Executive Manager Mobile No. is required',
        minLength: 6,
        maxLength: 30
      };
    }

    if (targetStep === 2) {
      validationRules.certificationProgramme = {
        required: true,
        requiredMessage: 'Certification programme is required',
        minLength: 2,
        maxLength: 50
      };
    }

    // Basic validation without sanitization
    const errors = {};

    // Check required fields
    for (const [key, rules] of Object.entries(validationRules)) {
      const value = formData[key];

      if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors[key] = rules.requiredMessage || `${key} is required`;
        continue;
      }

      // Skip other validations if field is empty and not required
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        continue;
      }

      // Email validation
      if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        errors[key] = rules.emailMessage || 'Please enter a valid email address';
        continue;
      }

      // Length validation
      if (rules.minLength && value.trim().length < rules.minLength) {
        errors[key] = rules.minLengthMessage || `Minimum length is ${rules.minLength} characters`;
        continue;
      }

      if (rules.maxLength && value.trim().length > rules.maxLength) {
        errors[key] = rules.maxLengthMessage || `Maximum length is ${rules.maxLength} characters`;
        continue;
      }
    }

    const validationErrors = errors;

    if (targetStep === 2) {
      if (!Array.isArray(formData.desiredStandards) || formData.desiredStandards.length === 0) {
        validationErrors.desiredStandards = 'Please select at least one desired standard';
      }
      if (formData.certificationProgramme === 'Transfer') {
        if (!formData.transferReason) {
          validationErrors.transferReason = 'Reason for transfer is required';
        }
        if (!formData.transferExpiringDate) {
          validationErrors.transferExpiringDate = 'Expiring date of certificate is required';
        }
      }
    }

    if (targetStep === 3) {
      if (formData.desiredStandards.includes('ISO 9001')) {
        if (!formData.iso9001DesignAndDevelopment) {
          validationErrors.iso9001DesignAndDevelopment = 'Required';
        }
        if (!formData.iso9001OtherNonApplicableClauses) {
          validationErrors.iso9001OtherNonApplicableClauses = 'Required';
        }
        if (formData.iso9001OtherNonApplicableClauses === 'Yes' && !formData.iso9001OtherNonApplicableClausesText) {
          validationErrors.iso9001OtherNonApplicableClausesText = 'Please specify the non-applicable clauses';
        }
      }

      if (formData.desiredStandards.includes('ISO 14001')) {
        if (!formData.iso14001SitesManaged) {
          validationErrors.iso14001SitesManaged = 'Required';
        }
        if (!formData.iso14001RegisterOfSignificantAspects) {
          validationErrors.iso14001RegisterOfSignificantAspects = 'Required';
        }
        if (!formData.iso14001EnvironmentalManagementManual) {
          validationErrors.iso14001EnvironmentalManagementManual = 'Required';
        }
        if (!formData.iso14001InternalAuditProgramme) {
          validationErrors.iso14001InternalAuditProgramme = 'Required';
        }
        if (formData.iso14001InternalAuditProgramme === 'Yes' && !formData.iso14001InternalAuditImplemented) {
          validationErrors.iso14001InternalAuditImplemented = 'Required';
        }
      }

      if (formData.desiredStandards.includes('ISO 22000')) {
        if (!formData.iso22000HaccpImplementation) {
          validationErrors.iso22000HaccpImplementation = 'Required';
        }
      }

      if (formData.desiredStandards.includes('ISO 45001')) {
        if (!formData.iso45001HazardsIdentified) {
          validationErrors.iso45001HazardsIdentified = 'Required';
        }
        if (formData.iso45001HazardsIdentified === 'Yes' && !formData.iso45001CriticalRisks) {
          validationErrors.iso45001CriticalRisks = 'Please describe critical risks';
        }
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const togglePanel = (key) => {
    setOpenPanels((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Determine which ISO standards should be shown based on user selection
  const getVisibleISOStandards = () => {
    const visible = {};
    visible.iso9001 = formData.desiredStandards.includes('ISO 9001');
    visible.iso14001 = formData.desiredStandards.includes('ISO 14001');
    visible.iso22000 = formData.desiredStandards.includes('ISO 22000');
    visible.iso45001 = formData.desiredStandards.includes('ISO 45001');
    return visible;
  };

  const setYesNo = (name, value) => {
    setField(name, value);
  };

  const handleFilesChange = (e) => {
    const files = Array.from((e && e.target && e.target.files) ? e.target.files : []);
    if (files.length === 0) {
      setAttachedFiles([]);
      return;
    }

    // Store the actual File objects, not Base64
    setAttachedFiles(files);
  };

  const addFiles = (files) => {
    const incoming = Array.from(files || []);
    if (incoming.length === 0) return;
    setAttachedFiles((prev) => [...prev, ...incoming]);
    if (errors.files) {
      setErrors((prev) => ({
        ...prev,
        files: ''
      }));
    }
  };

  const removeFileAt = (idx) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDropActive(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError('');

    // Create FormData for multipart/form-data upload
    const payload = new FormData();

    // Helper function to check if a value is truly filled by user
    const isFilled = (value) => {
      if (value === '' || value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    };

    // Helper function to append only filled values
    const appendIfFilled = (key, value) => {
      if (isFilled(value)) {
        payload.append(key, value);
      }
    };

    // Determine which ISO standards user selected
    const selectedISO = {
      iso9001: formData.desiredStandards.includes('ISO 9001'),
      iso14001: formData.desiredStandards.includes('ISO 14001'),
      iso22000: formData.desiredStandards.includes('ISO 22000'),
      iso45001: formData.desiredStandards.includes('ISO 45001')
    };

    // Add core company information - always required
    appendIfFilled('companyName', formData.companyName);
    appendIfFilled('contactEmail', formData.email);
    appendIfFilled('contactPhone', formData.telephone);
    appendIfFilled('contactPersonName', formData.contactPersonName || formData.executiveManagerName);
    appendIfFilled('contactPersonPosition', formData.contactPersonPosition);
    appendIfFilled('standards', JSON.stringify(formData.desiredStandards));

    // Add contact information - only if filled
    appendIfFilled('telephone', formData.telephone);
    appendIfFilled('fax', formData.fax);
    appendIfFilled('email', formData.email);
    appendIfFilled('website', formData.website);
    appendIfFilled('addressLine1', formData.addressLine1);
    appendIfFilled('addressLine2', formData.addressLine2);
    appendIfFilled('city', formData.city);
    appendIfFilled('state', formData.state);
    appendIfFilled('postalCode', formData.postalCode);
    appendIfFilled('country', formData.country);

    // Add management contacts - only if filled
    appendIfFilled('executiveManagerName', formData.executiveManagerName);
    appendIfFilled('executiveManagerMobile', formData.executiveManagerMobile);
    appendIfFilled('executiveManagerEmail', formData.executiveManagerEmail);

    // Add contact person - only if filled
    appendIfFilled('contactPersonMobile', formData.contactPersonMobile);
    appendIfFilled('contactPersonEmail', formData.contactPersonEmail);

    // Add workforce data - only if filled
    appendIfFilled('workforceTotalEmployees', formData.workforceTotalEmployees);
    appendIfFilled('workforceEmployeesPerShift', formData.workforceEmployeesPerShift);
    appendIfFilled('workforceNumberOfShifts', formData.workforceNumberOfShifts);
    appendIfFilled('workforceSeasonalEmployees', formData.workforceSeasonalEmployees);

    // Add certification program - only if filled
    appendIfFilled('certificationProgramme', formData.certificationProgramme);

    // Add transfer info only if certification programme is "Transfer"
    if (formData.certificationProgramme === 'Transfer') {
      appendIfFilled('transferReason', formData.transferReason);
      appendIfFilled('transferExpiringDate', formData.transferExpiringDate);
    }

    // ========== CONDITIONAL ISO FIELDS ==========
    // Only send ISO fields for standards the user actually selected

    // ISO 9001 - only if selected
    if (selectedISO.iso9001) {
      appendIfFilled('iso9001DesignAndDevelopment', formData.iso9001DesignAndDevelopment);
      appendIfFilled('iso9001OtherNonApplicableClauses', formData.iso9001OtherNonApplicableClauses);
      // Only send explanation if user said "Yes" to other non-applicable clauses
      if (formData.iso9001OtherNonApplicableClauses === 'Yes') {
        appendIfFilled('iso9001OtherNonApplicableClausesText', formData.iso9001OtherNonApplicableClausesText);
      }
    }

    // ISO 14001 - only if selected
    if (selectedISO.iso14001) {
      appendIfFilled('iso14001SitesManaged', formData.iso14001SitesManaged);
      appendIfFilled('iso14001RegisterOfSignificantAspects', formData.iso14001RegisterOfSignificantAspects);
      appendIfFilled('iso14001EnvironmentalManagementManual', formData.iso14001EnvironmentalManagementManual);
      appendIfFilled('iso14001InternalAuditProgramme', formData.iso14001InternalAuditProgramme);
      // Only send implementation status if user said "Yes" to audit programme
      if (formData.iso14001InternalAuditProgramme === 'Yes') {
        appendIfFilled('iso14001InternalAuditImplemented', formData.iso14001InternalAuditImplemented);
      }
    }

    // ISO 22000 - only if selected
    if (selectedISO.iso22000) {
      appendIfFilled('iso22000HaccpImplementation', formData.iso22000HaccpImplementation);
      // Only send HACCP details if user said "Yes"
      if (formData.iso22000HaccpImplementation === 'Yes') {
        appendIfFilled('iso22000HaccpStudies', formData.iso22000HaccpStudies);
        appendIfFilled('iso22000Sites', formData.iso22000Sites);
        appendIfFilled('iso22000ProcessLines', formData.iso22000ProcessLines);
        appendIfFilled('iso22000ProcessingType', formData.iso22000ProcessingType);
      }
    }

    // ISO 45001 - only if selected
    if (selectedISO.iso45001) {
      appendIfFilled('iso45001HazardsIdentified', formData.iso45001HazardsIdentified);
      // Only send risk details if user said "Yes" to hazards identified
      if (formData.iso45001HazardsIdentified === 'Yes') {
        appendIfFilled('iso45001CriticalRisks', formData.iso45001CriticalRisks);
      }
    }

    // Add actual file objects
    attachedFiles.forEach((file) => {
      payload.append('file', file);
    });

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        body: payload,
      });

      let data = null;
      let rawText = '';
      try {
        rawText = await response.text();
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const backendMessage = (data && (data.message || data.error))
          ? (data.message || data.error)
          : (rawText || 'Failed to submit application');

        const validationDetails = (data && Array.isArray(data.errors) && data.errors.length)
          ? data.errors.map((e2) => e2.msg).filter(Boolean).join(' | ')
          : '';

        const composed = validationDetails ? `${backendMessage} (${validationDetails})` : backendMessage;
        throw new Error(composed);
      }

      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubmitError('');

      // Reset form
      setFormData({
        companyName: '',
        telephone: '',
        fax: '',
        email: '',
        website: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',

        executiveManagerName: '',
        executiveManagerMobile: '',
        executiveManagerEmail: '',

        contactPersonName: '',
        contactPersonPosition: '',
        contactPersonMobile: '',
        contactPersonEmail: '',

        workforceTotalEmployees: '',
        workforceEmployeesPerShift: '',
        workforceNumberOfShifts: '',
        workforceSeasonalEmployees: '',

        desiredStandards: [],
        certificationProgramme: '',
        transferReason: '',
        transferExpiringDate: '',

        iso9001DesignAndDevelopment: '',
        iso9001OtherNonApplicableClauses: '',
        iso9001OtherNonApplicableClausesText: '',

        iso14001SitesManaged: '',
        iso14001RegisterOfSignificantAspects: '',
        iso14001EnvironmentalManagementManual: '',
        iso14001InternalAuditProgramme: '',
        iso14001InternalAuditImplemented: '',

        iso22000HaccpImplementation: '',
        iso22000HaccpStudies: '',
        iso22000Sites: '',
        iso22000ProcessLines: '',
        iso22000ProcessingType: '',

        iso45001HazardsIdentified: '',
        iso45001CriticalRisks: ''
      });

      setAttachedFiles([]);
      setStep(1);

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitError(error && error.message ? error.message : 'Failed to submit application');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="application-page">
      <div className="page-header">
        <div className="container">
          <h2>Certification Application</h2>

          <li>Apply for ISO certification services. Fill out the form below and our team will contact you.</li>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="progress">
              <div className="progress-text">Step {step} of 3</div>
              <div className="progress-steps">
                <button type="button" className={`step-item ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                  1
                </button>
                <button type="button" className={`step-item ${step === 2 ? 'active' : ''}`} onClick={() => validateStep(1) && setStep(2)}>
                  2
                </button>
                <button type="button" className={`step-item ${step === 3 ? 'active' : ''}`} onClick={() => (validateStep(1) && validateStep(2)) && setStep(3)}>
                  3
                </button>
              </div>
            </div>

            {step === 1 && (
              <>
                <div className="form-step">
                  <div className="form-section card">
                    <div className="section-title">Company Information</div>

                    <div className="form-grid two">
                      <div className="form-group">
                        <label htmlFor="companyName">Name of Company <span className="required">*</span></label>
                        <input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className={errors.companyName ? 'error' : ''} />
                        {errors.companyName && <div className="form-error">{errors.companyName}</div>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="telephone">Telephone No. <span className="required">*</span></label>
                        <input id="telephone" name="telephone" inputMode="numeric" pattern="[0-9]*" value={formData.telephone} onChange={handleChange} placeholder="Enter telephone (numbers only)" className={errors.telephone ? 'error' : ''} />
                        {errors.telephone && <div className="form-error">{errors.telephone}</div>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="fax">Fax No.</label>
                        <input id="fax" name="fax" inputMode="numeric" pattern="[0-9]*" value={formData.fax} onChange={handleChange} placeholder="Enter fax (numbers only)" />
                        {errors.fax === 'Numbers only are allowed' && <div className="form-error">Numbers only are allowed</div>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="website">Website / URL</label>
                        <input id="website" name="website" value={formData.website} onChange={handleChange} className={errors.website ? 'error' : ''} placeholder="https://" />
                        {errors.website && <div className="form-error">{errors.website}</div>}
                      </div>
                    </div>

                    <div className="address-grid">
                      <div className="form-group">
                        <label htmlFor="addressLine1">Address Line 1 <span className="required">*</span></label>
                        <input id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className={errors.addressLine1 ? 'error' : ''} />
                        {errors.addressLine1 && <div className="form-error">{errors.addressLine1}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input id="addressLine2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City <span className="required">*</span></label>
                        <input id="city" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} />
                        {errors.city && <div className="form-error">{errors.city}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State/Province/Region</label>
                        <input id="state" name="state" value={formData.state} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input id="postalCode" name="postalCode" inputMode="numeric" pattern="[0-9]*" value={formData.postalCode} onChange={handleChange} placeholder="Enter postal code (numbers only)" />
                        {errors.postalCode === 'Numbers only are allowed' && <div className="form-error">Numbers only are allowed</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="country">Country <span className="required">*</span></label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} className={errors.country ? 'error' : ''}>
                          <option value="">Select country...</option>
                          {COUNTRIES.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        {errors.country && <div className="form-error">{errors.country}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="form-section card">
                    <div className="section-title">Executive Manager</div>

                    <div className="form-grid three">
                      <div className="form-group">
                        <label htmlFor="executiveManagerName">Name</label>
                        <input id="executiveManagerName" name="executiveManagerName" value={formData.executiveManagerName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="executiveManagerMobile">Mobile No. <span className="required">*</span></label>
                        <input id="executiveManagerMobile" name="executiveManagerMobile" inputMode="numeric" pattern="[0-9]*" value={formData.executiveManagerMobile} onChange={handleChange} placeholder="Enter mobile (numbers only)" className={errors.executiveManagerMobile ? 'error' : ''} />
                        {errors.executiveManagerMobile && <div className="form-error">{errors.executiveManagerMobile}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="executiveManagerEmail">Email</label>
                        <input id="executiveManagerEmail" name="executiveManagerEmail" type="email" value={formData.executiveManagerEmail} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section card">
                    <div className="section-title">Contact Person</div>

                    <div className="form-grid two">
                      <div className="form-group">
                        <label htmlFor="contactPersonName">Name</label>
                        <input id="contactPersonName" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contactPersonPosition">Position</label>
                        <input id="contactPersonPosition" name="contactPersonPosition" value={formData.contactPersonPosition} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contactPersonMobile">Mobile No.</label>
                        <input id="contactPersonMobile" name="contactPersonMobile" inputMode="numeric" pattern="[0-9]*" value={formData.contactPersonMobile} onChange={handleChange} placeholder="Enter mobile (numbers only)" />
                        {errors.contactPersonMobile === 'Numbers only are allowed' && <div className="form-error">Numbers only are allowed</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="contactPersonEmail">Email</label>
                        <input id="contactPersonEmail" name="contactPersonEmail" type="email" value={formData.contactPersonEmail} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section card">
                    <div className="section-title">Workforce</div>

                    <div className="form-grid four">
                      <div className="form-group">
                        <label htmlFor="workforceTotalEmployees">Total Employees</label>
                        <input
                          id="workforceTotalEmployees"
                          name="workforceTotalEmployees"
                          value={formData.workforceTotalEmployees}
                          onChange={handleChange}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="E.g., 150"
                        />
                        {errors.workforceTotalEmployees && <span className="field-error">{errors.workforceTotalEmployees}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="workforceEmployeesPerShift">Employees per Shift</label>
                        <input
                          id="workforceEmployeesPerShift"
                          name="workforceEmployeesPerShift"
                          value={formData.workforceEmployeesPerShift}
                          onChange={handleChange}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="E.g., 50"
                        />
                        {errors.workforceEmployeesPerShift && <span className="field-error">{errors.workforceEmployeesPerShift}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="workforceNumberOfShifts">Number of Shifts</label>
                        <input
                          id="workforceNumberOfShifts"
                          name="workforceNumberOfShifts"
                          value={formData.workforceNumberOfShifts}
                          onChange={handleChange}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="E.g., 3"
                        />
                        {errors.workforceNumberOfShifts && <span className="field-error">{errors.workforceNumberOfShifts}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="workforceSeasonalEmployees">Seasonal Employees</label>
                        <input
                          id="workforceSeasonalEmployees"
                          name="workforceSeasonalEmployees"
                          value={formData.workforceSeasonalEmployees}
                          onChange={handleChange}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="E.g., 20"
                        />
                        {errors.workforceSeasonalEmployees && <span className="field-error">{errors.workforceSeasonalEmployees}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="form-step">
                {Object.keys(errors).length > 0 && (
                  <div className="form-error-summary">Form has not been submitted, please see the errors below.</div>
                )}

                <div className="form-section card">
                  <div className="section-title">Desired Standards</div>

                  <div className="checkbox-grid">
                    {standardsList.map((s) => (
                      <label key={s.value} className="checkbox-card">
                        <input type="checkbox" name="desiredStandards" value={s.value} checked={formData.desiredStandards.includes(s.value)} onChange={handleChange} />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.desiredStandards && <div className="form-error">{errors.desiredStandards}</div>}
                </div>

                <div className="form-section card">
                  <div className="section-title">Certification Programme Requested</div>

                  <div className="radio-grid">
                    {['Initial certification', 'Recertification audit', 'Transfer', 'Surveillance'].map((p) => (
                      <label key={p} className="radio-card">
                        <input type="radio" name="certificationProgramme" value={p === 'Transfer' ? 'Transfer' : p} checked={formData.certificationProgramme === (p === 'Transfer' ? 'Transfer' : p)} onChange={handleChange} />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                  {errors.certificationProgramme && <div className="form-error">{errors.certificationProgramme}</div>}
                </div>

                {formData.certificationProgramme === 'Transfer' && (
                  <div className="form-section card">
                    <div className="section-title">Transfer Details</div>

                    <div className="form-grid two">
                      <div className="form-group">
                        <label htmlFor="transferReason">Reason for transfer <span className="required">*</span></label>
                        <input id="transferReason" name="transferReason" value={formData.transferReason} onChange={handleChange} className={errors.transferReason ? 'error' : ''} />
                        {errors.transferReason && <div className="form-error">{errors.transferReason}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="transferExpiringDate">Expiring date of certificate <span className="required">*</span></label>
                        <input id="transferExpiringDate" name="transferExpiringDate" type="date" value={formData.transferExpiringDate} onChange={handleChange} className={errors.transferExpiringDate ? 'error' : ''} />
                        {errors.transferExpiringDate && <div className="form-error">{errors.transferExpiringDate}</div>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-section card">
                  <div className="section-title">File Upload</div>

                  <div
                    className={`dropzone ${dropActive ? 'active' : ''}`}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDropActive(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDropActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDropActive(false);
                    }}
                    onDrop={onDrop}
                  >
                    <div className="dropzone-title">Drag & drop files here</div>
                    <div className="dropzone-subtitle">Valid certificate, last audit reports, outstanding nonconformities</div>
                    <input className="dropzone-input" id="files" name="files" type="file" multiple accept="application/pdf,image/jpeg,image/png" onChange={handleFilesChange} />
                  </div>
                  {errors.files && <div className="form-error">{errors.files}</div>}

                  {attachedFiles.length > 0 && (
                    <div className="file-list">
                      {attachedFiles.map((f, idx) => (
                        <div className="file-row" key={`${f.name}-${f.size}-${idx}`}>
                          <div className="file-meta">{f.name} ({(f.size / 1024).toFixed(2)} KB)</div>
                          <button type="button" className="file-remove" onClick={() => removeFileAt(idx)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <div className="form-section card">
                  <div className="section-title">ISO-Specific Questions</div>

                  {getVisibleISOStandards().iso9001 && (
                    <div className="collapsible">
                      <button type="button" className="collapsible-header" onClick={() => togglePanel('iso9001')}>
                        QMS ISO 9001
                        <span className="collapsible-icon">{openPanels.iso9001 ? '−' : '+'}</span>
                      </button>
                      {openPanels.iso9001 && (
                        <div className="collapsible-body">
                          <div className="form-group">
                            <label>Clause “Design & Development” included? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso9001DesignAndDevelopment === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso9001DesignAndDevelopment', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso9001DesignAndDevelopment === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso9001DesignAndDevelopment', 'No')}>No</button>
                            </div>
                            {errors.iso9001DesignAndDevelopment && <div className="form-error">{errors.iso9001DesignAndDevelopment}</div>}
                          </div>

                          <div className="form-group">
                            <label>Other non-applicable clauses? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso9001OtherNonApplicableClauses === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso9001OtherNonApplicableClauses', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso9001OtherNonApplicableClauses === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso9001OtherNonApplicableClauses', 'No')}>No</button>
                            </div>
                            {errors.iso9001OtherNonApplicableClauses && <div className="form-error">{errors.iso9001OtherNonApplicableClauses}</div>}
                          </div>

                          {formData.iso9001OtherNonApplicableClauses === 'Yes' && (
                            <div className="form-group">
                              <label htmlFor="iso9001OtherNonApplicableClausesText">Please specify <span className="required">*</span></label>
                              <input id="iso9001OtherNonApplicableClausesText" name="iso9001OtherNonApplicableClausesText" value={formData.iso9001OtherNonApplicableClausesText} onChange={handleChange} className={errors.iso9001OtherNonApplicableClausesText ? 'error' : ''} />
                              {errors.iso9001OtherNonApplicableClausesText && <div className="form-error">{errors.iso9001OtherNonApplicableClausesText}</div>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {getVisibleISOStandards().iso14001 && (
                    <div className="collapsible">
                      <button type="button" className="collapsible-header" onClick={() => togglePanel('iso14001')}>
                        EMS ISO 14001
                        <span className="collapsible-icon">{openPanels.iso14001 ? '−' : '+'}</span>
                      </button>
                      {openPanels.iso14001 && (
                        <div className="collapsible-body">
                          <div className="form-grid two">
                            <div className="form-group">
                              <label htmlFor="iso14001SitesManaged">How many sites managed? <span className="required">*</span></label>
                              <input id="iso14001SitesManaged" name="iso14001SitesManaged" value={formData.iso14001SitesManaged} onChange={handleChange} className={errors.iso14001SitesManaged ? 'error' : ''} />
                              {errors.iso14001SitesManaged && <div className="form-error">{errors.iso14001SitesManaged}</div>}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Register of Significant Environment aspect? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso14001RegisterOfSignificantAspects === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso14001RegisterOfSignificantAspects', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso14001RegisterOfSignificantAspects === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso14001RegisterOfSignificantAspects', 'No')}>No</button>
                            </div>
                            {errors.iso14001RegisterOfSignificantAspects && <div className="form-error">{errors.iso14001RegisterOfSignificantAspects}</div>}
                          </div>

                          <div className="form-group">
                            <label>Environmental Management Manual? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso14001EnvironmentalManagementManual === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso14001EnvironmentalManagementManual', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso14001EnvironmentalManagementManual === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso14001EnvironmentalManagementManual', 'No')}>No</button>
                            </div>
                            {errors.iso14001EnvironmentalManagementManual && <div className="form-error">{errors.iso14001EnvironmentalManagementManual}</div>}
                          </div>

                          <div className="form-group">
                            <label>Internal Environmental Audit Programme? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso14001InternalAuditProgramme === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso14001InternalAuditProgramme', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso14001InternalAuditProgramme === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso14001InternalAuditProgramme', 'No')}>No</button>
                            </div>
                            {errors.iso14001InternalAuditProgramme && <div className="form-error">{errors.iso14001InternalAuditProgramme}</div>}
                          </div>

                          {formData.iso14001InternalAuditProgramme === 'Yes' && (
                            <div className="form-group">
                              <label>Implemented? <span className="required">*</span></label>
                              <div className="toggle-row">
                                <button type="button" className={`toggle-btn ${formData.iso14001InternalAuditImplemented === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso14001InternalAuditImplemented', 'Yes')}>Yes</button>
                                <button type="button" className={`toggle-btn ${formData.iso14001InternalAuditImplemented === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso14001InternalAuditImplemented', 'No')}>No</button>
                              </div>
                              {errors.iso14001InternalAuditImplemented && <div className="form-error">{errors.iso14001InternalAuditImplemented}</div>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {getVisibleISOStandards().iso22000 && (
                    <div className="collapsible">
                      <button type="button" className="collapsible-header" onClick={() => togglePanel('iso22000')}>
                        FSMS ISO 22000
                        <span className="collapsible-icon">{openPanels.iso22000 ? '−' : '+'}</span>
                      </button>
                      {openPanels.iso22000 && (
                        <div className="collapsible-body">
                          <div className="form-group">
                            <label>HACCP Implementation or Study Conducted? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso22000HaccpImplementation === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso22000HaccpImplementation', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso22000HaccpImplementation === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso22000HaccpImplementation', 'No')}>No</button>
                            </div>
                            {errors.iso22000HaccpImplementation && <div className="form-error">{errors.iso22000HaccpImplementation}</div>}
                          </div>

                          <div className="form-grid four">
                            <div className="form-group">
                              <label htmlFor="iso22000HaccpStudies">Number of HACCP Studies</label>
                              <input id="iso22000HaccpStudies" name="iso22000HaccpStudies" value={formData.iso22000HaccpStudies} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="iso22000Sites">Number of Sites</label>
                              <input id="iso22000Sites" name="iso22000Sites" value={formData.iso22000Sites} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="iso22000ProcessLines">Number of Process Lines</label>
                              <input id="iso22000ProcessLines" name="iso22000ProcessLines" value={formData.iso22000ProcessLines} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="iso22000ProcessingType">Processing type</label>
                              <select id="iso22000ProcessingType" name="iso22000ProcessingType" value={formData.iso22000ProcessingType} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Seasonal">Seasonal</option>
                                <option value="Continuous">Continuous</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {getVisibleISOStandards().iso45001 && (
                    <div className="collapsible">
                      <button type="button" className="collapsible-header" onClick={() => togglePanel('iso45001')}>
                        OHSMS ISO 45001
                        <span className="collapsible-icon">{openPanels.iso45001 ? '−' : '+'}</span>
                      </button>
                      {openPanels.iso45001 && (
                        <div className="collapsible-body">
                          <div className="form-group">
                            <label>Hazards identified? <span className="required">*</span></label>
                            <div className="toggle-row">
                              <button type="button" className={`toggle-btn ${formData.iso45001HazardsIdentified === 'Yes' ? 'active' : ''}`} onClick={() => setYesNo('iso45001HazardsIdentified', 'Yes')}>Yes</button>
                              <button type="button" className={`toggle-btn ${formData.iso45001HazardsIdentified === 'No' ? 'active' : ''}`} onClick={() => setYesNo('iso45001HazardsIdentified', 'No')}>No</button>
                            </div>
                            {errors.iso45001HazardsIdentified && <div className="form-error">{errors.iso45001HazardsIdentified}</div>}
                          </div>

                          <div className="form-group">
                            <label htmlFor="iso45001CriticalRisks">Detail critical occupational health & safety risks</label>
                            <textarea id="iso45001CriticalRisks" name="iso45001CriticalRisks" rows="4" value={formData.iso45001CriticalRisks} onChange={handleChange} className={errors.iso45001CriticalRisks ? 'error' : ''} />
                            {errors.iso45001CriticalRisks && <div className="form-error">{errors.iso45001CriticalRisks}</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {submitStatus === 'success' && (
              <div className="success-message">
                ✓ Thank you! Your application has been submitted successfully. We'll contact you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message" style={{ padding: '16px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', marginBottom: '20px' }}>
                ✗ {submitError || 'There was an error submitting your application. Please try again or contact us directly.'}
              </div>
            )}

            <div className="step-actions">
              {step > 1 && (
                <button type="button" className="btn btn-secondary" onClick={goBack} disabled={isSubmitting}>
                  Back
                </button>
              )}

              {step < 3 ? (
                <button type="button" className="btn btn-primary" onClick={goNext} disabled={isSubmitting}>
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Application;

