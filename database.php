<?php

$dbServer = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "denz";
$conn = "";

try{
    $conn = mysqli_connect($dbServer, $dbUsername, $dbPassword, $dbName);
}
catch(mysqli_sql_exception){
    echo "Could not conect!";
}
   