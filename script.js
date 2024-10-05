// Fonction pour charger le fichier CSV
async function fetchData() {
    try {
        const response = await fetch('activites.csv');
        if (!response.ok) {
            throw new Error('Erreur de chargement du fichier CSV');
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Enlever les en-têtes

        let dates = [];
        let participants = [];
        let appreciations = [];

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length === 5) {
                dates.push(cols[0]);
                participants.push(parseInt(cols[3]));
                appreciations.push(parseInt(cols[4]));
            }
        });

        return { dates, participants, appreciations };
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
        console.error(error);
        return null;
    }
}

// Fonction pour créer le graphique
async function createChart() {
    const data = await fetchData();
    if (!data) return;

    const ctx = document.getElementById('activityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Tu peux changer en 'bar' pour un graphique en barres
        data: {
            labels: data.dates, // Les dates de tes activités
            datasets: [
                {
                    label: 'Participants',
                    data: data.participants,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Appréciation',
                    data: data.appreciations,
                    borderColor: 'green',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

createChart();