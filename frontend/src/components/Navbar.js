import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__brand">SocialAnalyzer</div>
      <ul className="nav__links">
        <li>Home</li>
        <li>Upload</li>
        <li>Docs</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
