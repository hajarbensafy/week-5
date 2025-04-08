document.getElementById('sunriseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const lat1 = document.getElementById('lat1').value;
    const lng1 = document.getElementById('lng1').value;
    const lat2 = document.getElementById('lat2').value;
    const lng2 = document.getElementById('lng2').value;
    
    if (!lat1 || !lng1 || !lat2 || !lng2) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    try {
       
        const url1 = `https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lng1}&formatted=0`;
        const url2 = `https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lng2}&formatted=0`;
        
        const responses = await Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json())
        ]);
        
        const [city1, city2] = responses;
        
        if (city1.status !== 'OK' || city2.status !== 'OK') {
            throw new Error('Erreur dans la récupération des données');
        }
        
        const sunrise1 = new Date(city1.results.sunrise).toLocaleTimeString();
        const sunrise2 = new Date(city2.results.sunrise).toLocaleTimeString();
        
        document.getElementById('results').innerHTML = `
            <div class="city-result">
                <h3>Ville 1</h3>
                <p>Lever du soleil: ${sunrise1}</p>
                <p>Coordonnées: ${lat1}, ${lng1}</p>
            </div>
            <div class="city-result">
                <h3>Ville 2</h3>
                <p>Lever du soleil: ${sunrise2}</p>
                <p>Coordonnées: ${lat2}, ${lng2}</p>
            </div>
        `;
        
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('results').innerHTML = `
            <p style="color: red;">Une erreur est survenue: ${error.message}</p>
        `;
    }
});