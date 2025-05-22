# ✨ Sogni di Inchiostro

**Sogni di Inchiostro** è un progetto poetico-digitale che trasforma le parole in immagini e le emozioni in arte.  
Inserisci una poesia, scegli uno stile visivo, e lascia che l’algoritmo generi un’illustrazione su misura.  
Potrai poi scaricare l’opera completa in formato PDF, per conservarla, condividerla o regalarla.

> “La poesia non è solo parola. È immagine, è silenzio, è sogno che si disegna nel vento.” 🌬️

---

## 🌐 Live demo

- 🎨 **Frontend**: [GitHub Pages](https://blutime-poetry.github.io/sogni-di-inchiostro/frontend)  
- ⚙️ **Backend**: [Render API](https://sogni-di-inchiostro.onrender.com)

---

## 📂 Struttura del progetto

```
.
├── frontend/               # Sito statico (HTML, CSS, JS)
│   ├── index.html          # Pagina principale
│   ├── galleria.html       # Galleria delle opere
│   ├── styles.css          # Stile e colori
│   └── app.js              # Script interattivo
│
├── server.js               # Server Express + API
├── package.json            # Dipendenze Node.js
├── .gitignore              # File da escludere da Git
└── README.md               # Questo file
```

---

## 🚀 Funzionalità

- ✏️ Scrivi la tua poesia direttamente nel browser
- 🖼️ Seleziona uno **stile artistico** (Matita, Acquerello, Olio, Minimal)
- 🤖 Generazione immagine tramite AI (Replicate + SDXL)
- 📄 Download del **PDF personalizzato** con poesia e immagine
- 💝 Possibilità di donazione via PayPal

---

## 🛠️ Requisiti (per il backend)

- Node.js >= 18
- Un account su [Replicate](https://replicate.com/) con chiave API
- [Render.com](https://render.com/) per il deploy dell’API

---

## 🔐 Variabili d’ambiente

Nel pannello di Render, aggiungi:

```
REPLICATE_API_KEY=la-tua-chiave-segreta
```

---

## 💡 Idee future

- Login per salvare le proprie poesie
- Galleria condivisa con altre anime poetiche
- Esportazione in formato libro (ePub/PDF multipagina)
- Versione multilingue

---

## 📜 Licenza

Questo progetto è condiviso con spirito artistico e libero, ma i contenuti generati (poesie e immagini) restano proprietà dell'autore.

---

## ✍️ Autore

**Umberto Santamaria**  
Tecnologia e Poesia  
[blutime-poetry.github.io](https://blutime-poetry.github.io)

> “Ogni poesia è un mondo, ogni mondo un respiro: lascia che il codice ne faccia arte.”
