const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configura Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY
});

// Rotta di test
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'API Sogni di Inchiostro funzionante!',
    endpoints: {
      generateImage: 'POST /api/generate-image',
      generatePDF: 'POST /api/generate-pdf'
    }
  });
});

// Genera immagine
app.post('/api/generate-image', async (req, res) => {
  try {
    const { text, style } = req.body;
    
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: `Illustrazione in stile ${style} della poesia: "${text}"`,
          negative_prompt: "text, watermark, low quality",
          width: 768,
          height: 768
        }
      }
    );
    
    res.json({ imageUrl: output[0] });
  } catch (error) {
    console.error('Errore generazione immagine:', error);
    res.status(500).json({ error: 'Errore generazione immagine' });
  }
});

// Genera PDF
app.post('/api/generate-pdf', (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const doc = new PDFDocument();
    
    doc.font('Helvetica').fontSize(20);
    doc.text(text, { align: 'center' });
    doc.moveDown();
    
    doc.image(imageUrl, { 
      fit: [400, 400],
      align: 'center',
      valign: 'center'
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Errore generazione PDF:', error);
    res.status(500).json({ error: 'Errore generazione PDF' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
