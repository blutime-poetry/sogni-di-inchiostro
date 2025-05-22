const API_URL = "https://sogni-di-inchiostro.onrender.com";

async function generateImage() {
    const poemText = document.getElementById('poem-text').value;
    const style = document.getElementById('style-select').value;
    
    if (!poemText.trim()) {
        alert("Per favore, inserisci una poesia!");
        return;
    }

    try {
        // Mostra loader
        document.getElementById('result-section').classList.remove('hidden');
        document.getElementById('generated-image').src = "";
        document.getElementById('result-section').innerHTML = '<div class="loader">Generando la tua opera...</div>';

        const response = await fetch(`${API_URL}/api/generate-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: poemText,
                style: style
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        
        // Mostra risultato
        document.getElementById('result-section').innerHTML = `
            <div class="artwork-container">
                <img id="generated-image" src="${data.imageUrl}" alt="Opera generata">
                <button id="download-pdf" onclick="downloadPDF()">Scarica PDF</button>
            </div>
        `;
        
    } catch (error) {
        console.error("Errore:", error);
        document.getElementById('result-section').innerHTML = `
            <div class="error">Errore durante la generazione: ${error.message}</div>
        `;
    }
}

async function downloadPDF() {
    const poemText = document.getElementById('poem-text').value;
    const imageUrl = document.getElementById('generated-image').src;
    
    try {
        const response = await fetch(`${API_URL}/api/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: poemText,
                imageUrl: imageUrl
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

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
