import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { HelpCircle } from 'lucide-react';

export interface RaiseQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, text: string, docName?: string) => void;
}

export const RaiseQueryModal: React.FC<RaiseQueryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [queryTitle, setQueryTitle] = useState('Revised Process Flow Required');
  const [queryText, setQueryText] = useState('Please provide a revised Process Flow document for review.');
  const [relatedDoc, setRelatedDoc] = useState('Process Flow Diagram');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryTitle.trim() || !queryText.trim()) return;
    onSubmit(queryTitle, queryText, relatedDoc);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Raise Official Clarification"
      subtitle="This request will be sent to the applicant's query workspace."
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" form="raise-query-form" className="btn btn-primary">
            <HelpCircle size={14} /> Raise Query
          </button>
        </>
      }
    >
      <form id="raise-query-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Query title *</label>
          <input
            className="form-input"
            value={queryTitle}
            onChange={(e) => setQueryTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Clarification requested *</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Related document</label>
          <select
            className="form-select"
            value={relatedDoc}
            onChange={(e) => setRelatedDoc(e.target.value)}
          >
            <option>Process Flow Diagram</option>
            <option>Cold Chain Layout Plan</option>
            <option>Food Safety Management Plan</option>
            <option>Other supporting document</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

