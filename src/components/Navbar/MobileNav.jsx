import React from 'react';
import { Menu, X } from 'lucide-react';
import './MobileNav.css';

const MobileNav = ({ onToggle, isOpen }) => {
  return (
    <nav className="mobile-nav glass">
      <div className="mobile-nav-logo">
        <span className="logo-accent">PP</span> Receipt
      </div>
      <button className="mobile-toggle" onClick={onToggle}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default MobileNav;
