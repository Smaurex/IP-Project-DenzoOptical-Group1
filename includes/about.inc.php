<?php

    session_start(); 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    function isTableEmpty($conn) {
        $result = mysqli_query($conn, "SELECT COUNT(*) as total FROM about");
        $row = mysqli_fetch_assoc($result);
        if ($row['total'] == 0) {
            return true;
        } else {
            return false;
        }
    }
    
    // 1. Update or Insert Doctor Name
    if (isset($_POST['updateName'])) {
        $doctorName = isset($_POST["doctor-name"]) ? $_POST["doctor-name"] : "";
        if (emptyInputText($doctor_name) !== false) {
            header("location:../doctor/aboutDoc.php?error=emptyinput_doctorName");
            exit();
        }
        
    
        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (doctorName) VALUES (?)";
        } else {
            $sql = "UPDATE about SET doctorName = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $doctorName);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    
    // 2. Update or Insert Contact
    elseif (isset($_POST['mobileBtn'])) {
        
        $contact = isset($_POST["mobile"]) ? $_POST["mobile"] : "";
        if (emptyInputText($contact) !== false) {
            header("location:../doctor/aboutDoc.php?error=emptyinput_contact");
            exit();
        }
        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (mobile) VALUES (?)";
        } else {
            $sql = "UPDATE about SET mobile = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $contact);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    elseif (isset($_POST['telephoneBtn'])) {
        
        $contact = isset($_POST["telephone"]) ? $_POST["telephone"] : "";
        if (emptyInputText($contact) !== false) {
            header("location:../doctor/aboutDoc.php?error=emptyinput_contact");
            exit();
        }
        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (telephone) VALUES (?)";
        } else {
            $sql = "UPDATE about SET telephone = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $contact);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    // 3. Update or Insert Address & Credentials
    elseif (isset($_POST['updateAddress'])) {
        
        $address = isset($_POST["address"]) ? $_POST["address"] : "";
        if (emptyInputText($address) !== false) {
            header("location:../doctor/aboutDoc.php?error=emptyinput_address");
            exit();
        }
        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (address) VALUES (?)";
        } else {
            $sql = "UPDATE about SET address = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $address);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    elseif (isset($_POST['updateCreds'])) {
        
        $credentials = isset($_POST["credentials"]) ? $_POST["credentials"] : "";
        if (emptyInputText($credentials) !== false) {
            header("location:../doctor/aboutDoc.php?error=emptyinput_credentials");
            exit();
        }
        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (credentials) VALUES (?)";
        } else {
            $sql = "UPDATE about SET credentials = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "s", $credentials);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    // Handle image uploads
    elseif (isset($_POST['updateImage-header']) && isset($_FILES['header-img'])) {
        $headerImg = $_FILES['header-img'];

        $headerImg_OriginalName = basename($headerImg['name']);
       
        $headerImgName_id = uniqid("header_", true) . "." . pathinfo($headerImg['name'], PATHINFO_EXTENSION);
        
        // Move uploaded files to the server
        $headerImgTarget = "../uploads/" . $headerImgName_id;
       
        if(invalidImageType($headerImg) !== false){
            header('location: ../doctor/aboutDoc.php?error=invalidImageType');
            exit();
        }

        move_uploaded_file($headerImg['tmp_name'], $headerImgTarget);
       

        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (headerImg_OriginalName, headerImgName_id) VALUES (?, ?)";
        } else {
            $sql = "UPDATE about SET headerImg_OriginalName = ?, headerImgName_id = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }
    
        mysqli_stmt_bind_param($stmt, "ss", $headerImg_OriginalName, $headerImgName_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    elseif (isset($_POST['updateImage-doctor'])&& isset($_FILES['doctor-img'])) {
     
        $doctorImg = $_FILES['doctor-img'];
        
        $doctorImg_OriginalName = basename($doctorImg['name']);

        $doctorImgName_id = uniqid("doctor_", true) . "." . pathinfo($doctorImg['name'], PATHINFO_EXTENSION);

        
        // Move uploaded files to the server
        $doctorImgTarget = "../uploads/" . $doctorImgName_id;

        if(invalidImageType($doctorImg) !== false){
            header('location: ../doctor/aboutDoc.php?error=invalidImageType');
            exit();
        }
       
        move_uploaded_file($doctorImg['tmp_name'], $doctorImgTarget);

        if (isTableEmpty($conn)) {
            $sql = "INSERT INTO about (doctorImg_OriginalName, doctorImgName_id) VALUES (?, ?)";
        } else {
            $sql = "UPDATE about SET doctorImg_OriginalName = ?, doctorImgName_id = ? WHERE aboutID = 1";
        }
    
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("location:../doctor/aboutDoc.php?error=stmtFailed");
            exit();
        }

        mysqli_stmt_bind_param($stmt, "ss", $doctorImg_OriginalName, $doctorImgName_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    else {
        header("location:../doctor/aboutDoc.php?error=Form-Submission-Failed");
        exit();
    }
    header("location:../doctor/aboutDoc.php");
    exit();