// ========================================
// CONFIGURATION MQTT
// ========================================

const MQTT_HOST      = "172.18.201.103";
const MQTT_PORT      = 9001;
const MQTT_CLIENT_ID = "mqttx_64eebdb6";
const MQTT_TOPIC     = "/verin/commande";
const MQTT_TOPIC2    = "/verin/reponse";
const MQTT_TOPIC3    = "/verin/alerte";
let clientMqtt;

// ========================================
// GESTION DU MENU BURGER
// ========================================

const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('leMenu');
const FermerMenu = document.getElementById('FermerMenu');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('ouvert');
        navLinks.classList.toggle('ouvert');
    });
}

if (FermerMenu) {
    FermerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('ouvert');
        navLinks.classList.toggle('ouvert');
    });
}

// ========================================
// AUTHENTIFICATION REST (ton API)
// ========================================

function Seconnecter() {
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;

    if (!email || !mdp) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    fetch("rest.php/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, mdp: mdp })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.setItem("user", data.user);
            window.location.href = "EspacePersonnel.php";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
        alert("Erreur serveur");
    });
}

function Inscription() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const pseudo = document.getElementById('pseudo').value;
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;
    const mdpConfirm = document.getElementById('mdpConfirm').value;

    const errorMessage = document.getElementById('errorMessage');

    if (errorMessage) {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
    }

    function showError(msg) {
        if (errorMessage) {
            errorMessage.style.display = "block";
            errorMessage.textContent = msg;
            errorMessage.style.color = "#ff4d4d";
        } else {
            alert(msg);
        }
    }

    if (!nom || !prenom || !pseudo || !email || !mdp) {
        showError('Veuillez remplir tous les champs');
        return;
    }

    if (mdp !== mdpConfirm) {
        showError('Les mots de passe ne correspondent pas');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Veuillez entrer une adresse email valide');
        return;
    }

    if (mdp.length < 8) {
        showError('Le mot de passe doit contenir au moins 8 caractères');
        return;
    }

    if (!/[A-Z]/.test(mdp)) {
        showError('Le mot de passe doit contenir au moins une lettre majuscule');
        return;
    }

    if (!/[a-z]/.test(mdp)) {
        showError('Le mot de passe doit contenir au moins une lettre minuscule');
        return;
    }

    if (!/[0-9]/.test(mdp)) {
        showError('Le mot de passe doit contenir au moins un chiffre');
        return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(mdp)) {
        showError('Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)');
        return;
    }

    fetch("rest.php/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mdp, pseudo, nom, prenom })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.setItem("user", data.user);
            window.location.href = "inscription_success.php";
        } else {
            showError(data.message || "Erreur lors de l'inscription");
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
        showError("Erreur de connexion au serveur");
    });
}

// ========================================
// TRANSITION / COMPTE À REBOURS
// ========================================

function initTransition() {
    const TransitionElement = document.getElementById('transition');
    if (TransitionElement) {
        let secondes = 5;
        const interval = setInterval(() => {
            secondes--;
            TransitionElement.textContent = secondes;
            if (secondes <= 0) {
                clearInterval(interval);
                window.location.href = 'PageWebFesto.php';
            }
        }, 1000);
    }
}

// ========================================
// TABLEAU DONNÉES CAPTEURS (REST)
// ========================================
 
async function recupererDonneesCapteurs() {
    try {
        const reponse = await fetch("rest.php/donnees");
        const reponseAPI = await reponse.json();
 
        let table = "<table class='tableau_statistique'>";
        table += "<tr><th>ID</th><th>Scenario</th><th>React Extract</th><th>React Retract</th><th>Travel Extract</th><th>Travel Retract</th><th>Date</th></tr>";
 
        for (let i = 0; i < reponseAPI.length; i++) {
            let d = reponseAPI[i];
            table += "<tr>";
            table += "<td>" + d.iddonnees + "</td>";
            table += "<td>" + d.idscenario + "</td>";
            table += "<td>" + d.Time_React_Extract1 + "</td>";
            table += "<td>" + d.Time_React_Retract1 + "</td>";
            table += "<td>" + d.Time_Travel_Extract1 + "</td>";
            table += "<td>" + d.Time_Travel_Retract1 + "</td>";
            table += "<td>" + d.date + "</td>";
            table += "</tr>";
        }
 
        table += "</table>";
        document.getElementById("tableauDonnees").innerHTML = table;
 
    } catch (error) {
        console.error("Erreur récupération données :", error);
    }
}
 
// ========================================
// ALERTES REST
// ========================================
 
async function recupererDonneesAlertes() {
    try {
        const reponse = await fetch("rest.php/alertes");
        const reponseAPI = await reponse.json();

        let table = "<table class='tableau_statistique'>";
        table += "<tr><th>ID</th><th>Vérin</th><th>Type</th><th>Date</th></tr>";

        for (let i = 0; i < reponseAPI.length; i++) {
            let a = reponseAPI[i];
            table += "<tr>";
            table += "<td>" + (a.idalertes ?? '') + "</td>";
            table += "<td>" + (a.idverin ?? '') + "</td>";//?? obligation sinon aucune données s'affichent(on est sur du temps reel)
            table += "<td>" + (a.type_alerte ?? '') + "</td>";
            table += "<td>" + (a.date ?? '') + "</td>";
            table += "</tr>";
        }

        table += "</table>";
        const container = document.getElementById("tableauAlertes");
        if (container) container.innerHTML = table;

    } catch (error) {
        console.error("Erreur récupération alertes :", error);
    }
}
// ========================================
// GRAPHE CHART.JS
// ========================================
 
let monGraph = null;
 
function Graph(x, rE, rR, tE, tR) {
    const canvas = document.getElementById("monGraphe");
    if (!canvas) return;
 
    const ctx = canvas.getContext("2d");
 
    if (!monGraph) {
        monGraph = new Chart(ctx, {
            type: "line",
            data: {
                labels: x,
                datasets: [
                    {
                        label: "React Extract (ms)",
                        data: rE,
                        borderColor: "#a855f7",
                        backgroundColor: "rgba(168,85,247,0.1)",
                        fill: false,
                        tension: 0.3,
                        pointRadius: 3
                    },
                    {
                        label: "React Retract (ms)",
                        data: rR,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59,130,246,0.1)",
                        fill: false,
                        tension: 0.3,
                        pointRadius: 3
                    },
                    {
                        label: "Travel Extract (ms)",
                        data: tE,
                        borderColor: "#06b6d4",
                        backgroundColor: "rgba(6,182,212,0.1)",
                        fill: false,
                        tension: 0.3,
                        pointRadius: 3
                    },
                    {
                        label: "Travel Retract (ms)",
                        data: tR,
                        borderColor: "#60a5fa",
                        backgroundColor: "rgba(96,165,250,0.1)",
                        fill: false,
                        tension: 0.3,
                        pointRadius: 3
                    }
                ]
            },
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: {
                        display: true,
                        text: 'Graphique des données des vérins (temps réel)',
                        color: '#ffffff',
                        font: { size: 14 }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: "Heure", color: "#94a3b8" },
                        ticks: { color: "#94a3b8", maxTicksLimit: 10 },
                        grid: { color: "rgba(255,255,255,0.05)" }
                    },
                    y: {
                        title: { display: true, text: "Temps (ms)", color: "#94a3b8" },
                        ticks: { color: "#94a3b8" },
                        grid: { color: "rgba(255,255,255,0.05)" }
                    }
                }
            }
        });
    } else {
        monGraph.data.labels = x;
        monGraph.data.datasets[0].data = rE;
        monGraph.data.datasets[1].data = rR;
        monGraph.data.datasets[2].data = tE;
        monGraph.data.datasets[3].data = tR;
        monGraph.update();
    }
}
 
// ========================================
// AJOUT D'UN POINT AU GRAPHE (MQTT live)
// ========================================
 
function ajouterPointGraphe(heure, valRE, valRR, valTE, valTR) {
    if (!monGraph) {
        Graph([heure], [valRE], [valRR], [valTE], [valTR]);
        return;
    }
 
    monGraph.data.labels.push(heure);
    monGraph.data.datasets[0].data.push(valRE);
    monGraph.data.datasets[1].data.push(valRR);
    monGraph.data.datasets[2].data.push(valTE);
    monGraph.data.datasets[3].data.push(valTR);
 
    if (monGraph.data.labels.length > 50) {
        monGraph.data.labels.shift();
        monGraph.data.datasets.forEach(d => d.data.shift());
    }
 
    monGraph.update("none");
}
// ========================================
// POPUP ALERTES TEMPS RÉEL
// ========================================

function afficherPopupAlerte(alerte) {
    const typeAlerte = alerte.type || alerte.type_alerte || "Anomalie";
    const idVerin = alerte.idverin || alerte.cycle || "?";
    const dateAlerte = alerte.date || alerte.timestamp || new Date().toLocaleString();

    const gravite = (alerte.niveau === "WARNING") ? "MOYENNE" : 
                    (alerte.niveau === "CRITICAL") ? "CRITIQUE" : "FAIBLE";

    const popup = document.createElement("div");
    popup.className = "popup-alerte";
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h3>⚠️ ALERTE</h3>
            <p><strong>Type :</strong> ${typeAlerte}</p>
            <p><strong>Gravité :</strong> ${gravite}</p>
            <p><strong>Cycle :</strong> ${idVerin}</p>
            <p><strong>Date :</strong> ${dateAlerte}</p>
            <a href="Historique.php" class="popup-lien">📋 Voir l'historique des alertes →</a>
        </div>
    `;

    document.body.appendChild(popup);
    popup.querySelector(".popup-close").onclick = () => popup.remove();
    setTimeout(() => { if (popup.parentNode) popup.remove(); }, 5000);
}

// ========================================
// CONNEXION MQTT (Paho) – sans affichage de statut
// ========================================

function initMQTT() {
    if (clientMqtt && clientMqtt.isConnected()) return;

    clientMqtt = new Paho.MQTT.Client(MQTT_HOST, MQTT_PORT, MQTT_CLIENT_ID);

    clientMqtt.onConnectionLost = () => {
        setTimeout(initMQTT, 5000);
    };

    clientMqtt.onMessageArrived = (message) => {
        try {
            const data = JSON.parse(message.payloadString);
            console.log("Message MQTT reçu :", data);

            const heure = new Date().toLocaleTimeString();

            if (message.destinationName === MQTT_TOPIC2) {
                if (data.Time_React_Extract1 !== undefined || data.T_REACTION_1 !== undefined) {
                    const valRE = parseFloat(data.Time_React_Extract1 || data.T_REACTION_1) || 0;
                    const valRR = parseFloat(data.Time_React_Retract1 || data.T_REACTION_2) || 0;
                    const valTE = parseFloat(data.Time_Travel_Extract1 || data.T_ALLER_1)   || 0;
                    const valTR = parseFloat(data.Time_Travel_Retract1 || data.T_ALLER_2)   || 0;
                    ajouterPointGraphe(heure, valRE, valRR, valTE, valTR);
                }
            } else if (message.destinationName === MQTT_TOPIC3) {
                afficherPopupAlerte(data);
            }

        } catch (e) {
            console.error("Erreur parsing MQTT :", message.payloadString, e);
        }
    };

    clientMqtt.connect({
        onSuccess: () => {
            clientMqtt.subscribe(MQTT_TOPIC);
            clientMqtt.subscribe(MQTT_TOPIC2);
            clientMqtt.subscribe(MQTT_TOPIC3);
        },
        onFailure: (err) => {
            console.error("Échec connexion MQTT :", err.errorMessage);
            setTimeout(initMQTT, 5000);
        },
        useSSL: false
    });
}

// ========================================
// LANCEMENT AU CHARGEMENT DE LA PAGE
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initTransition();
    initMQTT();

    if (document.getElementById("tableauDonnees")) {
        recupererDonneesCapteurs();
    }

    if (document.getElementById("tableauAlertes")) {
        recupererDonneesAlertes();
    }
});