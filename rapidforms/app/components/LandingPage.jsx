"use client"

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import './LandingPage.css';

export function LandingPage({ onSubmit }) {
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purpose.trim()) {
      onSubmit(purpose.trim());
    }
  };

  const examples = [
    "Customer feedback survey for a new product",
    "Event registration form for a conference",
    "Job application form for software engineer position",
    "Contact form for real estate inquiries",
    "Medical intake form for new patients",
  ];

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-header">
          <div className="icon-wrapper">
            <Sparkles className="icon-sparkles" />
          </div>
          <h1 className="landing-title">
            AI Form Builder
          </h1>
          <p className="landing-subtitle">
            Describe your form needs and let AI create it instantly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="landing-form">
          <label htmlFor="purpose" className="form-label">
            What kind of form do you need?
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="E.g., I need a customer feedback form with questions about product quality, customer service, and likelihood to recommend..."
            className="form-textarea"
            required
          />
          <button
            type="submit"
            disabled={!purpose.trim()}
            className="form-submit-btn"
          >
            Generate Form with AI
            <ArrowRight className="btn-icon" />
          </button>
        </form>

        <div className="examples-section">
          <h2 className="examples-title">
            Example Ideas
          </h2>
          <div className="examples-list">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setPurpose(example)}
                className="example-btn"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
