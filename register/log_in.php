<?php
    include "../hf/headernav.php";
?>
<title>Login Page</title>
<main class="centerbody" style="background-image: url('../images/glasses3.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center;">
    <section class="login-row">
        <div class="flex-container-login">
            <form class="flex-form-login" id="formLogin" method="post">
            <h3> Log in! </h3>    
            <div class="input-control">
                    <label for="emailLogin"><b>Email</b></label>
                    <input id="emailLogin" name="emailLogin" type="text">
                    <div class="error"></div>
                </div>

                <div class="input-control">
                    <label for="passLogin"><b>Password</b></label>
                    <input id="passLogin" name="passLogin" type="password">
                    <div class="error"></div>
                </div>
                <div class="btn-container">
                    <button class="btn" type="submit" name="submitBtn">Submit</button>
                    <button class='icon-button-admin' id="clear" type='button' onclick='clearFileInput()'><i class="fa-solid fa-eraser"></i></button>
                </div>  
                 <?php 
                    if(isset($_GET["error"])){
                        if($_GET["error"] == "emptyinput"){
                            echo "<span class='error'> Fill in all fields!</span>";
                        }
                        if($_GET["error"] == "wronglogin"){
                            echo "<span class='error'> Incorrect login information! </span>";
                        }
                    }
                ?>
            </form>
        </div> 
    </section>
</main>

<script>
    function clearFileInput() {
    const emailLogin = document.getElementById("emailLogin");
    const passLogin = document.getElementById("passLogin");
    
    emailLogin.value = '';
    passLogin.value = '';
  
    }
</script>
<script src="../js/api.js"></script>
<script src="../login.js"></script>
