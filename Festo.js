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

/**
 * Fonction d'inscription avec redirection vers page de succès
 */
function Inscription() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const pseudo = document.getElementById('pseudo').value;
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;
    const mdpConfirm = document.getElementById('mdpConfirm').value;
    
    const errorMessage = document.getElementById('errorMessage');
    
    if (!nom || !prenom || !pseudo || !email || !mdp) {
        if (errorMessage) {
            errorMessage.textContent = 'Veuillez remplir tous les champs';
            errorMessage.style.color = 'red';
        } else {
            alert("Veuillez remplir tous les champs");
        }
        return;
    }
    
    if (mdpConfirm && mdp !== mdpConfirm) {
        if (errorMessage) {
            errorMessage.textContent = 'Les mots de passe ne correspondent pas';
            errorMessage.style.color = 'red';
        } else {
            alert("Les mots de passe ne correspondent pas");
        }
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        if (errorMessage) {
            errorMessage.textContent = 'Veuillez entrer une adresse email valide';
            errorMessage.style.color = 'red';
        } else {
            alert("Veuillez entrer une adresse email valide");
        }
        return;
    }
    
    if (mdp.length < 8) {
        if (errorMessage) {
            errorMessage.textContent = 'Le mot de passe doit contenir au moins 8 caractères';
            errorMessage.style.color = 'red';
        } else {
            alert("Le mot de passe doit contenir au moins 8 caractères");
        }
        return;
    }
    
    // Vérification de la présence de majuscules
    if (!/[A-Z]/.test(mdp)) {
        if (errorMessage) {
            errorMessage.textContent = 'Le mot de passe doit contenir au moins une lettre majuscule';
            errorMessage.style.color = 'red';
        } else {
            alert("Le mot de passe doit contenir au moins une lettre majuscule");
        }
        return;
    }
    
    // Vérification de la présence de minuscules
    if (!/[a-z]/.test(mdp)) {
        if (errorMessage) {
            errorMessage.textContent = 'Le mot de passe doit contenir au moins une lettre minuscule';
            errorMessage.style.color = 'red';
        } else {
            alert("Le mot de passe doit contenir au moins une lettre minuscule");
        }
        return;
    }
    
    // Vérification de la présence de chiffres
    if (!/[0-9]/.test(mdp)) {
        if (errorMessage) {
            errorMessage.textContent = 'Le mot de passe doit contenir au moins un chiffre';
            errorMessage.style.color = 'red';
        } else {
            alert("Le mot de passe doit contenir au moins un chiffre");
        }
        return;
    }
    
    // Vérification de la présence de caractères spéciaux
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(mdp)) {
        if (errorMessage) {
            errorMessage.textContent = 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)';
            errorMessage.style.color = 'red';
        } else {
            alert("Le mot de passe doit contenir au moins un caractère spécial");
        }
        return;
    }

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
            if (errorMessage) {
                errorMessage.textContent = data.message || 'Erreur lors de l\'inscription';
                errorMessage.style.color = 'red';
            } else {
                alert(data.message);
            }
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
        if (errorMessage) {
            errorMessage.textContent = 'Erreur de connexion au serveur';
            errorMessage.style.color = 'red';
        } else {
            alert("Erreur serveur");
        }
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

fetch("http://127.0.0.1/Projet%20Maintenance%20Predictive/rest.php/graphe/" + idscenario)

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

    // 🔴 seuils (tu peux ajuster)
    let seuilReact = 40;
    let seuilTravel = 260;

    let anomalieDetectee = false;

    for (let i = 0; i < data.length; i++) {

        if (data[i].date) {

            heures.push(new Date(data[i].date).toLocaleTimeString());

            let valRE = Number(data[i].Time_React_Extract1);
            let valRR = Number(data[i].Time_React_Retract1);
            let valTE = Number(data[i].Time_Travel_Extract1);
            let valTR = Number(data[i].Time_Travel_Retract1);

            rE.push(valRE);
            rR.push(valRR);
            tE.push(valTE);
            tR.push(valTR);

            // 🚨 Détection anomalie
            if (valRE > seuilReact || valRR > seuilReact || valTE > seuilTravel || valTR > seuilTravel) {
                
                anomalieDetectee = true;

                console.warn("⚠️ Anomalie détectée à :", data[i].date);

            }
        }
    }


    if (anomalieDetectee) {
        document.body.style.backgroundColor = "#2b0000"; // fond rouge léger
    } else {
        document.body.style.backgroundColor = ""; // reset
    }

    Graph(heures, rE, rR, tE, tR);

})

.catch(error => {
    console.error("Erreur API :", error);
});

}
// function mettreAJourLeCompteur()
// {
//   const dateStage = Date.UTC(2021, 5, 24, 8, 0, 0);
//   const dateNow = Date.now();
//   //console.debug("Nombre de millisecondes stage : " + utcDateStage);
//   //console.debug("Nombre de millisecondes maintenant : " + utcDateNow);


//   var diff = dateStage - dateNow;
//   //console.debug("Nombre de millisecondes : " + diff);
//   var diffJours = Math.floor(diff / (1000*60*60*24));
//   //console.debug("Nombre de jours : " + diffJours);
//   var diffHeures = Math.floor( (diff - (diffJours * 24 * 60 * 60 * 1000)) / (1000 * 60 * 60) );
//   //console.debug("Nombre d'heures : " + diffHeures);
//   var diffMinutes = Math.floor((diff - (diffJours * 24 * 60 * 60 * 1000) - (diffHeures * 60 * 60 * 1000)) / (1000 * 60))
//   //console.debug("Nombre de minutes : " + diffMinutes);
//   var diffSecondes = Math.floor((diff - (diffJours * 24 * 60 * 60 * 1000) - (diffHeures * 60 * 60 * 1000) - (diffMinutes * 60 * 1000)) / (1000))
//   //console.debug("Nombre de secondes : " + diffSecondes);

//   document.getElementById("nb_jours").innerHTML = diffJours+"J";
//   document.getElementById("nb_heures").innerHTML = diffHeures+"H";
//   document.getElementById("nb_minutes").innerHTML = diffMinutes+"M";
//   document.getElementById("nb_secondes").innerHTML = diffSecondes+"S";

// }



// document.getElementById("nav_inscription").addEventListener('click', changerSection);
// document.getElementById("nav_connexion").addEventListener('click', changerSection);