"use client"

import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { FormGenerator } from './components/FormGenerator';
import { EmailDistribution } from './components/EmailDistribution';
import { SuccessPage } from './components/SuccessPage';
import './App.css';

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [formPurpose, setFormPurpose] = useState('');
  const [generatedForm, setGeneratedForm] = useState(null);
  const [recipientEmails, setRecipientEmails] = useState([]);

  const handlePurposeSubmit = (purpose) => {
    setFormPurpose(purpose);
    setCurrentStep('generator');
  };

  const handleFormGenerated = (form) => {
    setGeneratedForm(form);
  };

  const handleFormApproved = () => {
    setCurrentStep('distribution');
  };

  const handleEmailsSubmit = (emails) => {
    setRecipientEmails(emails);
    setCurrentStep('success');
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setFormPurpose('');
    setGeneratedForm(null);
    setRecipientEmails([]);
  };

  return (
    <div className="app-container">
      {currentStep === 'landing' && (
        <LandingPage onSubmit={handlePurposeSubmit} />
      )}
      {currentStep === 'generator' && (
        <FormGenerator
          purpose={formPurpose}
          onFormGenerated={handleFormGenerated}
          onApprove={handleFormApproved}
          onBack={() => setCurrentStep('landing')}
        />
      )}
      {currentStep === 'distribution' && generatedForm && (
        <EmailDistribution
          form={generatedForm}
          onSubmit={handleEmailsSubmit}
          onBack={() => setCurrentStep('generator')}
        />
      )}
      {currentStep === 'success' && generatedForm && (
        <SuccessPage
          form={generatedForm}
          recipientCount={recipientEmails.length}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
