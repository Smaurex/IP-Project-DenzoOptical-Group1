<?php

// Determine protocol
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";

// Get full URL
$host = $_SERVER['HTTP_HOST'];
$uri = $_SERVER['REQUEST_URI'];  
$url = "$protocol://$host$uri";

// Initialize connection variable
$conn = null;

// Check if the request is from the live server
if (strpos($url, "https://denzo.dcism.org") === 0) {
    $dbServer = "localhost";
    $dbUsername = "s22102454_denzo";
    $dbPassword = "Denz0DB2026."; 
    $dbName = "s22102454_denzo";
    
    // Create connection
    $conn = mysqli_connect($dbServer, $dbUsername, $dbPassword, $dbName);
}

// Check if the request is from the local environment
else if (strpos($url, "http://localhost/DenzoOptical") === 0) {
    $dbServer = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "denz";
    
    // Create connection
    $conn = mysqli_connect($dbServer, $dbUsername, $dbPassword, $dbName);
}

// If connection was attempted, check if it was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} 
