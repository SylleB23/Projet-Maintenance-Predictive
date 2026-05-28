<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Documentation rapide - FESTO</title>
    <link rel="stylesheet" href="PageWebFesto.css">

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const burger = document.getElementById('burgerMenu');
            const menu = document.querySelector('.LeMenu');
            const fermer = document.querySelector('.fermerMenu');
            
            if (burger && menu) {
                burger.addEventListener('click', function() {
                    menu.classList.toggle('ouvert');
                });
            }
            if (fermer && menu) {
                fermer.addEventListener('click', function() {
                    menu.classList.remove('ouvert');
                });
            }
        });
    </script>
</head>
<body>

<!-- PREMIER HEADER : Navbar -->
<header>
    <div class="navbar">
        <img src="Festo-logo.png" id="Festo-logo"/>
        <div id="burgerMenu">
             <img src="burger-menu.png" id="burgerMenu"/>
        </div>
    </div>
</header>


<ul class="LeMenu">
    <li><a href="PageWebFesto.php">Accueil</a></li>
    <li><a href="connexion.php">Connexion</a></li>
    <li><a href="inscription.php">Inscription</a></li>
</ul>


<header>
    <div class="main-content">
        <h1>Documentation utilisateur</h1>
    </div>
</header>


<div class="doc-container">
    <h1>Documentation rapide – Supervision FESTO</h1>

    <h2>1. Accès et navigation</h2>
    <p>Menu burger (☰) en haut à droite → panneau de navigation. Pages : Accueil, Connexion, Inscription, Documentation.<br>
    Une fois connecté : Espace personnel, Tableau des données, Historique des alertes.</p>

    <h2>2. Se connecter / s’inscrire</h2>
    <p><strong>Inscription :</strong> nom, prénom, pseudo, email, mot de passe (8 caractères, 1 majuscule, 1 chiffre, 1 spécial).<br>
    <strong>Connexion :</strong> email + mot de passe → accès à l’Espace personnel.</p>

    <h2>3. Espace personnel (temps réel)</h2>
    <p>Graphique avec 4 courbes (temps de réaction et de déplacement).<br>
    Mise à jour toutes les 2 secondes <strong>si un cycle est en cours</strong>.<br>
    <strong>Alertes popup :</strong> apparaît automatiquement (type de panne, date). Disparaît après 5 secondes ou en cliquant dessus.</p>

    <h2>4. Tableau des données</h2>
    <p>Liste toutes les mesures des cycles passés.</p>

    <h2>5. Historique des alertes</h2>
    <p>Tableau de toutes les alertes (ID, scénario, vérin, type, date). Rafraîchissement toutes les 2 secondes.</p>

    <h2>6. Utilisation sur mobile</h2>
    <p>Le site s’adapte automatiquement à votre téléphone. Menus et graphiques sont lisibles sans zoomer.</p>

    <h2>7. Lancer un cycle (pour les techniciens)</h2>
    <p>Utiliser MQTTX : broker <code>172.18.201.103:9001</code>, topic <code>/verin/commande</code>, message <code>{"msg": "start", "cycles": 10}</code>.</p>

    <div class="note">
        💡 <strong>Astuce :</strong> Si rien ne s’affiche, vérifiez qu’un cycle est lancé et que l’indicateur MQTT est vert (connecté).Egalement, pensez a vous connecter à la wifi de l'appareil (FESTO_AP).
    </div>
</div>

<footer>
    <p>&copy; 2026 – Projet Maintenance prédictive</p>
</footer>

</body>
</html>