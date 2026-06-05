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
 
<li><a href="EspacePersonnel.php">Espace Personnel</a></li>
<li><a href="Historique.php">Historique des alertes</a></li>
<li><a href="PageWebFesto.php">Deconnexion</a></li>
 
</ul>
 
<header>
<main class="main-content">
<h1>Données du verin</h1>
</main>
</header>
 
<section>
<h2>Tableau de données</h2>
<div id="tableauDonnees">
</div>
</section>
<footer>
<p>&copy; 2026 – Projet Maintenance prédictive</p>
</footer>


<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
<script src="Festo.js"></script>
 
<script>
document.addEventListener("DOMContentLoaded", function(){
    recupererDonneesCapteurs();
});
</script>
 
</body>
</html>