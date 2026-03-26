<?php
header("Content-Type: application/json");

// 🔥 AJOUT (évite bugs fetch)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Connexion à la BD
    $pdo = new PDO(
        "mysql:host=172.18.201.103;dbname=festo;charset=utf8","sylleman","festo",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $erreurmec) {
    http_response_code(500);
    echo json_encode(["erreur" => "Connexion base de données échouée"]);
    exit;
}

$req_type = $_SERVER['REQUEST_METHOD'];

// 🔥 CORRECTION ICI (TRÈS IMPORTANT)
$cheminURL = $_SERVER['PATH_INFO'] 
    ?? ($_GET['route'] ?? '/'); 

$cheminURL_tableau = explode('/', trim($cheminURL, '/')); // trim: ajoute au debut ou efface des caracteres a la fin


  // =======================
    // Connexion
    // =======================

if ($req_type === 'POST') { 

    if (isset($cheminURL_tableau[0]) && $cheminURL_tableau[0] === "connexion") {//ligne tres impotante sinon le chemin get connexion ne fonctionne pas 

        // Lecture du JSON envoyé par Festo.js
        $json = file_get_contents('php://input');
        $donneesRecues = json_decode($json, true);

        // Récupération des données en les lisant et en verifiant si elles sont bien presentes
        $email = $donneesRecues['email'] ?? '';  
        $mdp = $donneesRecues['mdp'] ?? '';

        if (!empty($email) && !empty($mdp)) {

            $requete = $pdo->prepare(
                "SELECT * FROM utilisateur WHERE email = ?"
            );
            $requete->execute([$email]);
            $user = $requete->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($mdp, $user['mdp'])) {

                echo json_encode([
                    "status" => "success",
                    "user"   => $user['nom']
                ]);

            } else {
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Email ou mot de passe incorrect"
                ]);
            }

        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Veuillez remplir tous les champs"
            ]);
        }
        exit;
    }
}


    // =======================
    // Récupérer un utilisateur
    // =======================
    if ($cheminURL_tableau[0] === "utilisateur") {

        $json = file_get_contents('php://input');
        $donneesRecues = json_decode($json, true);

        $email = $donneesRecues['email'] ?? '';

        if (!empty($email)) {

            $requete = $pdo->prepare(
                "SELECT nom, prenom, email, pseudo FROM utilisateur WHERE email = ?"
            );
            $requete->execute([$email]);

            $user = $requete->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode([
                    "status" => "success",
                    "utilisateur" => $user
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Utilisateur introuvable"
                ]);
            }

        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Email manquant"
            ]);
        }
        exit;
    }


// =======================
// Inscription
// =======================
if ($req_type === 'POST') {

    if ($cheminURL_tableau[0] === "inscription") {

        $donneesRecues = json_decode(file_get_contents('php://input'), true);

        $nom    = $donneesRecues['nom'] ?? '';
        $prenom = $donneesRecues['prenom'] ?? '';
        $email  = $donneesRecues['email'] ?? '';
        $pseudo = $donneesRecues['pseudo'] ?? '';

        $mdp = !empty($donneesRecues['mdp'])
            ? password_hash($donneesRecues['mdp'], PASSWORD_DEFAULT)
            : '';

        if (!empty($email) && !empty($mdp)) {

            $requete = $pdo->prepare(
                "INSERT INTO utilisateur (nom, prenom, email, mdp, pseudo)
                 VALUES (:nom, :prenom, :email, :mdp, :pseudo)"
            );

            $requete->execute([
                ':nom'    => $nom,
                ':prenom' => $prenom,
                ':email'  => $email,
                ':mdp'    => $mdp,
                ':pseudo' => $pseudo
            ]);

            echo json_encode([
                "status"  => "success",
                "message" => "Compte créé"
            ]);

        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Veuillez remplir tous les champs"
            ]);
        }
        exit;
    }
}


// =======================
// RECUPERER LES DONNEES
// =======================

if ($req_type === 'GET') {

    if ($cheminURL_tableau[0] === "donnees") {

        $requete = $pdo->prepare(
            "SELECT iddonnees,idscenario,
            Time_React_Extract1,
            Time_React_Retract1,
            Time_Travel_Extract1,
            Time_Travel_Retract1
            FROM donnees"
        );

        $requete->execute();

        $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($resultat);
        exit;
    }
}

// =======================
// ALERTES
// =======================

if ($req_type === 'GET') {

    if ($cheminURL_tableau[0] === "alertes") {

        $requete = $pdo->prepare(
            "SELECT 
                alerte.idalertes,
                alerte.idscenario,
                alerte.idverin,
                alerte.type_alerte,
                scenario.date
             FROM alertes alerte
             JOIN scenario scenario
             ON alerte.idscenario = scenario.idscenario
             ORDER BY scenario.date DESC"
        );

        $requete->execute();

        $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($resultat);

        exit;
    }

}
// =======================
// GRAPHE
// =======================

if ($req_type === 'GET') {

    if ($cheminURL_tableau[0] === "graphe") {

        $idscenario = $cheminURL_tableau[1] ?? null;

        if (!$idscenario) {
            http_response_code(400);
            echo json_encode(["erreur" => "ID scenario manquant"]);
            exit;
        }

        $requete = $pdo->prepare(
            "SELECT 
                d.date,
                d.Time_React_Extract1,
                d.Time_React_Retract1,
                d.Time_Travel_Extract1,
                d.Time_Travel_Retract1
            FROM donnees d
            WHERE d.idscenario = ?
            ORDER BY d.date ASC
            LIMIT 50
        "
        );

        $requete->execute([$idscenario]);

        $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($resultat);
        exit;
    }
}
// =======================
// DERNIERE ALERTE (temps réel)
// =======================

if ($req_type === 'GET') {

    if ($cheminURL_tableau[0] === "derniere-alerte") {

        $requete = $pdo->prepare(
            "SELECT 
                alerte.idalertes,
                alerte.idscenario,
                alerte.idverin,
                alerte.type_alerte,
                scenario.date
             FROM alertes alerte
             JOIN scenario scenario
             ON alerte.idscenario = scenario.idscenario
             ORDER BY scenario.date DESC
             LIMIT 1"
        );

        $requete->execute();

        $resultat = $requete->fetch(PDO::FETCH_ASSOC);

        echo json_encode($resultat);

        exit;
    }
}
// =======================
// AJOUTER ALERTE (OBLIGATOIRE)
// =======================

if ($req_type === 'POST') {

    if ($cheminURL_tableau[0] === "ajouter-alerte") {

        $data = json_decode(file_get_contents("php://input"), true);

        $idscenario = $data['idscenario'] ?? null;
        $idverin = $data['idverin'] ?? 1;
        $type = $data['type_alerte'] ?? "anomalie";

        if ($idscenario) {

            $requete = $pdo->prepare(
                "INSERT INTO alertes (idscenario, idverin, type_alerte)
                 VALUES (?, ?, ?)"
            );

            $requete->execute([$idscenario, $idverin, $type]);

            echo json_encode(["status" => "ok"]);
        } else {
            http_response_code(400);
            echo json_encode(["erreur" => "idscenario manquant"]);
        }

        exit;
    }
}

// =======================
// ROUTE INCONNUE
// =======================
http_response_code(404);
echo json_encode(["erreur" => "La route est inconnue"]);
exit;