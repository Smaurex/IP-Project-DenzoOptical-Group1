<?php

if(isset($_POST['submitBtn'])){
    session_start();
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (!$conn) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    //TERNARY operator, if values are set, assign value to variable, else assign empty string.
    $fname = isset($_POST["fname"]) ? $_POST["fname"] : "";
    $lname = isset($_POST["lname"]) ? $_POST["lname"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $pass = isset($_POST["pass"]) ? $_POST["pass"] : "";
    $passConf = isset($_POST["passConf"]) ? $_POST["passConf"] : "";
    $profile_pic_originalName = "default_pfp.jpg";
    $profile_pic_id= "default_pfp.jpg";
    //check if values are empty
    if (emptyInputSignup($fname, $lname, $email, $pass, $passConf) !== false) {
        header("location:../register/sign_up.php?error=emptyinput");
        exit();
    }

    if (invalidUsername($fname, $lname) !== false) {
        header("location:../register/sign_up.php?error=invalidUsername");
        exit();
    }
    if (invalidEmail($email) !== false) {
        header("location:../register/sign_up.php?error=invalidEmail");
        exit();
    }
    if (passMatch($pass, $passConf) !== false) {
        header("location:../register/sign_up.php?error=unmatchedPassword");
        exit();
    }
    if (getUserByEmail($conn, $email) !== false) {
        header("location:../register/sign_up.php?error=emailTaken");
        exit();
    }

    createUser($conn, $fname, $lname, $email, $pass, $profile_pic_originalName, $profile_pic_id);

  
}
else{
    echo "<p>fail</p>";
    //header("location:../index.php");
    exit();
}
