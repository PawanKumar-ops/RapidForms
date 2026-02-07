"use client"

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Plus, X, Upload } from 'lucide-react';
import './EmailDistribution.css';

export function EmailDistribution({ form, onSubmit, onBack }) {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);

  const handleAddEmail = () => {
    const trimmedEmail = emailInput.trim();
    if (trimmedEmail && isValidEmail(trimmedEmail) && !emails.includes(trimmedEmail)) {
      setEmails([...emails, trimmedEmail]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleBulkAdd = () => {
    const emailList = bulkEmails
      .split(/[\n,;]/)
      .map((email) => email.trim())
      .filter((email) => email && isValidEmail(email))
      .filter((email) => !emails.includes(email));

    setEmails([...emails, ...emailList]);
    setBulkEmails('');
    setShowBulkInput(false);
  };

  const handleSubmit = () => {
    if (emails.length > 0) {
      onSubmit(emails);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="distribution-container">
      <div className="distribution-content">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft className="back-icon" />
          Back
        </button>

        <div className="distribution-card">
          <div className="card-header">
            <div className="header-icon-wrapper">
              <Mail className="header-icon" />
            </div>
            <div>
              <h2 className="card-title">Distribute Form</h2>
              <p className="card-subtitle">Add email addresses to send the form to</p>
            </div>
          </div>

          <div className="form-info-box">
            <p className="form-info-title">
              <strong>Form:</strong> {form.title}
            </p>
            <p className="form-info-desc">{form.description}</p>
          </div>

          <div className="email-input-section">
            <label className="input-label">Add Recipients</label>
            <div className="input-row">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                placeholder="Enter email address"
                className="email-input"
              />
              <button
                onClick={handleAddEmail}
                disabled={!emailInput.trim() || !isValidEmail(emailInput.trim())}
                className="add-email-btn"
              >
                <Plus className="add-email-icon" />
                Add
              </button>
            </div>
          </div>

          {!showBulkInput ? (
            <button
              onClick={() => setShowBulkInput(true)}
              className="bulk-toggle-btn"
            >
              <Upload className="bulk-icon" />
              Add multiple emails at once
            </button>
          ) : (
            <div className="bulk-input-section">
              <label className="bulk-label">
                Paste multiple emails (separated by commas, semicolons, or new lines)
              </label>
              <textarea
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
                placeholder="user1@example.com, user2@example.com&#10;user3@example.com"
                className="bulk-textarea"
              />
              <div className="bulk-actions">
                <button onClick={handleBulkAdd} className="bulk-add-btn">
                  Add All
                </button>
                <button
                  onClick={() => {
                    setShowBulkInput(false);
                    setBulkEmails('');
                  }}
                  className="bulk-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="recipients-section">
            <div className="recipients-header">
              <h3 className="recipients-title">
                Recipients ({emails.length})
              </h3>
              {emails.length > 0 && (
                <button onClick={() => setEmails([])} className="clear-all-btn">
                  Clear All
                </button>
              )}
            </div>

            {emails.length === 0 ? (
              <div className="empty-state">
                <Mail className="empty-icon" />
                <p>No recipients added yet</p>
              </div>
            ) : (
              <div className="recipients-list">
                {emails.map((email) => (
                  <div key={email} className="recipient-item">
                    <span className="recipient-email">{email}</span>
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="remove-btn"
                    >
                      <X className="remove-icon" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={emails.length === 0}
          className="submit-btn"
        >
          Send Form to {emails.length} Recipient{emails.length !== 1 ? 's' : ''}
          <ArrowRight className="submit-icon" />
        </button>
      </div>
    </div>
  );
}
