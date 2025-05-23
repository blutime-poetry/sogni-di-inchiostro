
const API_URL = "https://sogni-di-inchiostro.onrender.com";
const PDF_API_URL = "https://sogni-backend-pdf.onrender.com/pdf";

async function genera() {
  const poesia = document.getElementById('poesia').value;
  const stile = document.getElementById('stile').value;

  if (!poesia.trim()) {
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
      throw new Error("Errore nella risposta");
    }
  } catch (err) {
    console.error("Errore API generate-image:", err);
    alert("Errore nella richiesta per l'immagine.");
  }
}

async function scarica() {
  const poesia = document.getElementById('poesia').value;
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
      throw new Error("Errore nella risposta");
    }
  } catch (err) {
    console.error("Errore API PDF:", err);
    alert("Errore nella richiesta per il PDF.");
  }
}
