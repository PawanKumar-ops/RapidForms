"use client"

import { useState, useEffect } from 'react';
import { Loader2, ArrowLeft, ArrowRight, Edit2, Trash2, Plus } from 'lucide-react';
import './FormGenerator.css';

// Mock AI form generation logic
function generateFormFromPurpose(purpose) {
  const lowerPurpose = purpose.toLowerCase();

  // Extract form type and generate appropriate fields
  if (lowerPurpose.includes('feedback') || lowerPurpose.includes('survey')) {
    return {
      title: 'Customer Feedback Survey',
      description: 'Help us improve by sharing your thoughts',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
        { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
        { id: '3', type: 'radio', label: 'Overall Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
        { id: '4', type: 'textarea', label: 'What did you like most?', required: false, placeholder: 'Share your thoughts...' },
        { id: '5', type: 'textarea', label: 'What could we improve?', required: false, placeholder: 'Your suggestions...' },
        { id: '6', type: 'radio', label: 'Would you recommend us to others?', required: true, options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'] },
      ],
    };
  }

  if (lowerPurpose.includes('registration') || lowerPurpose.includes('event') || lowerPurpose.includes('conference')) {
    return {
      title: 'Event Registration Form',
      description: 'Register for our upcoming event',
      fields: [
        { id: '1', type: 'text', label: 'First Name', required: true, placeholder: 'First name' },
        { id: '2', type: 'text', label: 'Last Name', required: true, placeholder: 'Last name' },
        { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
        { id: '4', type: 'tel', label: 'Phone Number', required: true, placeholder: '+1 (555) 000-0000' },
        { id: '5', type: 'text', label: 'Company/Organization', required: false, placeholder: 'Company name' },
        { id: '6', type: 'select', label: 'Ticket Type', required: true, options: ['General Admission', 'VIP Pass', 'Student', 'Group (5+)'] },
        { id: '7', type: 'checkbox', label: 'Dietary Restrictions', required: false, options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'None'] },
        { id: '8', type: 'textarea', label: 'Special Requirements', required: false, placeholder: 'Any special needs or requests...' },
      ],
    };
  }

  if (lowerPurpose.includes('job') || lowerPurpose.includes('application') || lowerPurpose.includes('career') || lowerPurpose.includes('employment')) {
    return {
      title: 'Job Application Form',
      description: 'Apply for a position at our company',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your full name' },
        { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
        { id: '3', type: 'tel', label: 'Phone Number', required: true, placeholder: 'Contact number' },
        { id: '4', type: 'text', label: 'Position Applied For', required: true, placeholder: 'Job title' },
        { id: '5', type: 'select', label: 'Years of Experience', required: true, options: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'] },
        { id: '6', type: 'text', label: 'Current/Previous Company', required: false, placeholder: 'Company name' },
        { id: '7', type: 'textarea', label: 'Cover Letter', required: true, placeholder: 'Tell us why you\'re a great fit...' },
        { id: '8', type: 'text', label: 'LinkedIn Profile', required: false, placeholder: 'https://linkedin.com/in/yourprofile' },
        { id: '9', type: 'select', label: 'Availability', required: true, options: ['Immediate', 'Within 2 weeks', 'Within 1 month', '2+ months'] },
      ],
    };
  }

  if (lowerPurpose.includes('contact') || lowerPurpose.includes('inquiry')) {
    return {
      title: 'Contact Form',
      description: 'Get in touch with us',
      fields: [
        { id: '1', type: 'text', label: 'Name', required: true, placeholder: 'Your name' },
        { id: '2', type: 'email', label: 'Email', required: true, placeholder: 'your@email.com' },
        { id: '3', type: 'tel', label: 'Phone Number', required: false, placeholder: 'Optional' },
        { id: '4', type: 'select', label: 'Subject', required: true, options: ['General Inquiry', 'Support', 'Sales', 'Partnership', 'Other'] },
        { id: '5', type: 'textarea', label: 'Message', required: true, placeholder: 'How can we help you?' },
      ],
    };
  }

  if (lowerPurpose.includes('medical') || lowerPurpose.includes('patient') || lowerPurpose.includes('health')) {
    return {
      title: 'Patient Intake Form',
      description: 'New patient information',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal name' },
        { id: '2', type: 'date', label: 'Date of Birth', required: true, placeholder: '' },
        { id: '3', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { id: '4', type: 'tel', label: 'Phone Number', required: true, placeholder: 'Primary contact' },
        { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
        { id: '6', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List any medications you\'re taking...' },
        { id: '7', type: 'textarea', label: 'Known Allergies', required: false, placeholder: 'List any allergies...' },
        { id: '8', type: 'textarea', label: 'Medical History', required: false, placeholder: 'Relevant medical conditions...' },
        { id: '9', type: 'text', label: 'Emergency Contact Name', required: true, placeholder: 'Name' },
        { id: '10', type: 'tel', label: 'Emergency Contact Phone', required: true, placeholder: 'Phone number' },
      ],
    };
  }

  // Default generic form
  return {
    title: 'Custom Form',
    description: 'Please fill out this form',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
      { id: '3', type: 'tel', label: 'Phone Number', required: false, placeholder: 'Contact number' },
      { id: '4', type: 'select', label: 'How did you hear about us?', required: false, options: ['Search Engine', 'Social Media', 'Friend', 'Advertisement', 'Other'] },
      { id: '5', type: 'textarea', label: 'Additional Comments', required: false, placeholder: 'Any additional information...' },
    ],
  };
}

export function FormGenerator({ purpose, onFormGenerated, onApprove, onBack }) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate AI generation delay
    const timer = setTimeout(() => {
      const generatedForm = generateFormFromPurpose(purpose);
      setForm(generatedForm);
      onFormGenerated(generatedForm);
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [purpose, onFormGenerated]);

  const handleApprove = () => {
    onApprove();
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedForm = generateFormFromPurpose(purpose);
      setForm(generatedForm);
      onFormGenerated(generatedForm);
      setIsGenerating(false);
    }, 2000);
  };

  if (isGenerating) {
    return (
      <div className="generator-loading">
        <div className="loading-content">
          <div className="loading-icon-wrapper">
            <Loader2 className="loading-spinner" />
          </div>
          <h2 className="loading-title">Creating Your Form</h2>
          <p className="loading-subtitle">AI is analyzing your requirements...</p>
        </div>
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="generator-container">
      <div className="generator-content">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft className="back-icon" />
          Back
        </button>

        <div className="form-preview-card">
          <div className="form-header">
            <div>
              <h2 className="form-title">{form.title}</h2>
              <p className="form-description">{form.description}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-btn"
            >
              <Edit2 className="edit-icon" />
              {isEditing ? 'Done Editing' : 'Edit Form'}
            </button>
          </div>

          <div className="form-fields">
            {form.fields.map((field) => (
              <FormFieldPreview key={field.id} field={field} isEditing={isEditing} />
            ))}
          </div>

          {isEditing && (
            <button className="add-field-btn">
              <Plus className="add-icon" />
              Add Field
            </button>
          )}
        </div>

        <div className="action-buttons">
          <button onClick={handleRegenerate} className="regenerate-btn">
            Regenerate Form
          </button>
          <button onClick={handleApprove} className="approve-btn">
            Approve & Continue
            <ArrowRight className="approve-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FormFieldPreview({ field, isEditing }) {
  return (
    <div className="field-preview">
      <div className="field-label-row">
        <label className="field-label">
          {field.label}
          {field.required && <span className="required-mark">*</span>}
        </label>
        {isEditing && (
          <div className="field-actions">
            <button className="field-action-btn">
              <Edit2 className="field-action-icon" />
            </button>
            <button className="field-action-btn delete">
              <Trash2 className="field-action-icon" />
            </button>
          </div>
        )}
      </div>

      {field.type === 'textarea' && (
        <textarea
          placeholder={field.placeholder}
          className="field-textarea"
          disabled
        />
      )}

      {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' || field.type === 'date') && (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className="field-input"
          disabled
        />
      )}

      {field.type === 'select' && (
        <select className="field-select" disabled>
          <option>Select an option...</option>
          {field.options?.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      )}

      {field.type === 'radio' && (
        <div className="field-options">
          {field.options?.map((option, idx) => (
            <label key={idx} className="option-label">
              <input type="radio" name={field.id} className="option-radio" disabled />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {field.type === 'checkbox' && (
        <div className="field-options">
          {field.options?.map((option, idx) => (
            <label key={idx} className="option-label">
              <input type="checkbox" className="option-checkbox" disabled />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
