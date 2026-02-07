"use client"

import { CheckCircle2, Mail, Copy, Link2, RotateCcw, Download } from 'lucide-react';
import { useState } from 'react';
import './SuccessPage.css';

export function SuccessPage({ form, recipientCount, onStartOver }) {
  const [copied, setCopied] = useState(false);

  // Generate a mock shareable link
  const shareableLink = `https://forms.example.com/${generateFormId()}`;

  function generateFormId() {
    return Math.random().toString(36).substring(2, 15);
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResponses = () => {
    // Mock download functionality
    alert('In a real application, this would download a CSV file with all form responses.');
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-header">
          <div className="success-icon-wrapper">
            <CheckCircle2 className="success-icon" />
          </div>
          <h1 className="success-title">Form Sent Successfully!</h1>
          <p className="success-subtitle">
            Your form has been sent to {recipientCount} recipient{recipientCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="success-card">
          <div className="card-info">
            <h2 className="info-title">{form.title}</h2>
            <p className="info-description">{form.description}</p>
            <div className="info-meta">
              <Mail className="meta-icon" />
              <span>{form.fields.length} fields • {recipientCount} recipients</span>
            </div>
          </div>

          <div className="share-section">
            <div className="share-link-group">
              <label className="share-label">Shareable Link</label>
              <div className="share-input-row">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="share-input"
                />
                <button onClick={handleCopyLink} className="copy-btn">
                  {copied ? (
                    <>
                      <CheckCircle2 className="copy-icon" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="copy-icon" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="share-hint">
                Share this link with anyone to collect additional responses
              </p>
            </div>

            <div className="action-grid">
              <button onClick={handleCopyLink} className="action-btn">
                <Link2 className="action-icon" />
                Copy Link
              </button>
              <button onClick={handleDownloadResponses} className="action-btn">
                <Download className="action-icon" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="info-box">
          <h3 className="info-box-title">What happens next?</h3>
          <ul className="info-list">
            <li className="info-list-item">
              <span className="bullet">•</span>
              <span>Recipients will receive an email with a link to fill out the form</span>
            </li>
            <li className="info-list-item">
              <span className="bullet">•</span>
              <span>You'll receive notifications as responses come in</span>
            </li>
            <li className="info-list-item">
              <span className="bullet">•</span>
              <span>All responses will be collected and available for download</span>
            </li>
          </ul>
        </div>

        <button onClick={onStartOver} className="create-another-btn">
          <RotateCcw className="create-icon" />
          Create Another Form
        </button>
      </div>
    </div>
  );
}
