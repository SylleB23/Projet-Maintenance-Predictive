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

<img src="burger-menu.svg" id="burgerMenu"/>

</nav>

</header>


<ul class="LeMenu" id="leMenu">

<img src="fleche.jpg" id="FermerMenu" class="fermerMenu"/>

<li><a href="EspacePersonnel.php">Espace Personnel</a></li>

<li><a href="TableauDonnees.php">Tableau de données du verin</a></li>

<li><a href="Scenario.php">Scenario</a></li>

<li><a href="PageWebFesto.php">Deconnexion</a></li>

</ul>


<main class="main-content">

<h1>Historique des alertes</h1>

</main>


<section>

<h2>Alertes</h2>

<div id="section"></div>

</section>


<footer>

<p>&copy; 2026 – Projet Maintenance prédictive</p>

</footer>


<script src="Festo.js"></script>

<script>

document.addEventListener("DOMContentLoaded", function(){

recupererDonneesAlertes();

});

</script>


</body>

</html>