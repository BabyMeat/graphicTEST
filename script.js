// Fonction pour afficher les activités
function displayActivities(activitiesData) {
    const activitiesContainer = document.getElementById('activities');
    activitiesData.activites.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.classList.add('activity');

        // Infos de base de l'activité
        activityDiv.innerHTML = `
            <h2>${activity.description} (${activity.date})</h2>
            <p><strong>Lieu:</strong> ${activity.lieu}</p>
            <p><strong>Participants:</strong> ${activity.participants}</p>
            <h3>Appréciations:</h3>
        `;

        // Afficher les appréciations
        activity.appreciations.forEach(appreciation => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            const profilePic = appreciation.image_profil 
                ? `<img src="${appreciation.image_profil}" class="profile-pic" alt="Photo de profil">` 
                : `<span class="profile-placeholder"></span>`;

            commentDiv.innerHTML = `
                ${profilePic}
                <strong>${appreciation.pseudo}</strong> - Note: ${appreciation.note}/5
                <p>${appreciation.commentaire}</p>
            `;
            activityDiv.appendChild(commentDiv);
        });

        activitiesContainer.appendChild(activityDiv);
    });
}

// Charger les données JSON à partir du fichier externalisé
fetch('activities.json')
    .then(response => response.json())
    .then(data => displayActivities(data))
    .catch(error => console.error('Erreur lors du chargement des données :', error));