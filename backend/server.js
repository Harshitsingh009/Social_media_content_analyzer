// server.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); // allow requests from CRA dev server

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.post('/extract', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { path: fp, mimetype, originalname } = req.file;
    // Only handle PDFs on server
    if (mimetype === 'application/pdf' || originalname.toLowerCase().endsWith('.pdf')) {
      const dataBuffer = fs.readFileSync(fp);
      const data = await pdfParse(dataBuffer);
      fs.unlinkSync(fp); // clean up
      return res.json({ text: data.text || '' });
    }

    // unsupported by server - remove file and respond
    fs.unlinkSync(fp);
    return res.status(400).json({ error: 'Server only accepts PDFs. Use client OCR for images.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Extraction failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`PDF-extract server listening on ${PORT}`));
