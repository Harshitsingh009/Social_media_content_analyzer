import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './Upload.css';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const fileRef = useRef();

  const handleFiles = async (files) => {
    setError('');
    setText('');
    if (!files || files.length === 0) return;
    const file = files[0];
    setLoading(true);

    try {
      // If PDF → send to server which uses pdf-parse
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('https://socialmediaanalyzer-s5w4.onrender.com/extract', {
          method: 'POST',
          body: form
        });
        if (!res.ok) {
          const err = await res.json().catch(()=>({ error: res.statusText }));
          throw new Error(err.error || 'Server extraction failed');
        }
        const body = await res.json();
        setText(body.text || '');
      }
      // If image → client-side OCR via tesseract.js
      else if (file.type.startsWith('image/') || /\.(jpg|jpeg|png|bmp|gif)$/i.test(file.name)) {
        const { data: { text: ocrText } } = await Tesseract.recognize(file, 'eng', {
          logger: m => {} // optional
        });
        setText(ocrText.trim());
      } else {
        setError('Unsupported file type. Upload a PDF or an image.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to extract text');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const onFileChange = (e) => handleFiles(e.target.files);

  return (
    <section className="upload" id="upload">
      <h2>Upload PDF or Image</h2>

      <div
        className="upload__drop"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current.click()}
        role="button"
      >
        <p>Drag & drop a PDF or image here, or click to choose</p>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,image/*"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {loading && <div className="upload__status">Processing... this may take a few seconds.</div>}
      {error && <div className="upload__error">{error}</div>}

      <textarea
        className="upload__output"
        value={text}
        placeholder="Extracted text will appear here..."
        readOnly
        rows={12}
      />
    </section>
  );
}
