"use client";

import { useState } from "react";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";
import "./FormGenerator.css";

export function FormGenerator({ form, onApprove, onBack, onRegenerate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!form) {
    return (
      <div className="generator-loading">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <h2 className="loading-title">Creating Your Form</h2>
          <p className="loading-subtitle">
            AI is analyzing your requirements...
          </p>
        </div>
      </div>
    );
  }

  const handleRegenerate = async () => {
    if (!onRegenerate) return;
    setIsRegenerating(true);
    await onRegenerate();
    setIsRegenerating(false);
  };

  return (
    <div className="generator-container">
      <div className="generator-content">
        {/* Back */}
        <button onClick={onBack} className="back-btn">
          <ArrowLeft className="back-icon" />
          Back
        </button>

        {/* Form Preview */}
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
              {isEditing ? "Done Editing" : "Edit Form"}
            </button>
          </div>

          {/* Questions */}
          <div className="form-fields">
            {form.questions.map((question, index) => (
              <FormQuestionPreview
                key={index}
                question={question}
                isEditing={isEditing}
              />
            ))}
          </div>

          {isEditing && (
            <button className="add-field-btn">
              <Plus className="add-icon" />
              Add Field (manual)
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <button
            onClick={handleRegenerate}
            className="regenerate-btn"
            disabled={isRegenerating}
          >
            {isRegenerating ? "Regenerating..." : "Regenerate Form"}
          </button>

          <button onClick={onApprove} className="approve-btn">
            Approve & Continue
            <ArrowRight className="approve-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* Question Preview Component                         */
/* -------------------------------------------------- */

function FormQuestionPreview({ question, isEditing }) {
  return (
    <div className="field-preview">
      <div className="field-label-row">
        <label className="field-label">
          {question.label}
          {question.required && <span className="required-mark">*</span>}
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

      {/* Field Type Rendering */}
      {question.type === "short_text" && (
        <input
          className="field-input"
          placeholder="Short answer"
          disabled
        />
      )}

      {question.type === "long_text" && (
        <textarea
          className="field-textarea"
          placeholder="Long answer"
          disabled
        />
      )}

      {question.type === "mcq" && (
        <div className="field-options">
          {question.options?.map((opt, idx) => (
            <label key={idx} className="option-label">
              <input type="radio" disabled />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div className="field-options">
          {question.options?.map((opt, idx) => (
            <label key={idx} className="option-label">
              <input type="checkbox" disabled />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
