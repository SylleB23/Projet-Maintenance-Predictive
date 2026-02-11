
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

// CA SERTAUTHENTIFICATION REST 
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
    const email = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;
    const pseudo = document.getElementById('pseudo').value;
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    if (!email || !mdp || !pseudo|| !nom|| !prenom) {
        alert("Veuillez remplir tous les champs");
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
            window.location.href = "connexion.php";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
        alert("Erreur serveur");
    });
}




//ca protege juste les pages
function VerifierConnexion() {
    if (!localStorage.getItem("user")) {
        window.location.href = "connexion.php";
    }
}


function Deconnexion() {
    localStorage.removeItem("user");
    window.location.href = "connexion.php";
}


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
        // Utiliser la fonction avec authentification
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