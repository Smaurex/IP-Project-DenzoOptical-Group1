<?php
session_start();
include("database.php");

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];
$pass1 = $_POST["pass1"];
$hash = password_hash($pass1, PASSWORD_DEFAULT);

$username = $fname." ".$lname;

$sql = "INSERT INTO  users (username, email, password1) VALUES ('$username', '$email', '$hash');";
 
try{
    mysqli_query($conn, $sql);
}
catch(mysqli_sql_exception){
    echo "Could not register!";
}

mysqli_close($conn);
