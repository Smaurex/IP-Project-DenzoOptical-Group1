<?php

    session_start(); 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

if(isset($_POST['send-announcement'])){
    $message = isset($_POST["message"]) ? $_POST["message"] : "";
        if (emptyInputText($message) !== false) {
            header("location:../doctor/DoctorPage.php?error=messageEmpty");
            exit();
        }
        
    
        $sql = "INSERT INTO announcement (message) VALUES (?)";

        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/DoctorPage.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $message);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
}
else {
    header("location:../doctor/DoctorPage.php?error=Form-Submission-Failed");
    exit();
}
header("location:../doctor/DoctorPage.php");
exit();