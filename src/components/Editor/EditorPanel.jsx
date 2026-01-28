import React from 'react';
import { RefreshCw, Download, Monitor, Smartphone, Tablet, Layout, Calendar, Layers, X, Mail } from 'lucide-react';
import './EditorPanel.css';

const EditorPanel = ({ data, onChange, onRandomize, onExport, screenSize, setScreenSize, onClose, isSending }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="editor-panel glass">
      <div className="editor-header">
        <div className="editor-header-top">
          <h2 className="editor-title">Receipt Customizer</h2>
          <button className="mobile-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <p className="editor-subtitle">Adjust values and simulate screens</p>
      </div>

      <div className="editor-section">
        <label>Recipient Name</label>
        <input 
          type="text" 
          name="name" 
          value={data.name} 
          onChange={handleChange} 
          placeholder="Moces Jonnes"
        />
      </div>

      <div className="editor-section">
        <label>Amount (USD)</label>
        <div className="input-group">
          <span>$</span>
          <input 
            type="text" 
            name="amount" 
            value={data.amount} 
            onChange={handleChange} 
            placeholder="3.70"
          />
        </div>
        <div className="preset-amounts">
          {[100, 500, 1000, 5000].map(amt => (
            <button key={amt} onClick={() => onChange({ ...data, amount: amt.toFixed(2) })}>
              ${amt}
            </button>
          ))}
        </div>
      </div>

      <div className="editor-section">
        <label>Platform/Sender</label>
        <input 
          type="text" 
          name="platform" 
          value={data.platform} 
          onChange={handleChange} 
          placeholder="TikTok"
        />
      </div>

      <div className="editor-section">
        <label>Transaction Date</label>
        <div className="date-input-container">
          <input 
            type="text" 
            name="date" 
            value={data.date} 
            onChange={handleChange} 
            className="date-text-input"
          />
          <input 
            type="date" 
            className="date-picker-input"
            onChange={(e) => {
              const d = new Date(e.target.value);
              const formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
              onChange({ ...data, date: formatted });
            }}
          />
          <Calendar className="calendar-icon" size={16} />
        </div>
      </div>

      <div className="editor-section">
        <label>Note</label>
        <textarea 
          name="note" 
          value={data.note} 
          onChange={handleChange} 
          placeholder="Note from sender..."
          rows="3"
        />
      </div>

      <div className="divider"></div>

      <div className="editor-section">
        <label>Simulation Mode</label>
        <div className="screen-selector">
          <button 
            className={screenSize === 'sm' ? 'active' : ''} 
            onClick={() => setScreenSize('sm')}
            title="Small (Mobile)"
          >
            <Smartphone size={18} />
          </button>
          <button 
            className={screenSize === 'md' ? 'active' : ''} 
            onClick={() => setScreenSize('md')}
            title="Medium (Tablet)"
          >
            <Tablet size={18} />
          </button>
          <button 
            className={screenSize === 'lg' ? 'active' : ''} 
            onClick={() => setScreenSize('lg')}
            title="Large (Desktop)"
          >
            <Layout size={18} />
          </button>
          <button 
            className={screenSize === 'xl' ? 'active' : ''} 
            onClick={() => setScreenSize('xl')}
            title="X-Large (Wide)"
          >
            <Monitor size={18} />
          </button>
        </div>
      </div>

      <div className="editor-section">
        <label>Batch Generation</label>
        <div className="batch-controls">
          <input 
            type="number" 
            min="1" 
            max="50"
            value={data.batchCount || 1} 
            onChange={(e) => onChange({ ...data, batchCount: parseInt(e.target.value) || 1 })}
            className="batch-input"
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              name="fixedPlatform" 
              checked={data.fixedPlatform} 
              onChange={handleChange}
              id="fixedPlatform"
            />
            <label htmlFor="fixedPlatform" style={{ fontSize: '10px', margin: 0, textTransform: 'none' }}>Same Platform</label>
          </div>
          <button className="btn-batch" onClick={() => onExport('batch')}>
            <Layers size={18} />
            Generate Batch
          </button>
        </div>
      </div>

      <div className="editor-section">
        <label>Email Recipient</label>
        <div className="input-group">
          <input 
            type="email" 
            name="recipientEmail" 
            value={data.recipientEmail || ''} 
            onChange={handleChange} 
            placeholder="recipient@example.com"
          />
        </div>
        <button 
          className="btn-email" 
          onClick={() => onExport('email')} 
          disabled={isSending}
          style={isSending ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
        >
          <Mail size={18} />
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </div>

      <div className="action-buttons">
        <button className="btn-randomize" onClick={onRandomize}>
          <RefreshCw size={18} />
          Randomize
        </button>
        <button className="btn-export-png" onClick={() => onExport('png')}>
          <Download size={18} />
          Save PNG
        </button>
        <button className="btn-export-pdf" onClick={() => onExport('pdf')}>
          <Download size={18} />
          Save PDF
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;
