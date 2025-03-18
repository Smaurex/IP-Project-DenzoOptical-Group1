<?php
$dbServer = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "denz";
$conn = "";

// create connection
$conn = mysqli_connect($dbServer, $dbUsername, $dbPassword, $dbName);

// check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
  }
} else {
  echo "0 results";
}

mysqli_close($conn);
?>