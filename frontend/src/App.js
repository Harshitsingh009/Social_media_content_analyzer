import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Upload from './components/Upload';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <main className="container">
        <Upload />
      </main>
      <Footer />
    </div>
  );
}
