<?php
if(isset($_POST["submitBtn"])) {
    session_start(); 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    $email = $_POST["emailLogin"];
    $pass = $_POST["passLogin"];


    if (emptyInputLogin($email, $pass)) {
        header("location: ../register/log_in.php?error=emptyinput");
        exit();
    }


    loginUser($conn, $email, $pass);
} else {
    header("location: ../register/log_in.php");
    exit();
}
?>
