<?php
header("Content-Type: application/json");

try {
    // Connexion à la BD
    $pdo = new PDO(
        "mysql:host=172.18.201.103;dbname=festo;charset=utf8",
        "sylleman",
        "festo",
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
$cheminURL = $_SERVER['PATH_INFO'] ?? '/'; // ?? permet d'acceder au serveur.Sans ca le msg "impossible d'accéder au serveur" s'afficheet évite Undefined index: PATH_INFO -> garantit que $cheminURL a toujours une valeur
$cheminURL_tableau = explode('/', trim($cheminURL, '/')); // trim: ajoute au debut ou efface des caracteres a la fin

// =======================
// GESTION DU GET
// =======================
if ($req_type === 'POST') { 

    // =======================
    // Connexion
    // =======================
    if (isset($cheminURL_tableau[0]) && $cheminURL_tableau[0] === "connexion") {//ligne tres impotante sinon le chemin get connexion ne fonctionne pas 

        // Lecture du JSON envoyé par Festo.js
        $json = file_get_contents('php://input');
        $donneesRecues = json_decode($json, true);

        // Récupération des données en les lisant et en verifiant si elles sont bien presentes
        $email = $donneesRecues['email'] ?? '';  
        // ca permet d'eviter qu'il n'y ait pas de valeur et de champs inexistants
        $mdp = $donneesRecues['mdp'] ?? '';

        if (!empty($email) && !empty($mdp)) {

            // va dans la bd et recherche email
            //  on NE met PAS le mdp ici car il est hashé
            $requete = $pdo->prepare(
                "SELECT * FROM utilisateur WHERE email = ?"
            );
            $requete->execute([$email]);
            $user = $requete->fetch(PDO::FETCH_ASSOC);

            // verification du mot de passe hashé
            if ($user && password_verify($mdp, $user['mdp'])) {

                // Réponse attendue par Festo.js
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

        // Lecture du JSON envoyé par Festo.js
        $json = file_get_contents('php://input');
        $donneesRecues = json_decode($json, true);

        // Récupération des données en les lisant et en verifiant si elles sont bien presentes dans la BD
        $email = $donneesRecues['email'] ?? '';

        if (!empty($email)) {

            // va dans la bd et recherche l'utilisateur via son email
            $requete = $pdo->prepare(
                "SELECT nom, prenom, email, pseudo FROM utilisateur WHERE email = ?"
            );
            $requete->execute([$email]);

            $user = $requete->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // Réponse attendue par Festo.js
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
// GESTION DU POST
// =======================
if ($req_type === 'POST') {

    if ($cheminURL_tableau[0] === "inscription") {

        // Lecture du JSON envoyé par Festo.js
        $donneesRecues = json_decode(file_get_contents('php://input'), true);

        $nom    = $donneesRecues['nom'] ?? '';
        $prenom = $donneesRecues['prenom'] ?? '';
        $email  = $donneesRecues['email'] ?? '';
        $pseudo = $donneesRecues['pseudo'] ?? '';

        // Hash du mot de passe
        $mdp = !empty($donneesRecues['mdp'])
            ? password_hash($donneesRecues['mdp'], PASSWORD_DEFAULT)
            : '';

        if (!empty($email) && !empty($mdp)) {

            // insertion dans la base de données
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
// ROUTE INCONNUE
// =======================
http_response_code(404);
echo json_encode(["erreur" => "La route est inconnue"]);
exit;
