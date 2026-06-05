<?php
header("Content-Type: application/json");

try {
    $pdo = new PDO(
        "mysql:host=172.18.201.103;dbname=festo;charset=utf8",
        "sylleman",
        "festo",
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => "Connexion base de données échouée"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '/';
$segments = explode('/', trim($path, '/'));

// ===========================
// POST /connexion
// ===========================
if ($method === 'POST' && isset($segments[0]) && $segments[0] === 'connexion') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $mdp   = $data['mdp'] ?? '';

    if (empty($email) || empty($mdp)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Veuillez remplir tous les champs"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($mdp, $user['mdp'])) {
        echo json_encode(["status" => "success", "user" => $user['nom']]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Email ou mot de passe incorrect"]);
    }
    exit;
}

// ===========================
// POST /inscription
// ===========================
if ($method === 'POST' && isset($segments[0]) && $segments[0] === 'inscription') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nom    = $data['nom'] ?? '';
    $prenom = $data['prenom'] ?? '';
    $pseudo = $data['pseudo'] ?? '';
    $email  = $data['email'] ?? '';
    $mdp    = $data['mdp'] ?? '';

    if (empty($nom) || empty($prenom) || empty($pseudo) || empty($email) || empty($mdp)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Tous les champs sont requis"]);
        exit;
    }

    $check = $pdo->prepare("SELECT idutilisateur FROM utilisateur WHERE email = ?");
    $check->execute([$email]);
    if ($check->fetch()) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Email déjà utilisé"]);
        exit;
    }

    $hash = password_hash($mdp, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO utilisateur (nom, prenom, email, mdp, pseudo) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$nom, $prenom, $email, $hash, $pseudo]);

    echo json_encode(["status" => "success", "user" => $nom]);
    exit;
}

// ===========================
// GET /donnees
// ===========================
if ($method === 'GET' && isset($segments[0]) && $segments[0] === 'donnees') {
    $stmt = $pdo->prepare("
        SELECT iddonnees, idscenario,
               Time_React_Extract1, Time_React_Retract1,
               Time_Travel_Extract1, Time_Travel_Retract1,date
        FROM donnees
    ");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// ===========================
// GET /alertes
// ===========================
if ($method === 'GET' && isset($segments[0]) && $segments[0] === 'alertes') {
    $stmt = $pdo->prepare("
        SELECT 
            a.idalertes,
            a.idscenario,
            a.idverin,
            a.type_alerte,
            a.date
        FROM alertes a
        LEFT JOIN scenario s ON a.idscenario = s.idscenario
        ORDER BY s.date DESC
    ");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    exit;
}

// ===========================
// GET /utilisateur (optionnel, pour Postman)
// ===========================
if ($method === 'GET' && isset($segments[0]) && $segments[0] === 'utilisateur') {
    $email = $_GET['email'] ?? '';
    if (empty($email)) {
        http_response_code(400);
        echo json_encode(["erreur" => "Email manquant"]);
        exit;
    }
    $stmt = $pdo->prepare("SELECT nom, prenom, email, pseudo FROM utilisateur WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(["status" => "success", "utilisateur" => $user]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Utilisateur introuvable"]);
    }
    exit;
}

// ===========================
// Route inconnue
// ===========================
http_response_code(404);
echo json_encode(["erreur" => "Route inconnue"]);
exit;