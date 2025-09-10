import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Analyze social posts & scanned documents</h1>
        <p>Upload PDFs or images — we extract text and help you improve engagement.</p>
        <a className="hero__cta" href="#upload">Get started</a>
      </div>
      <div className="hero__art" aria-hidden>📄🔍</div>
    </section>
  );
}
