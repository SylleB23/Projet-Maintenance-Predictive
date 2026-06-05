<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Historique des alertes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="PageWebFesto.css">
</head>
<body>

<!-- Premier header : Navbar -->
<header>
    <nav class="navbar">
        <a href="#" class="logo">
            <img src="Festo-logo.png" id="Festo-logo"/>
        </a>
        <img src="burger-menu.png" id="burgerMenu"/>
    </nav>
</header>

<!-- Second header : Hero (pour le style) -->
<header>
    <div class="main-content">
        <h1> Historique des alertes</h1>
        <p>Consultez l’ensemble des anomalies détectées sur le vérin pneumatique.</p>
    </div>
</header>

<ul class="LeMenu" id="leMenu">
    <img src="fleche.jpg" id="FermerMenu" class="fermerMenu"/>
    <li><a href="EspacePersonnel.php">Espace Personnel</a></li>
    <li><a href="TableauDonnees.php">Tableau de données du vérin</a></li>
    <li><a href="deconnexion.php" class="btn-deconnexion"> Se déconnecter</a></li>
</ul>

<section>
    <h2>Alertes</h2>
    <p class="compteur-alertes" id="compteurAlertes"></p>
    <div id="tableauAlertes"></div>
</section>

<footer>
    <p>&copy; 2026 – Projet Maintenance prédictive</p>
</footer>

<script src="Festo.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    recupererDonneesAlertes();
    setInterval(recupererDonneesAlertes, 2000);
});
</script>

</body>
</html>