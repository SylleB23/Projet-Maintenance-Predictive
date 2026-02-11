<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Maintenance Prédictive</title>
    <link rel="stylesheet" href="connexion.css">
</head>
<body>
    <div class="ContenuBlocConnexion">
        <h2>Inscription</h2>
        <!-- preventDefault empêche le rechargement -->
        <form id="loginForm" onsubmit="event.preventDefault(); Inscription();">
             <div class="forme">
                <label for="nom">Nom</label>
                <input type="nom" id="nom" placeholder="Baby" required>
            </div>
             <div class="forme">
                <label for="prenom">Prenom</label>
                <input type="prenom" id="prenom" placeholder="Souly" required>
            </div>
             <div class="forme">
                <label for="pseudo">Pseudonyme</label>
                <input type="pseudo" id="pseudo" placeholder="Souly94" required>
            </div>
            <div class="forme">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="votre@email.com" required>
            </div>
            <div class="forme">
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" placeholder="••••••••" required>
            </div>
            <div id="errorMessage"></div>
            <button type="submit">S'inscrire</button>
        </form>

    <script src="Festo.js"></script>
</body>
</html>