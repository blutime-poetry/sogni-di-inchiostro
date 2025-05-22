const API_URL = "https://tuo-backend-url.onrender.com"; // SOSTITUISCI CON L'URL DEL TUO BACKEND SU RENDER

async function generaImmagine() {
    const testo = document.getElementById('poesia').value;
    const stile = document.getElementById('stile').value;

    try {
        const response = await fetch(`${API_URL}/genera-immagine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ testo, stile })
        });
        const data = await response.json();
        
        document.getElementById('risultato').innerHTML = `
            <img src="${data.imageUrl}" width="300" style="margin: 20px 0;">
            <button onclick="scaricaPDF('${data.imageUrl}')">Scarica PDF</button>
        `;
    } catch (error) {
        alert("Errore durante la generazione dell'immagine!");
    }
}

async function scaricaPDF(imageUrl) {
    const testo = document.getElementById('poesia').value;
    const response = await fetch(`${API_URL}/genera-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testo, imageUrl })
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poesia.pdf';
    a.click();
}
