<?php
ob_start();
session_start();
if (!empty($_SESSION['firstname'])) {
    header("Location: /index.php");
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="login_styles.css">

</head>
<body>
<div id="button-back" class="btn btn__secondary"><p>Back</p></div>
<div id="register-box" class="login-box go-under">
    <h2>Register</h2>
    <form name="form-register" method="POST" style="justify-content: space-between">
        <div id="div-firstname" class="user-box">
            <input id="firstname-field" type="text" name="firstname-field" required>
            <label id="label-firstname">Firstname</label>
        </div>
        <div id="div-lastname" class="user-box">
            <input id="lastname-field" type="text" name="lastname-field" required>
            <label id="label-lastname">Lastname</label>
        </div>
        <div class="user-box">
            <input type="text" name="username-field" required>
            <label>Username</label>
        </div>
        <div class="user-box">
            <input type="password" name="password-field" required>
            <label>Password</label>
        </div>
        <a id="register-button" style="float: right" class="register-button" href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Register
        </a>
        <input id="button-submit-register-form" name="action" type="submit" style="display: none" value="register">
    </form>
</div>
<div id="separatingSheet" class="separating-sheet"></div>
<div id="login-box" class="login-box  go-down">
    <h2>Login</h2>
    <form name="form-login" method="post" style="justify-content: space-between">
        <div class="user-box">
            <input type="text" name="username-field" required>
            <label>Username</label>
        </div>
        <div class="user-box">
            <input type="password" name="password-field" required>
            <label>Password</label>
        </div>
        <a id="login-button" href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
        </a>
        <a id="signup-button" style="float: right" class="register-button" href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Signup
        </a>
        <input id="button-submit-login-form" name="action" type="submit" style="display: none" value="login">
    </form>
</div>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $usernameField = $_POST['username-field'] ?? "";
    $passwordField = $_POST['password-field'] ?? "";
    $firstnameField = $_POST['firstname-field'] ?? "";
    $lastnameField = $_POST['lastname-field'] ?? "";
    $action = $_POST['action'] ?? "";

    // LOGIN
    if ($action === "login") {
        $pdo = new PDO('mysql:dbname=tutorial;host=mysql', 'tutorial', 'secret', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $stmt = $pdo->prepare("SELECT username, password, users.id , first_name, last_name FROM accounts 
                                     INNER JOIN users
                                     ON accounts.id = users.id_account
                                    WHERE username = :usernameInserted");
        $stmt->bindParam(':usernameInserted', $usernameField);
        $testQuery = $stmt->execute();
        $fetchCheck = $stmt->fetch();

        if ($fetchCheck)
            if (password_verify($passwordField, $fetchCheck['password'])) {
                setSessionAndRedirect($usernameField, $fetchCheck['first_name'], $fetchCheck['last_name'], $fetchCheck['id']);
            } else {
                var_dump("Bad credentials");
            }
    }

    // REGISTER
    if ($action === "register") {
        $validData = $usernameField && $passwordField && $firstnameField && $lastnameField;
        if (!$validData) {
            header("Location: /", TRUE, 301);
        }
        $passwordField = hashPwd($passwordField);
        $pdo = new PDO('mysql:dbname=tutorial;host=mysql', 'tutorial', 'secret', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $stmt = $pdo->prepare("INSERT INTO accounts (username, password) VALUES (:username, :password)");
        $stmt->bindParam(':username', $usernameField);
        $stmt->bindParam(':password', $passwordField);
        try {
            $stmt->execute();
        }catch (\Exception $e){
            echo "Try another username!";
        }


        $id = $pdo->lastInsertId();

        if ($id !== false) {
            $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, id_account) VALUES (:firstname,:lastname, :id)");
            $stmt->bindParam(':firstname', $firstnameField);
            $stmt->bindParam(':lastname', $lastnameField);
            $stmt->bindParam(':id', $id);
            try {
                $stmt->execute();
            } catch (\Exception $e){

            }


        } else {
            var_dump("Try again please!");
        }
    }
}

function hashPwd($pwd)
{
    $options = [
        'cost' => 12,
    ];
    return password_hash($pwd, PASSWORD_BCRYPT, $options);
}

function setSessionAndRedirect($username, $firstname, $lastname, $id)
{
    $_SESSION['username'] = $username;
    $_SESSION['firstname'] = $firstname;
    $_SESSION['lastname'] = $lastname;
    $_SESSION['id'] = $id;
    header("Location: /index.php");
    exit();
}

?>
<script src="login.js"></script>
</body>
</html>
