<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css"/>
    <script src="https://kit.fontawesome.com/ef8f49099c.js" crossorigin="anonymous"></script>
    

</head>
<body>
    <header>
        <div class="logo">
            <img src="../images/DenzoOptLogo.png" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        
        <nav class="link-container">
            <?php
                echo '<div><a class="link" href ="../index.php">Home</a></div>';
                if(isset($_SESSION["username"])){
                    echo'<div><a class="link" href ="../profile/profile.php">Profile</a></div>';
                    echo'<div><a class="link" href ="../includes/log_out.inc.php">Log out</a></div>';
                    if($_SESSION["role"] == "doctor"){
                        echo'<div><a class="link" href ="../doctor/DoctorPage.php">Doctor</a></div>';
                        echo'<div><a class="link" href ="../doctor/aboutDoc.php">About us</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us (Patient View)</a></div>';
                    }
                    else if($_SESSION["role"] == "assistant"){
                        echo'<div><a class="link" href ="../assistant/AssistantPage.php">Assistant</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                    }
                    else if($_SESSION["role"] == "patient"){
                        echo'<div><a class="link" href ="../patient/PatientPage.php">Patient</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                    }
                }
                else{
                    echo'<div><a class="link" href ="../register/sign_up.php">Sign Up</a></div>';
                    echo'<div><a class="link" href ="../register/log_in.php">Log In</a></div>';
                    echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                }
            ?>
        </nav>
        <?php echo'<div onclick=showSidebar() id="menuButton"><a class="link" href ="#"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></div>'; ?>
        
        <nav class="sidebar">
            <?php 
                echo'<div onclick=hideSidebar()><a href ="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></div>';
                echo '<div><a class="link" href ="../index.php">Home</a></div>';
                if(isset($_SESSION["username"])){
                    echo'<div><a class="link" href ="../profile/profile.php">Profile</a></div>';
                    echo'<div><a class="link" href ="../includes/log_out.inc.php">Log out</a></div>';
                    if($_SESSION["role"] == "doctor"){
                        echo'<div><a class="link" href ="../doctor/DoctorPage.php">Doctor</a></div>';
                        echo'<div><a class="link" href ="../doctor/aboutDoc.php">About us</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us (Patient View)</a></div>';
                    }
                    else if($_SESSION["role"] == "assistant"){
                        echo'<div><a class="link" href ="../assistant/AssistantPage.php">Assistant</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                    }
                    else if($_SESSION["role"] == "patient"){
                        echo'<div><a class="link" href ="../patient/PatientPage.php">Patient</a></div>';
                        echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                    }
                }
                else{
                    echo'<div><a class="link" href ="../register/sign_up.php">Sign Up</a></div>';
                    echo'<div><a class="link" href ="../register/log_in.php">Log In</a></div>';
                    echo'<div><a class="link" href ="../patient/aboutPat.php">About us</a></div>';
                    
                }
                
            ?>
        </nav>
        <script>
            //nav
                function showSidebar() {
                    document.querySelector('.sidebar').classList.add('active');
                }

                function hideSidebar() {
                    document.querySelector('.sidebar').classList.remove('active');
                }
        </script>
</header>
          