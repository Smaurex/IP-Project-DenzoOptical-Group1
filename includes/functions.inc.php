<?php


function emptyInputSignup($fname, $lname, $email, $pass, $passConf){
    $result;
    if (empty($fname) || empty($lname) || empty($email) || empty($pass) || empty($passConf)) {
       $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}
function invalidUsername($fname, $lname){
    $result;
    if (!preg_match("/^[a-zA-Z0-9]+$/", $fname) && !preg_match("/^[a-zA-Z0-9]+$/", $lname)) {
       $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}
function invalidEmail($email){
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}
function passMatch($pass, $passConf){
    $result;
    if ($pass !== $passConf) {
       $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}
function getUserByEmail($conn, $email){
    $sql = "SELECT * FROM users WHERE email = ?;";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        die("SQL Error: " . mysqli_error($conn)); 
    }

    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_stmt_get_result($stmt);
    
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row; 
    } else {
        return false;
    }

    mysqli_stmt_close($stmt);
}


function createUser($conn, $fname, $lname, $email, $pass, $profile_pic_originalName, $profile_pic_id){
    $username = $fname." ".$lname;
    $role = "patient";
    $sql = "INSERT INTO users (username, email, password, role, profile_pic_originalName, profile_pic_id) VALUES (?, ?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location:../register/sign_up.php?error=stmtFailed");
        exit();
    }

    $hashPass = password_hash($pass, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "ssssss", $username, $email, $hashPass, $role, $profile_pic_originalName, $profile_pic_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("location: ../register/log_in.php");
    exit();
}

function emptyInputLogin($email, $pass){
    $result;
    if (empty($email) || empty($pass)) {
       $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}

function loginUser($conn, $email, $pass){
    $user = getUserByEmail($conn, $email);
    

    if ($user == false) {
        header("location: ../register/log_in.php?error=wronglogin");
        exit();
    }

    $hashPass = $user["password"];
    if (!password_verify($pass, $hashPass)) {
        header("location: ../register/log_in.php?error=wronglogin");
        exit();
    }


    session_start();
    $_SESSION["userID"] = $user["userID"];
    $_SESSION["username"] = $user["username"];
    $_SESSION["email"] = $user["email"];
    $_SESSION["role"] = $user["role"];
    $_SESSION["profile_pic"] = $user["profile_pic_id"];
    
  

  
    if ($_SESSION["role"] == "doctor") {
        header("location: ../doctor/DoctorPage.php");
    } elseif ($_SESSION["role"] == "assistant") {
        header("location: ../assistant/AssistantPage.php");
    } else {
        header("location: ../patient/PatientPage.php");
    }

    exit();

}


//Images

function invalidImageType($image) {
    $allowedTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/x-png', 'image/gif'];
    $allowedExts = ['jpg', 'jpeg', 'png', 'gif'];

    $mime = $image['type'];
    $ext = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));

    echo "<script>console.log('Image MIME: " . $mime . "');</script>";

    if (!in_array($mime, $allowedTypes) || !in_array($ext, $allowedExts)) {
        return true; // invalid image
    }

    return false; // valid image
}


function insertImageToDatabase($conn, $headerImg_OriginalName, $headerImgName_id, $doctorImg_OriginalName, $doctorImgName_id, $doctorName, $contact, $address, $credentials){
    
    $sql = "INSERT INTO about (headerImg_OriginalName, headerImgName_id, doctorImg_OriginalName, doctorImgName_id, doctorName, contact, address, credentials) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location:../register/sign_up.php?error=stmtFailed");
        exit();
    }

    
    mysqli_stmt_bind_param($stmt, "ssssssss", $headerImg_OriginalName, $headerImgName_id, $doctorImg_OriginalName, $doctorImgName_id, $doctorName, $contact, $address, $credentials);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("location: ../doctor/aboutDoc.php");
    exit();
}

function getAboutData($conn, $aboutID) {
    $sql = "SELECT * FROM about WHERE aboutID = ?;";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        die("SQL Error: " . mysqli_error($conn)); 
    }

    mysqli_stmt_bind_param($stmt, "i", $aboutID);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) { 
        return [
            'headerImg_OriginalName' =>$row['headerImg_OriginalName'],
            'headerImgName_id' => $row['headerImgName_id'],
            'doctorImg_OriginalName' => $row['doctorImg_OriginalName'],
            'doctorImgName_id' => $row['doctorImgName_id'],
            'doctorName' => $row['doctorName'],
            'mobile' => $row['mobile'],
            'telephone' => $row['telephone'],
            'address' => $row['address'],
            'credentials' => $row['credentials']
        ];
    }

    return null; // No result found

    mysqli_stmt_close($stmt);
}


function emptyInputImage(){

}

function emptyInputText($text){
        $result;
        if (empty($text)) {
           $result = true;
        }
        else{
            $result = false;
        }
        return $result;
    
}

// delete profile pic button = change/update the pfp originalName and id into default.jpg
//in about page images, when delete button is clicked change