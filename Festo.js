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
// AUTHENTIFICATION REST
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
 
document.addEventListener('DOMContentLoaded', function () {
    initTransition();
});
 
// ========================================
// TABLEAU DONNÉES CAPTEURS (REST)
// ========================================
 
async function recupererDonneesCapteurs() {
    try {
        const reponse = await fetch("rest.php/donnees");
        const reponseAPI = await reponse.json();
 
        let table = "<table class='tableau_statistique'>";
        table += "<tr><th>ID</th><th>Scenario</th><th>React Extract</th><th>React Retract</th><th>Travel Extract</th><th>Travel Retract</th></tr>";
 
        for (let i = 0; i < reponseAPI.length; i++) {
            let d = reponseAPI[i];
            table += "<tr>";
            table += "<td>" + d.iddonnees + "</td>";
            table += "<td>" + d.idscenario + "</td>";
            table += "<td>" + d.Time_React_Extract1 + "</td>";
            table += "<td>" + d.Time_React_Retract1 + "</td>";
            table += "<td>" + d.Time_Travel_Extract1 + "</td>";
            table += "<td>" + d.Time_Travel_Retract1 + "</td>";
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
        table += "<tr><th>ID</th><th>Scénario</th><th>Vérin</th><th>Type</th><th>Date</th></tr>";
 
        for (let i = 0; i < reponseAPI.length; i++) {
            let a = reponseAPI[i];
            table += "<tr>";
            table += "<td>" + a.idalertes + "</td>";
            table += "<td>" + a.idscenario + "</td>";
            table += "<td>" + a.idverin + "</td>";
            table += "<td>" + a.type_alerte + "</td>";
            table += "<td>" + a.date + "</td>";
            table += "</tr>";
        }
 
        table += "</table>";
        document.getElementById("tableauAlertes").innerHTML = table;
 
    } catch (error) {
        console.error("Erreur récupération alertes :", error);
    }
}
 
// ========================================
// CONFIGURATION MQTT
// ========================================

const MQTT_HOST = "172.18.201.103";
const MQTT_PORT = 9001;
const MQTT_CLIENT_ID = "mqttx_64eebdb6";
const MQTT_TOPIC  = "/verin/commande";
const MQTT_TOPIC2 = "/verin/reponse";
let clientMqtt;

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
// GRAPHE VIA API REST (idscenario)
// ========================================
 
function TraceGrapheFesto(idscenario) {
    fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/graphe/" + idscenario)
        .then(response => {
            if (!response.ok) throw new Error("Erreur HTTP");
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                console.warn("Aucune donnée reçue");
                return;
            }
 
            let heures = [], rE = [], rR = [], tE = [], tR = [];
 
            let seuilReact = 10;
            let seuilTravel = 200;
            let anomalieDetectee = false;
 
            if (typeof window.alerteEnvoyeeGlobal === "undefined") {
                window.alerteEnvoyeeGlobal = false;
            }
 
            for (let i = 0; i < data.length; i++) {
                if (data[i].date) {
                    heures.push(new Date(data[i].date).toLocaleTimeString());
 
                    let valRE = parseFloat(data[i].Time_React_Extract1) || 0;
                    let valRR = parseFloat(data[i].Time_React_Retract1) || 0;
                    let valTE = parseFloat(data[i].Time_Travel_Extract1) || 0;
                    let valTR = parseFloat(data[i].Time_Travel_Retract1) || 0;
 
                    rE.push(valRE);
                    rR.push(valRR);
                    tE.push(valTE);
                    tR.push(valTR);
 
if (valRE > seuilReact || valRR > seuilReact || valTE > seuilTravel || valTR > seuilTravel) {
                        anomalieDetectee = true;
            if (!window.alerteEnvoyeeGlobal) {
                            window.alerteEnvoyeeGlobal = true;
                            fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/ajouter-alerte", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ idscenario: idscenario, idverin: 1, type_alerte: "anomalie" })
                            })
                            .then(res => res.json())
                            .then(res => console.log("Alerte envoyée :", res))
                            .catch(err => console.error("Erreur envoi alerte :", err));
                        }
                    }
                }
            }
 
            if (!anomalieDetectee) window.alerteEnvoyeeGlobal = false;
            document.body.style.backgroundColor = anomalieDetectee ? "#2b0000" : "";
 
            Graph(heures, rE, rR, tE, tR);
        })
        .catch(error => console.error("Erreur API :", error));
}
 
// ========================================
// MQTT — DONNÉES TEMPS RÉEL
// ========================================
 
/**
 * Connexion MQTT via WebSocket au broker emqx public.
 * On s'abonne au topic "MIP" qui reçoit les données pression_MIP du vérin Festo.
 * À chaque message reçu, le graphe est mis à jour avec les 4 indicateurs de temps.
 * Si les données MQTT ne contiennent pas directement les 4 champs,
 * on les récupère aussi via l'API REST toutes les 2 secondes (mécanisme de secours).
 */
 
let mqttClient = null;
let mqttConnecte = false;
 
// Indicateur de statut affiché à l'utilisateur
function setStatutMQTT(statut, couleur) {
    const el = document.getElementById("statutMQTT");
    if (el) {
        el.textContent = statut;
        el.style.color = couleur;
    }
}
 
function initMQTT() {
    if (typeof mqtt === "undefined") {
        console.error("Bibliothèque MQTT non chargée.");
        setStatutMQTT(" MQTT non disponible");
        return;
    }
 
    // Connexion WebSocket au broker public emqx
    // Le broker écoute en WebSocket sur le port 8083 (ws) ou 8084 (wss)
    const brokerURL = "wss://broker.emqx.io:8084/mqtt";
 
    const options = {
        clientId: "mqttx_64eebdb6",   // Client ID correspondant à votre session MQTTX
        clean: true,
        reconnectPeriod: 3000,         // Reconnexion automatique toutes les 3s
        connectTimeout: 10000
    };
 
    setStatutMQTT("Connexion MQTT...", "#f59e0b");
    console.log("Tentative connexion MQTT :", brokerURL);
 
    mqttClient = mqtt.connect(brokerURL, options);
 
    // ---- Connexion réussie ----
    mqttClient.on("connect", () => {
        mqttConnecte = true;
        console.log("Connecté au broker MQTT");
        setStatutMQTT(" MQTT connecté (broker.emqx.io)", "#22c55e");
 
        // Abonnement au topic MIP (données pression du vérin Festo)
        mqttClient.subscribe("MIP", { qos: 0 }, (err) => {
            if (err) {
                console.error("Erreur abonnement MIP :", err);
            } else {
                console.log(" Abonné au topic : MIP");
            }
        });
    });
 
    // ---- Erreur de connexion ----
    mqttClient.on("error", (err) => {
        mqttConnecte = false;
        console.error("Erreur MQTT :", err);
        setStatutMQTT(" Erreur MQTT");
    });
 
    // ---- Déconnexion ----
    mqttClient.on("close", () => {
        mqttConnecte = false;
        setStatutMQTT(" MQTT déconnecté — reconnexion...", "#f59e0b");
        console.warn("MQTT déconnecté.");
    });
 
    // ---- Réception d'un message ----
    mqttClient.on("message", (topic, message) => {
        try {
            const raw = message.toString();
            console.log(" Message MQTT reçu sur [" + topic + "] :", raw);
 
            const data = JSON.parse(raw);
 
            // Le message du topic MIP contient un tableau pression_MIP
            // ex: {"pression_MIP":[0,1,0,0,1,0,1,0,0,0,0,1,0,0]}
            // On récupère aussi les données de temps si disponibles
            const heure = new Date().toLocaleTimeString();
 
            // ---------------------------------------------------------
            // CAS 1 : Le message contient directement les 4 champs de temps
            // (format enrichi possible si le broker publie ces valeurs)
            // ---------------------------------------------------------
            if (
                data.Time_React_Extract1 !== undefined ||
                data.T_REACTION_1 !== undefined
            ) {
                const valRE = parseFloat(data.Time_React_Extract1 || data.T_REACTION_1) || 0;
                const valRR = parseFloat(data.Time_React_Retract1 || data.T_REACTION_2) || 0;
                const valTE = parseFloat(data.Time_Travel_Extract1 || data.T_ALLER_1) || 0;
                const valTR = parseFloat(data.Time_Travel_Retract1 || data.T_ALLER_2) || 0;
 
                ajouterPointGraphe(heure, valRE, valRR, valTE, valTR);
            }
            // ---------------------------------------------------------
            // CAS 2 : Le message contient pression_MIP (format actuel observé)
            // On stocke la pression et on déclenche une récupération API REST
            // pour obtenir les vraies données de temps du dernier cycle
            // ---------------------------------------------------------
            else if (data.pression_MIP !== undefined) {
                console.log("pression_MIP reçue :", data.pression_MIP);
                // Déclenchement d'une mise à jour via l'API REST
                // pour récupérer les dernières données de temps disponibles
                rafraichirDepuisAPI();
            }
 
        } catch (e) {
            console.error("JSON MQTT invalide :", message.toString(), e);
        }
    });
}
 
// ========================================
// AJOUT D'UN POINT AU GRAPHE (MQTT live)
// ========================================
 
/**
 * Ajoute un point de données au graphe existant sans reconstruire tout le graphe.
 * Garde un maximum de 50 points pour la lisibilité.
 */
function ajouterPointGraphe(heure, valRE, valRR, valTE, valTR) {
    if (!monGraph) {
        // Si le graphe n'existe pas encore, on l'initialise avec ce premier point
        Graph([heure], [valRE], [valRR], [valTE], [valTR]);
        return;
    }
 
    monGraph.data.labels.push(heure);
    monGraph.data.datasets[0].data.push(valRE);
    monGraph.data.datasets[1].data.push(valRR);
    monGraph.data.datasets[2].data.push(valTE);
    monGraph.data.datasets[3].data.push(valTR);
 
    // On garde 50 points maximum
    if (monGraph.data.labels.length > 50) {
        monGraph.data.labels.shift();
        monGraph.data.datasets.forEach(d => d.data.shift());
    }
 
    monGraph.update("none"); // "none" = pas d'animation à chaque point pour fluidité
}
 
// ========================================
// RAFRAÎCHISSEMENT VIA API REST (fallback)
// ========================================
 
/**
 * Appelé soit directement toutes les 2 secondes (setInterval),
 * soit déclenché par un message MQTT pression_MIP.
 * Récupère les dernières données de temps du scénario actif depuis l'API REST.
 */
async function rafraichirDepuisAPI() {
    try {
        
        const idscenario = window.idScenarioActif || 14;
 
        const response = await fetch(
            "https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/graphe/"
        );
 
        if (!response.ok) throw new Error("Erreur HTTP " + response.status);
 
        const data = await response.json();
        if (!data || data.length === 0) return;
 
        let heures = [], rE = [], rR = [], tE = [], tR = [];
 
        for (let i = 0; i < data.length; i++) {
            if (data[i].date) {
                heures.push(new Date(data[i].date).toLocaleTimeString());
                rE.push(parseFloat(data[i].Time_React_Extract1) || 0);
                rR.push(parseFloat(data[i].Time_React_Retract1) || 0);
                tE.push(parseFloat(data[i].Time_Travel_Extract1) || 0);
                tR.push(parseFloat(data[i].Time_Travel_Retract1) || 0);
            }
        }
 
        Graph(heures, rE, rR, tE, tR);
 
    } catch (error) {
        console.error("Erreur rafraîchissement API :", error);
    }
}
 
// ========================================
// POPUP ALERTES TEMPS RÉEL
// ========================================
 
let derniereAlerteId = null;
 
function determinerGravite(type) {
    if (!type) return "FAIBLE";
    if (type.toLowerCase().includes("critique")) return "CRITIQUE";
    else if (type.toLowerCase().includes("anomalie")) return "MOYENNE";
    else return "FAIBLE";
}
 
function afficherPopupAlerte(alerte) {
    const gravite = determinerGravite(alerte.type_alerte);
    const popup = document.createElement("div");
    popup.className = "popup-alerte";
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h3> ALERTE</h3>
            <p>Anomalie détectée sur le vérin</p>
            <p><strong>Gravité :</strong> ${gravite}</p>
            <p><strong>Vérin :</strong> ${alerte.idverin}</p>
        </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector(".popup-close").onclick = () => popup.remove();
    setTimeout(() => { if (popup.parentNode) popup.remove(); }, 5000);
}
 
async function verifierAlertesTempsReel() {
    try {
        const res = await fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/derniere-alerte");
        const data = await res.json();
        if (!data || !data.idalertes) return;
        afficherPopupAlerte(data);
    } catch (erreurmec) {
        console.error("Erreur alerte temps réel :", erreurmec);
    }
}
// ==========================================
// CONNEXION MQTT (Paho)
// ==========================================

function initMQTT() {
    const statutLabel = document.getElementById("statutMQTT");
    clientMqtt = new Paho.MQTT.Client(MQTT_HOST, MQTT_PORT, MQTT_CLIENT_ID);

    clientMqtt.onConnectionLost = () => {
        if (statutLabel) {
            statutLabel.style.background = "red";
            statutLabel.textContent = "❌ MQTT Déconnecté";
        }
        setTimeout(initMQTT, 5000);
    };

    clientMqtt.onMessageArrived = (message) => {
        try {
            const data = JSON.parse(message.payloadString);
            console.log("Message MQTT reçu :", data);

            const heure = new Date().toLocaleTimeString();

            // CAS 1 : le message contient directement les 4 champs de temps
            if (data.Time_React_Extract1 !== undefined || data.T_REACTION_1 !== undefined) {
                const valRE = parseFloat(data.Time_React_Extract1 || data.T_REACTION_1) || 0;
                const valRR = parseFloat(data.Time_React_Retract1 || data.T_REACTION_2) || 0;
                const valTE = parseFloat(data.Time_Travel_Extract1 || data.T_ALLER_1)   || 0;
                const valTR = parseFloat(data.Time_Travel_Retract1 || data.T_ALLER_2)   || 0;
                ajouterPointGraphe(heure, valRE, valRR, valTE, valTR);
            }
            // CAS 2 : pression_MIP reçue → rafraîchissement via API REST
            else if (data.pression_MIP == 1) {
                rafraichirDepuisAPI();
            }

        } catch (e) {
            console.error("Erreur parsing MQTT :", message.payloadString, e);
        }
    };

    clientMqtt.connect({
        onSuccess: () => {
            if (statutLabel) {
                statutLabel.style.background = "#27ae60";
                statutLabel.textContent = "✅ MQTT Connecté";
            }
            clientMqtt.subscribe(MQTT_TOPIC);
            clientMqtt.subscribe(MQTT_TOPIC2);
        },
        onFailure: (err) => {
            if (statutLabel) {
                statutLabel.style.background = "red";
                statutLabel.textContent = "❌ Échec connexion MQTT";
            }
            console.error("Échec connexion MQTT :", err.errorMessage);
            setTimeout(initMQTT, 5000);
        },
        useSSL: false
    });
}