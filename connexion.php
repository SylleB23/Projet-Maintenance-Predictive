<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
     <link rel="stylesheet" href="connexion.css">
   
<body>
    <div class="ContenuBlocConnexion">
        <h2>Connexion</h2>
        <div class="forme">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="votre@email.com" required>
        </div>
        <div class="forme">
            <label for="motdepasse">Mot de passe</label>
            <input type="motdepasse" id="motdepasse" placeholder="••••••••" required>
        </div>
        <button onclick="Seconnecter()">Se connecter</button>
        <div class="links">
            <a href="#">Mot de passe oublié ?</a>
        </div>
    </div>

    <script src="Festo.js"></script>
</body>
</html>