<?php

    session_start(); 
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    

if (isset($_POST['insert-item']) && isset($_FILES['item-img-2'])) {
        $quantity = isset($_POST["quantity"]) ? $_POST["quantity"] : "";
        if (emptyInputText($quantity) !== false && !isset($_POST["quantity"])) {
            $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=emptyQuantity' : '../doctor/DoctorPage.php?error=emptyQuantity';
            header("location: $redirectPage");
            exit();
        }
        $itemImg = $_FILES['item-img-2'];

        $item_pic_originalName = basename($itemImg['name']);

        $loweredExt = strtolower(pathinfo($itemImg['name'], PATHINFO_EXTENSION));
        $item_pic_id = uniqid("pfp_", true) . "." . $loweredExt;
        
        // Move uploaded files to the server
        $itemImgTarget = "../item_pics/" . $item_pic_id;
       
        if(invalidImageType($itemImg) !== false){
            $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=invalidImageType' : '../doctor/DoctorPage.php?error=invalidImageType';
            header("location: $redirectPage");
            exit();
        }

        move_uploaded_file($itemImg['tmp_name'], $itemImgTarget);

         $sql = "INSERT INTO item (quantity, item_OriginalName, item_pic_id) VALUES (?, ?, ?)";
       
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=stmtFailed' : '../doctor/DoctorPage.php?error=stmtFailed';
            header("location: $redirectPage");
            exit();
        }

        mysqli_stmt_bind_param($stmt, "sss", $quantity, $item_pic_originalName, $item_pic_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

    }
else if(isset($_POST['update-item']) && isset($_POST['itemID'])){
        $itemID = $_POST['itemID'];
        $itemImg = $_FILES['item-edit-img'];

        $item_pic_originalName = basename($itemImg['name']);

        $loweredExt = strtolower(pathinfo($itemImg['name'], PATHINFO_EXTENSION));
        $item_pic_id = uniqid("pfp_", true) . "." . $loweredExt;
        
        // Move uploaded files to the server
        $itemImgTarget = "../item_pics/" . $item_pic_id;
       
        if(invalidImageType($itemImg) !== false){
            $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=invalidImageType' : '../doctor/DoctorPage.php?error=invalidImageType';
            header("location: $redirectPage");
            exit();
        }

        move_uploaded_file($itemImg['tmp_name'], $itemImgTarget);

        $sql = "UPDATE item SET item_OriginalName = ?, item_pic_id = ? WHERE itemID = ?";
     
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
            $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=stmtFailed' : '../doctor/DoctorPage.php?error=stmtFailed';
            header("location: $redirectPage");
            exit();
        }

        mysqli_stmt_bind_param($stmt, "sss", $item_pic_originalName, $item_pic_id, $itemID);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

}
else if(isset($_POST['updateQty-item']) && isset($_POST['itemID'])){
    $newQty= isset($_POST['quantity']) ? $_POST['quantity']: "";
    $itemID = $_POST['itemID'];

    if (emptyInputText($newQty) !== false && !isset($_POST['quantity'])) {
        $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=emptyQuantity' : '../doctor/DoctorPage.php?error=emptyQuantity';
        header("location: $redirectPage");
        exit();
    }

    $sql = "UPDATE item SET quantity = ? WHERE itemID = ?";

    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=stmtFailed' : '../doctor/DoctorPage.php?error=stmtFailed';
        header("location: $redirectPage");
        exit();
    }
    
    mysqli_stmt_bind_param($stmt, "ss", $newQty, $itemID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}     
else if (isset($_POST['deleteForm'])) {
    $itemID = $_POST['itemID'];
    if(!isset($_POST['itemID'])){
        $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=invalidItemID' : '../doctor/DoctorPage.php?error=invalidItemID';
        header("location: $redirectPage");
        exit();
    }

    $sql = "DELETE FROM item WHERE itemID = ?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php?error=stmtFailed' : '../doctor/DoctorPage.php?error=stmtFailed';
        header("location: $redirectPage");
        exit();

    }
    
    mysqli_stmt_bind_param($stmt, "s", $itemID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    
    $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php' : '../doctor/DoctorPage.php';
    header("location: $redirectPage");
    exit();

}  
else{
    echo "Empty table";
}
    $redirectPage = ($_SESSION['role'] === 'assistant') ? '../assistant/AssistantPage.php' : '../doctor/DoctorPage.php';
    header("location: $redirectPage");
    exit();
