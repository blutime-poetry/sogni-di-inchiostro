const API_URL = "https://TUO-BACKEND-RENDER.onrender.com";

async function generateImage() {
  const poemText = document.getElementById('poem-text').value;
  const style = document.getElementById('style-select').value;
  const result = document.getElementById('result-section');

  if (!poemText.trim()) {
    alert("Inserisci una poesia prima di generare.");
    return;
  }

  result.classList.remove('hidden');
  result.innerHTML = "<p>Generazione in corso...</p>";

  try {
    const response = await fetch(`${API_URL}/api/generate-image`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: poemText, style: style })
    });
    const data = await response.json();
    result.innerHTML = `<div class="artwork-container">
      <img id="generated-image" src="${data.imageUrl}" alt="Opera generata">
      <button id="download-pdf" onclick="downloadPDF()">Scarica PDF</button>
    </div>`;
  } catch (error) {
    result.innerHTML = "<p>Errore durante la generazione.</p>";
  }
}

async function downloadPDF() {
  const text = document.getElementById("poem-text").value;
  const imageUrl = document.getElementById("generated-image").src;

  try {
    const response = await fetch(`${API_URL}/api/generate-pdf`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: text, imageUrl: imageUrl })
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "poesia.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    alert("Errore durante il download del PDF.");
  }
}
