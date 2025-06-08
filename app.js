
const API_URL = "https://sogni-di-inchiostro.onrender.com";
const PDF_API_URL = "https://sogni-pdf-backend-final.onrender.com/pdf";

function mostraMessaggio(testo) {
  let msgBox = document.createElement("div");
  msgBox.textContent = testo;
  msgBox.style.position = "fixed";
  msgBox.style.bottom = "2rem";
  msgBox.style.left = "50%";
  msgBox.style.transform = "translateX(-50%)";
  msgBox.style.backgroundColor = "#2a5dba";
  msgBox.style.color = "white";
  msgBox.style.padding = "1rem 2rem";
  msgBox.style.borderRadius = "10px";
  msgBox.style.fontFamily = "'Georgia', serif";
  msgBox.style.fontSize = "1rem";
  msgBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  msgBox.style.zIndex = "1000";
  document.body.appendChild(msgBox);

  setTimeout(() => {
    msgBox.style.opacity = "0";
    setTimeout(() => msgBox.remove(), 1000);
  }, 3500);
}

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

      // Messaggio poetico dopo generazione immagine
      mostraMessaggio("🖼️ L’immagine del tuo verso ha preso forma. È apparsa, come un sogno disegnato.");
    } else {
      throw new Error("Errore nella risposta");
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

      // Messaggio poetico dopo download
      mostraMessaggio("📄 La tua poesia è ora un frammento visibile del sogno. Scaricata con successo.");
    } else {
      throw new Error("Errore nella risposta PDF");
    }
  } catch (err) {
    console.error("Errore API PDF:", err);
    alert("Errore nella richiesta per il PDF.");
  }

  fetch("https://api.countapi.xyz/hit/sogni-di-inchiostro/visite")
    .then(response => response.json())
    .then(data => {
      document.getElementById("counter").innerText = data.value;
    })
    .catch(() => {
      document.getElementById("counter").innerText = "—";
    });
}
