import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} SocialAnalyzer</div>
      <div className="footer__links">
        <a href="#privacy">Privacy</a>
        <a href="#help">Help</a>
      </div>
    </footer>
  );
}
