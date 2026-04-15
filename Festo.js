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

// CA SERT AUTHENTIFICATION REST 
/**
 * Fonction appelée lors de la connexion
 * Envoie email + mot de passe au serveur
 */
function Seconnecter() {
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;

    if (!email || !mdp) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    
    fetch("rest.php/connexion", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            mdp: mdp
        })
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

    //  RESET À CHAQUE CLIC
    if (errorMessage) {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
    }

    //  FONCTION POUR ÉVITER DE RÉPÉTER
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

    // SI TOUT EST OK
    fetch("rest.php/inscription", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            mdp: mdp,
            pseudo: pseudo,
            nom: nom,
            prenom: prenom
        })
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

/**
 * Fonction de compte à rebours et redirection pour la page de succès
 */
function initTransition() {
    const TransitionElement = document.getElementById('transition');
    
    if (TransitionElement) {
        let secondes = 5;//initialisation compteur
        
        const interval = setInterval(() => {//"Exécute cette fonction toutes les X millisecondes"
            secondes--;//on decremente en seconde(on enleve 1s)
            TransitionElement.textContent = secondes;
            
            if (secondes <= 0) {
                clearInterval(interval);//On arrête le compteur.
                window.location.href = 'PageWebFesto.php';
            }
        }, 1000);//Donc la fonction s’exécute toutes les secondes.
    }
}


// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initTransition();
});


// ========================================
// FONCTIONS EXISTANTES
// ========================================

function suiviAjax() {

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {

if (this.readyState == 4 && this.status == 200) {

document.getElementById("tableauDonnees").innerHTML = table;

recupererNombreDrone();
recupererNombralertes();

if (document.getElementById("nb_drone"))

document.getElementById("nb_drone")
.addEventListener("click", recupererDonneesCapteurs);

if (document.getElementById("nbalertes"))

document.getElementById("nbalertes")
.addEventListener("click", recupererDonneesAlertes);

}

};

xhttp.open("GET","suivi.html");

xhttp.send();

}


/* =============================== */
/* RECUPERATION DONNEES CAPTEURS */
/* =============================== */

async function recupererDonneesCapteurs(){

try{

const reponse = await fetch("rest.php/donnees");

const reponseAPI = await reponse.json();

let table = "<table class='tableau_statistique'>";

table += "<tr>";
table += "<th>ID</th>";
table += "<th>Scenario</th>";
table += "<th>React Extract</th>";
table += "<th>React Retract</th>";
table += "<th>Travel Extract</th>";
table += "<th>Travel Retract</th>";
table += "<th>Graphe</th>";
table += "</tr>";

for(let i=0;i<reponseAPI.length;i++){

let d = reponseAPI[i];

table += "<tr>";

table += "<td>"+d.iddonnees+"</td>";
table += "<td>"+d.idscenario+"</td>";
table += "<td>"+d.Time_React_Extract1+"</td>";
table += "<td>"+d.Time_React_Retract1+"</td>";
table += "<td>"+d.Time_Travel_Extract1+"</td>";
table += "<td>"+d.Time_Travel_Retract1+"</td>";

table += "<td><button onclick='TraceGrapheFesto("+d.idscenario+")'>Graphe</button></td>";

table += "</tr>";

}

table += "</table>";

document.getElementById("tableauDonnees").innerHTML = table;

}

catch(error){

console.error("Erreur récupération données :",error);

}

}


/* =============================== */
/* ALERTES */
/* =============================== */


async function recupererDonneesAlertes(){

    try{

        const reponse = await fetch("rest.php/alertes");

        const reponseAPI = await reponse.json();

        let table = "<table class='tableau_statistique'>";

        table += "<tr>";
        table += "<th>ID</th>";
        table += "<th>Scenario</th>";
        table += "<th>Verin</th>";
        table += "<th>Type Alerte</th>";
        table += "<th>Date</th>";
        table += "</tr>";

        for(let i=0;i<reponseAPI.length;i++){

            let alerte = reponseAPI[i];

            table += "<tr>";

            table += "<td>"+alerte.idalertes+"</td>";
            table += "<td>"+alerte.idscenario+"</td>";
            table += "<td>"+alerte.idverin+"</td>";
            table += "<td>"+alerte.type_alerte+"</td>";
            table += "<td>"+alerte.date+"</td>";

            table += "</tr>";
        }

        table += "</table>";

        document.getElementById("section").innerHTML = table;

    }

    catch(error){

        console.error("Erreur alertes :",error);

    }

}



/* =============================== */
/* GRAPHE */
/* =============================== */

let monGraph = null;

function Graph(x, rE, rR, tE, tR){

const ctx = document.getElementById("monGraphe").getContext("2d");

if(!monGraph){

    monGraph = new Chart(ctx,{
        type:"line",
        data:{
            labels:x,
            datasets:[
                {
                    label:"React Extract",
                    data:rE,
                    borderColor:"#ffffff",
                    fill:false
                },
                {
                    label:"React Retract",
                    data:rR,
                    borderColor:"#3b82f6",
                    fill:false
                },
                {
                    label:"Travel Extract",
                    data:tE,
                    borderColor:"#06b6d4",
                    fill:false
                },
                {
                    label:"Travel Retract",
                    data:tR,
                    borderColor:"#60a5fa",
                    fill:false
                }
            ]
        },
        options:{
            responsive:true,
            animation:false,
            scales:{
                x:{
                    title:{
                        display:true,
                        text:"Heure"
                    }
                },
                y:{
                    title:{
                        display:true,
                        text:"Temps (ms)"
                    }
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

function TraceGrapheFesto(idscenario) {

fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/graphe/" + idscenario)

.then(response => {
    if (!response.ok) {
        throw new Error("Erreur HTTP");
    }
    return response.json();
})

.then(data => {

    if (!data || data.length === 0) {
        console.warn("Aucune donnée reçue");
        return;
    }

let heures = [];
    let rE = [];
        let rR = [];
            let tE = [];
                let tR = [];

    // ===============================
    //  SEUILS (à adapter si besoin)
    // ===============================
    let seuilReact = 10;
        let seuilTravel = 200;
let anomalieDetectee = false;
    //  évite spam GLOBAL
    if (typeof window.alerteEnvoyeeGlobal === "undefined") {
        window.alerteEnvoyeeGlobal = false;
    }

for (let i = 0; i < data.length; i++) {

    if (data[i].date) {

            // ===============================
            //  EXTRACTION DES DONNÉES
            // ===============================
heures.push(new Date(data[i].date).toLocaleTimeString());

let valRE = parseFloat(data[i].Time_React_Extract1) || 0;
    let valRR = parseFloat(data[i].Time_React_Retract1) || 0;
        let valTE = parseFloat(data[i].Time_Travel_Extract1) || 0;
            let valTR = parseFloat(data[i].Time_Travel_Retract1) || 0;

            console.log("VALEURS :", valRE, valRR, valTE, valTR);

            rE.push(valRE);
            rR.push(valRR);
            tE.push(valTE);
            tR.push(valTR);

            // ===============================
            //  DÉTECTION ANOMALIE
            // ===============================
    if (
        valRE > seuilReact ||valRR > seuilReact ||valTE > seuilTravel ||valTR > seuilTravel) {

                anomalieDetectee = true;

                // ENVOI UNE SEULE FOIS PAR CYCLE
                if (!window.alerteEnvoyeeGlobal) {

                    window.alerteEnvoyeeGlobal = true;

                    console.warn(" ANOMALIE DÉTECTÉE !");
                    console.log({
                        React_Extract: valRE,
                        React_Retract: valRR,
                        Travel_Extract: valTE,
                        Travel_Retract: valTR,
                        date: data[i].date
                    });

                    fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/ajouter-alerte", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            idscenario: idscenario,
                            idverin: 1,
                            type_alerte: "anomalie"
                        })
                    })
                    .then(res => res.json())
                    .then(res => console.log("Alerte envoyée :", res))
                    .catch(err => console.error("Erreur envoi alerte :", err));
                }
            }
        }
    }

    // ===============================
    //  RESET SI Y'A PLUS D’ANOMALIE
    // ===============================
if (!anomalieDetectee) {
    window.alerteEnvoyeeGlobal = false;
    }

    // ===============================
    // FEEDBACK VISUEL EN CAS D'ANOMALIE
    // ===============================
    document.body.style.backgroundColor = anomalieDetectee ? "#2b0000" : "";

    // ===============================
    //  GRAPHE
    // ===============================
    Graph(heures, rE, rR, tE, tR);

})

.catch(error => {
    console.error("Erreur API :", error);
});
}
/* =============================== */
/* POPUP ALERTES TEMPS REEL */
/* =============================== */

let derniereAlerteId = null;

// Fonction pour déterminer la gravité
function determinerGravite(type) {

    if (!type) return "FAIBLE";

    if (type.toLowerCase().includes("critique")) {
        return "CRITIQUE";
    } 
    else if (type.toLowerCase().includes("anomalie")) {
        return "MOYENNE";
    } 
    else {
        return "FAIBLE";
    }
}

// Création du popup
function afficherPopupAlerte(alerte) {

    const gravite = determinerGravite(alerte.type_alerte);

    const popup = document.createElement("div");
    popup.className = "popup-alerte";

    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h3>ALERTE</h3>
            <p>Anomalie détectée</p>
            <p><strong>Gravité :</strong> ${gravite}</p>
            <p><strong>Vérin :</strong> ${alerte.idverin}</p>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".popup-close").onclick = () => popup.remove();

    setTimeout(() => {
        popup.remove();
    }, 5000);
}

// Vérification temps réel
async function verifierAlertesTempsReel() {

    try {

        const res = await fetch("https://172.18.201.103/Projet%20Maintenance%20Predictive/rest.php/derniere-alerte");
        const data = await res.json();

        console.log("API ALERTES :", data);

        if (!data || !data.idalertes) return;

        //  SUPPRESSION DU BLOCAGE localStorage
        console.warn(" POPUP AFFICHÉ");

        afficherPopupAlerte(data);

    } catch (erreurmec) {
        console.error("Erreur alerte temps réel :", erreurmec);
    }
}