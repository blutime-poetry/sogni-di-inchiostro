const API_URL = "https://sogni-di-inchiostro.onrender.com";

async function generaImmagine() {
  const testo = document.getElementById('poesia').value;
  const stile = document.getElementById('stile').value;
  
  if (!testo) {
    alert("Inserisci una poesia!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/genera-immagine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testo, stile })
    });
    
    if (!response.ok) throw new Error(await response.text());
    
    const data = await response.json();
    document.getElementById('risultato').innerHTML = `
      <div class="risultato-container">
        <img src="${data.imageUrl}" alt="Illustrazione poesia">
        <button class="download-btn" onclick="scaricaPDF('${data.imageUrl}')">Scarica PDF</button>
      </div>
    `;
  } catch (error) {
    console.error("Errore:", error);
    alert("Errore durante la generazione: " + error.message);
  }
}

async function scaricaPDF(imageUrl) {
  const testo = document.getElementById('poesia').value;
  
  try {
    const response = await fetch(`${API_URL}/genera-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testo, imageUrl })
    });
    
    if (!response.ok) throw new Error(await response.text());
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poesia-sogni-di-inchiostro.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Errore download PDF:", error);
    alert("Errore durante il download del PDF");
  }
}
