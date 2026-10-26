<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <script src="https://kit.fontawesome.com/ef8f49099c.js" crossorigin="anonymous"></script>
    

</head>
<body>
    <header>
        <div class="logo">
            <img src="images/DenzoOptLogo.png" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        
        <nav class="link-container">
            <?php
                echo '<div><a class="link" href ="index.php">Home</a></div>';
                if(isset($_SESSION["username"])){
                    echo'<div><a class="link" href ="profile/profile.php">Profile</a></div>';
                    echo'<div><a class="link" href ="includes/log_out.inc.php">Log out</a></div>';
                    if($_SESSION["role"] == "doctor"){
                        echo'<div><a class="link" href ="doctor/DoctorPage.php">Doctor</a></div>';
                        echo'<div><a class="link" href ="doctor/aboutDoc.php">About us</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us (Patient View)</a></div>';
                    }
                    else if($_SESSION["role"] == "assistant"){
                        echo'<div><a class="link" href ="assistant/AssistantPage.php">Assistant</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                    }
                    else if($_SESSION["role"] == "patient"){
                        echo'<div><a class="link" href ="patient/PatientPage.php">Patient</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                    }
                }
                else{
                    echo'<div><a class="link" href ="register/sign_up.php">Sign Up</a></div>';
                    echo'<div><a class="link" href ="register/log_in.php">Log In</a></div>';
                    echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                }
            ?>
        </nav>
        <?php echo'<div onclick=showSidebar() id="menuButton"><a class="link" href ="#"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></div>'; ?>
        
        <nav class="sidebar">
            <?php 
                echo'<div onclick=hideSidebar()><a href ="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></div>';
                echo '<div><a class="link" href ="index.php">Home</a></div>';
                if(isset($_SESSION["username"])){
                    echo'<div><a class="link" href ="profile/profile.php">Profile</a></div>';
                    echo'<div><a class="link" href ="includes/log_out.inc.php">Log out</a></div>';
                    if($_SESSION["role"] == "doctor"){
                        echo'<div><a class="link" href ="doctor/DoctorPage.php">Doctor</a></div>';
                        echo'<div><a class="link" href ="doctor/aboutDoc.php">About us</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us (Patient View)</a></div>';
                    }
                    else if($_SESSION["role"] == "assistant"){
                        echo'<div><a class="link" href ="assistant/AssistantPage.php">Assistant</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                    }
                    else if($_SESSION["role"] == "patient"){
                        echo'<div><a class="link" href ="patient/PatientPage.php">Patient</a></div>';
                        echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                    }
                }
                else{
                    echo'<div><a class="link" href ="register/sign_up.php">Sign Up</a></div>';
                    echo'<div><a class="link" href ="register/log_in.php">Log In</a></div>';
                    echo'<div><a class="link" href ="patient/aboutPat.php">About us</a></div>';
                    
                }
                
            ?>
        </nav>
        </header>

    <main class="centerbody">
        <section class="row-patient">    
            <div class="error" id="itemApiError" role="alert"></div>
            <div class="flex-container-patient" style="width: 66vw;" data-item-view="public" data-image-base="item_pics/">
            </div>
        </section>
    </main>

       
         <footer>
                <p class="footer-title">We would like to hear from you!</p>
                <div class="footer-content">
                    <div class="footer-section">
                    <p class="section-title">Contact</p>
                    <p class="section-detail">0917-770-2025</p>
                    </div> 
                    <div class="footer-section">
                    <p class="section-title">Address</p>
                    <p class="section-detail">Pink Me Up JKRM store, Central Nautical Highway, Yati, Liloan, Cebu</p>
                    </div>
                    <div class="footer-section social-icons">
                    <a href="https://www.facebook.com/profile.php?id=100064047673782" target="_blank" aria-label="Facebook">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maurismattio@gmail.com&su=Inquire%20Here&body=Hello%20there!" target="_blank" aria-label="Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    </div>
                </div>
            </footer>
    </div>

<script>
    //nav
        function showSidebar() {
            document.querySelector('.sidebar').classList.add('active');
        }

        function hideSidebar() {
            document.querySelector('.sidebar').classList.remove('active');
        }
</script>
<script src="js/api.js"></script>
<script src="js/items-announcements.js"></script>
</body>
</html>
