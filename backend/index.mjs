import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

// Get __dirname equivalent
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
    
    // Cleanup file after processing
    fs.unlinkSync(filePath);

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OCR failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
