const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const Replicate = require('replicate');

const app = express();
app.use(cors());
app.use(express.json());

const Replicate = require("replicate");
const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });

app.post('/genera-immagine', async (req, res) => {
    const { testo, stile } = req.body;
    
    try {
        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            { input: { prompt: `${testo}, stile ${stile}, alta qualità artistica` } }
        );
        res.json({ imageUrl: output[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });

// Genera immagini con AI
app.post('/genera-immagine', async (req, res) => {
    const { testo, stile } = req.body;
    const prompt = `${testo}, illustrazione in stile ${stile}, alta qualità, artistico`;

    try {
        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            { input: { prompt } }
        );
        res.json({ imageUrl: output[0] });
    } catch (error) {
        res.status(500).json({ error: "Errore API AI" });
    }
});

// Genera PDF
app.post('/genera-pdf', (req, res) => {
    const { testo, imageUrl } = req.body;
    const doc = new PDFDocument();
    doc.text(testo, { align: 'center' });
    doc.image(imageUrl, { width: 300, align: 'center' });
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
});

const PDFDocument = require('pdfkit');

app.post('/genera-pdf', (req, res) => {
    const { testo, imageUrl } = req.body;
    const doc = new PDFDocument();
    
    doc.text(testo, { align: 'center' });
    doc.image(imageUrl, { width: 300, align: 'center' });
    
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
});

// Avvia server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
