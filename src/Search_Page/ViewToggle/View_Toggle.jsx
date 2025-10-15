import React from 'react';

const ViewToggle = ({ value, onChange }) => {
  return (
    <div className="view-toggle">
      <button 
        className={`toggle-btn ${value === 'grid' ? 'active' : ''}`}
        onClick={() => onChange('grid')}
      >
        <i className="icon-grid">□□</i>
      </button>
      <button 
        className={`toggle-btn ${value === 'list' ? 'active' : ''}`}
        onClick={() => onChange('list')}
      >
        <i className="icon-list">≡</i>
      </button>
    </div>
  );
};

export default ViewToggle;