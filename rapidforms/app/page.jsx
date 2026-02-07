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

    const handlePurposeSubmit = async (purpose) => {
        try {
            setFormPurpose(purpose);
            setCurrentStep('generator'); // keep UX same (loading can be added later)

            const res = await fetch("/api/generate-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ purpose }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to generate form");
            }

            /**
             * IMPORTANT:
             * data.form is AI text (JSON string)
             * parse it safely
             */
            const parsedForm =
                typeof data.form === "string"
                    ? JSON.parse(data.form)
                    : data.form;

            setGeneratedForm(parsedForm);
        } catch (error) {
            console.error("Form generation error:", error);
            alert("Failed to generate form. Please try again.");
            setCurrentStep("landing");
        }
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
                    form={generatedForm}
                    onApprove={handleFormApproved}
                    onBack={() => setCurrentStep("landing")}
                    onRegenerate={() => handlePurposeSubmit(formPurpose)}
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
