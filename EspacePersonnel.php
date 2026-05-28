<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Maintenance prédictive</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="PageWebFesto.css">
</head>
<body>
 
<header>
    <nav class="navbar">
        <a href="#" class="logo">
            <img src="Festo-logo.png" id="Festo-logo"/>
        </a>
        <img src="burger-menu.png" id="burgerMenu"/>
    </nav>
</header>
 
<ul class="LeMenu" id="leMenu">
    <img src="fleche.jpg" id="FermerMenu" class="fermerMenu"/>
    <li><a href="Historique.php">Historique des alertes</a></li>
    <li><a href="TableauDonnees.php">Tableau de données du verin</a></li>
    <li><a href="PageWebFesto.php">Deconnexion</a></li>
</ul>
 
<main class="main-content">
    <h1>Bienvenue dans votre Espace Personnel</h1>
    <h1>EPATANT</h1>
</main>
 
<section>
    <h2>Graphiques des données du verin</h2>
 
    <div style="margin: 8px 0 12px 0;">
        <span id="statutMQTT" style="font-size:0.9rem; font-weight:600; padding: 4px 12px; border-radius: 20px; background: rgba(0,0,0,0.3); color: white;">
             Connexion MQTT...
        </span>
    </div>
 
    <div id="grapheContainer">
        <canvas id="monGraphe"></canvas>
    </div>
</section>
 
<footer>
    <p>&copy; 2026 – Projet Maintenance prédictive</p>
</footer>
 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
<script src="Festo.js"></script>
 
</body>
</html>