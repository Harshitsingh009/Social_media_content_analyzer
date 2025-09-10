# Social Media Content Analyzer

A web application to extract text from PDFs and images using a combination of **Node.js backend** and **React frontend**. The backend is deployed on **Render**, and the frontend is deployed on **Vercel**.

---

## Features

- Upload PDF or Image files.
- Extract text from PDF using `pdf-parse` on the server.
- Extract text from images using `Tesseract.js` on the client.
- Drag & drop or file chooser interface.
- Frontend communicates with backend using environment variables for flexibility.

---

## Project Structure
Social_media_content_analyzer/
├── backend/ # Node.js + Express server
│ ├── server.js
│ └── package.json
└── frontend/ # React frontend
├── src/
│ ├── App.js
│ ├── components/
│ │ ├── Upload.js
│ │ ├── Navbar.js
│ │ ├── Hero.js
│ │ └── Footer.js
│ └── App.css
└── package.json

## Usage

Open the frontend.

Drag & drop a PDF or image file, or click to choose a file.

For PDF: Text will be extracted by backend.

For image: Text will be extracted on client-side using OCR.

Extracted text will appear in the textarea below.

## Notes

Supported file types: .pdf, .jpg, .jpeg, .png, .bmp, .gif.

Environment variable approach ensures flexibility across local and production deployments.

Frontend must always use process.env.REACT_APP_API_URL to access backend API.

