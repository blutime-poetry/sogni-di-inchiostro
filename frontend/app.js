const API_URL = "https://sogni-di-inchiostro.onrender.com";

async function generaImmagine() {
    const testo = document.getElementById('poesia').value;
    const stile = document.getElementById('stile').value;
    
    if (!testo.trim()) {
        alert("Scrivi una poesia prima di generare l'immagine!");
        return;
    }

    try {
        // Mostra loader
        document.getElementById('risultato').innerHTML = `
            <div class="loader"></div>
            <p>Stiamo trasformando le tue parole in arte...</p>
        `;

        const response = await fetch(`${API_URL}/genera-immagine`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ testo, stile })
        });

        if (!response.ok) throw new Error(await response.text());
        
        const data = await response.json();
        
        document.getElementById('risultato').innerHTML = `
            <div class="artwork-container">
                <img src="${data.imageUrl}" alt="Opera d'arte generata">
                <div class="artwork-actions">
                    <button onclick="scaricaPDF('${data.imageUrl}')" class="download-btn">
                        📥 Scarica PDF
                    </button>
                    <button onclick="condividiOpera()" class="share-btn">
                        🔗 Condividi
                    </button>
                </div>
            </div>
        `;

    } catch (error) {
        console.error(error);
        document.getElementById('risultato').innerHTML = `
            <div class="error-message">
                ❌ Si è verificato un errore durante la generazione. Riprova!
            </div>
        `;
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
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'poesia-sogni-di-inchiostro.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        alert("Errore durante il download del PDF: " + error.message);
    }
}

function condividiOpera() {
    const testo = document.getElementById('poesia').value;
    const imageUrl = document.querySelector('#risultato img').src;
    
    const textToShare = `Guarda l'opera che ho creato con Sogni di Inchiostro!\n\n"${testo}"\n\n${imageUrl}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'La mia opera poetica',
            text: textToShare,
            url: window.location.href
        });
    } else {
        prompt("Copia questo link per condividere:", imageUrl);
    }
}
