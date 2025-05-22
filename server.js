const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Configurazioni base
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route API
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: 'API Sogni di Inchiostro funzionante!' });
});

// Servi il frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY
});

// Genera immagine con AI
app.post('/genera-immagine', async (req, res) => {
  try {
    const { testo, stile } = req.body;
    
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      { 
        input: { 
          prompt: `Illustrazione in stile ${stile} della poesia: "${testo}", alta qualità artistica`,
          negative_prompt: "text, watermark, low quality"
        }
      }
    );
    
    res.json({ imageUrl: output[0] });
  } catch (error) {
    console.error("Errore generazione immagine:", error);
    res.status(500).json({ error: "Errore durante la generazione" });
  }
});

// Genera PDF
app.post('/genera-pdf', async (req, res) => {
  try {
    const { testo, imageUrl } = req.body;
    const doc = new PDFDocument();
    
    doc.text(testo, { align: 'center' });
    doc.moveDown();
    doc.image(imageUrl, { 
      width: 400,
      align: 'center'
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error("Errore generazione PDF:", error);
    res.status(500).send("Errore generazione PDF");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
  console.log(`Frontend disponibile su: http://localhost:${PORT}`);
});
