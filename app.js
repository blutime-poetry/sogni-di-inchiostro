
const API_URL = "https://sogni-di-inchiostro.onrender.com";
const PDF_API_URL = "https://sogni-pdf-backend-final.onrender.com/pdf";

async function genera() {
  const poesia = document.getElementById('poesia').value.trim();
  const stile = document.getElementById('stile').value;

  if (!poesia) {
    alert("Scrivi una poesia prima di generare.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/generate-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: poesia, style: stile })
    });

    const data = await res.json();
    if (res.ok && data.imageUrl) {
      const preview = document.createElement("img");
      preview.src = data.imageUrl;
      preview.alt = "Immagine generata";
      preview.className = "preview";
      document.querySelector(".anteprime-poetiche").prepend(preview);
      window.generatedImage = data.imageUrl;
    } else {
      throw new Error(data.error || "Errore nella generazione dell'immagine.");
    }
  } catch (err) {
    console.error("Errore API generate-image:", err);
    alert("Errore nella richiesta per l'immagine.");
  }
}

async function scarica() {
  const poesia = document.getElementById('poesia').value.trim();
  const img = window.generatedImage;

  if (!img) {
    alert("Devi prima generare un'immagine.");
    return;
  }

  try {
    const res = await fetch(PDF_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testo: poesia, img: img })
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "poesia.pdf";
      a.click();
    } else {
      throw new Error("Errore nella risposta PDF");
    }
  } catch (err) {
    console.error("Errore API PDF:", err);
    alert("Errore nella richiesta per il PDF.");
  }
}

// Contatore visite (eseguito al caricamento della pagina)
document.addEventListener('DOMContentLoaded', () => {
  const totale = document.getElementById("counter-totali");
  const oggi = document.getElementById("counter-oggi");

  if (totale) {
    fetch("https://api.countapi.xyz/hit/sogni-di-inchiostro.github.io/visite_totali")
      .then(res => res.json())
      .then(data => {
        totale.textContent = data.value;
      })
      .catch(() => {
        totale.textContent = "—";
      });
  }

  if (oggi) {
    const dataOggi = new Date().toISOString().slice(0, 10);
    fetch(`https://api.countapi.xyz/hit/sogni-di-inchiostro.github.io/visite_${dataOggi}`)
      .then(res => res.json())
      .then(data => {
        oggi.textContent = data.value;
      })
      .catch(() => {
        oggi.textContent = "—";
      });
  }
});
