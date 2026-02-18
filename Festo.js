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
            document.getElementById("section").innerHTML = this.responseText;
            recupererNombreDrone();
            recupererNombreUtilisateur();
            recupererNombreVol();
            
            if (document.getElementById("nb_drone"))
                document.getElementById("nb_drone").addEventListener("click", recupererDonneesCapteurs);

            if (document.getElementById("nb_vol"))
                document.getElementById("nb_vol").addEventListener("click", recupererDonneesVols);

            if (document.getElementById("nb_utilisateur"))
                document.getElementById("nb_utilisateur").addEventListener("click", recupererDonneesUtilisateurs);
        }
    };
    xhttp.open("GET", "suivi.html");
    xhttp.send();
}

/**
 * Récupérer les données des capteurs (version avec authentification)
 */
async function recupererDonneesCapteurs() {
    try {
        const reponseAPI = await fetchProtectedData('http://127.0.0.1/api/capteurs');
        
        if (!reponseAPI) return;
        
        let table = "<div><table class='tableau_statistique'>";
        table += "<tr class='centrer'><th>Numéro Vol</th><th>Date de Vol</th><th>Numéro Drone</th><th>Nom utilisateur</th><th>Graphe</th>";

        for (let i = 0; i < reponseAPI.length; i++) {
            let donneesCapteurs = reponseAPI[i];
            table += "<tr class='centrer'>";
            table += "<td>" + donneesCapteurs.idvol + "</td>";
            table += "<td>" + donneesCapteurs.dateVol + "</td>";
            table += "<td>" + donneesCapteurs.iddrone + "</td>";
            table += "<td>" + donneesCapteurs.idutilisateur + "</td>";
            table += '<td><button id="button-' + reponseAPI[i].idvol + '">Graphe </button></td>'
            table += "</tr>";
        }

        table += "</table></div>";
        
        document.getElementById("section").innerHTML = table;
        
        for (let i = 0; i < reponseAPI.length; i++) {
            document.getElementById("button-" + reponseAPI[i].idvol).addEventListener("click", function() {
                TraceGrapheFesto(reponseAPI[i].idvol)
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors de la récupération des données');
    }
}

function TraceGrapheFesto(idvol) {
    document.getElementById("section").innerHTML = '<canvas id="monGraphe"><canvas>';
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let reponseAPI = JSON.parse(this.responseText);
            console.log(reponseAPI);

            var x = [];
            var y = [];
            for (let i = 0; i < reponseAPI.length; i++) {
                x[i] = reponseAPI[i].idetat;
                y[i] = reponseAPI[i].h;
            }

            Graph(x, y);
        }
    };
    xhttp.open("GET", 'rest2.php/graphe/' + idvol + '/h');
    xhttp.send();
}

/**
 * Récupérer les données des utilisateurs (version avec authentification)
 */
async function recupererDonneesUtilisateurs() {
    try {
        const reponseAPI = await fetchProtectedData('http://127.0.0.1/api/utilisateurs');
        
        if (!reponseAPI) return;
        
        let table = "<div><table class='tableau_statistique'>";
        table += "<tr class='centrer'><th>ID Utilisateur</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Date de Naissance</th><th>Pseudo</th></tr>";

        for (let i = 0; i < reponseAPI.length; i++) {
            let utilisateur = reponseAPI[i];
            table += "<tr class='centrer'>";
            table += "<td>" + utilisateur.idutilisateur + "</td>";
            table += "<td>" + utilisateur.nom + "</td>";
            table += "<td>" + utilisateur.prenom + "</td>";
            table += "<td>" + utilisateur.email + "</td>";
            table += "<td>" + utilisateur.naissance + "</td>";
            table += "<td>" + utilisateur.pseudo + "</td>";
            table += "</tr>";
        }

        table += "</table></div>";
        document.getElementById("section").innerHTML = table;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        alert('Erreur lors de la récupération des utilisateurs');
    }
}

