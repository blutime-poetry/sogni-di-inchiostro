const API_URL = "https://sogni-backend.onrender.com";

document.getElementById("generate-btn").addEventListener("click", async () => {
  const testo = document.getElementById("poem-text").value;
  const stile = document.getElementById("style").value;

  if (!testo.trim()) {
    alert("Scrivi prima la poesia.");
    return;
  }

  try {
    const res = await fetch(API_URL + "/genera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ testo, stile })
    });

    const data = await res.json();
    if (data.image) {
      const img = document.createElement("img");
      img.src = API_URL + "/" + data.image;
      img.alt = "Immagine generata";
      img.className = "preview";
      const container = document.querySelector(".container");
      container.appendChild(img);
    } else {
      alert("Errore nella generazione dell'immagine.");
    }
  } catch (err) {
    console.error(err);
    alert("Errore nella richiesta.");
  }
});

document.getElementById("download-btn").addEventListener("click", async () => {
  const testo = document.getElementById("poem-text").value;
  const immagine = document.querySelector("img.preview");
  const imgSrc = immagine ? immagine.src.replace(API_URL + "/", "") : "";

  try {
    const res = await fetch(API_URL + "/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ testo, img: imgSrc })
    });

    if (!res.ok) throw new Error("Errore nella creazione del PDF");

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "poesia.pdf";
    link.click();
  } catch (err) {
    console.error(err);
    alert("Errore nel download del PDF");
  }
});

