<?php

    session_start(); 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

if (isset($_POST['updateImage-pfp']) && isset($_FILES['pfp-img'])) {
        $pfpImg = $_FILES['pfp-img'];

        $profile_pic_originalName = basename($pfpImg['name']);

        $loweredExt = strtolower(pathinfo($pfpImg['name'], PATHINFO_EXTENSION));
        $profile_pic_id = uniqid("pfp_", true) . "." . $loweredExt;
        
        // Move uploaded files to the server
        $pfpImgTarget = "../profile_pics/" . $profile_pic_id;
       
        if(invalidImageType($pfpImg) !== false){
            header('location: ../profile/change_profile_pic.php?error=invalidImageType');
            exit();
        }

        move_uploaded_file($pfpImg['tmp_name'], $pfpImgTarget);
       
        $sql = "UPDATE users SET profile_pic_originalName = ?, profile_pic_id = ? WHERE email = ?";
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../profile/change_profile_pic.php?error=stmtFailed");
            exit();
        }
        $email = $_SESSION['email'];
        mysqli_stmt_bind_param($stmt, "sss", $profile_pic_originalName, $profile_pic_id, $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $_SESSION["profile_pic"] = $profile_pic_id;
    }
    header("location: ../profile/change_profile_pic.php");
    exit();