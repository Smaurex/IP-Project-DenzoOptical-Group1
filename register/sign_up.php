<?php
    include "../hf/headernav.php";
?>
<title>Sign up Page</title>
<main class="centerbody">
    <section class="signup-row">
            <div class="flex-container" style="background-image: linear-gradient(to bottom left,  #AC1754,  #E53888);">
                <div id="img_signup">
                    <img src="../images/optical_2.png" style="width: 100%; height: 100%;object-fit: cover; opacity: 0.5;">
                    <p style="display: flex; position: absolute; bottom: 0; right: 10px; font-size: 70px; color: white;">"Love your eyes!"</p>
                </div>
            </div>
            <div class="flex-container">
                <form class="flex-form" id="formSignup" method="post">
                    <h3> Sign up! </h3>
                    <div class="input-control">
                        <label for="fname"><b>First Name</b></label>
                        <input id="fname" name="fname" type="text">
                        <div class="error"></div>
                    </div>
                    
                    <div class="input-control">
                        <label for="lname"><b>Last Name</b></label>
                        <input id="lname" name="lname" type="text">
                        <div class="error"></div>
                    </div>

                    <div class="input-control">
                        <label for="email"><b>Email</b></label>
                        <input id="email" name="email" type="text">
                        <div class="error"></div>
                    </div>

                    <div class="input-control">
                        <label for="pass"><b>Password</b></label>
                        <input id="pass" name="pass" type="password">
                        <div class="error"></div>
                    </div>

                    <div class="input-control">
                        <label for="passConf"><b>Confirm Password</b></label>
                        <input id="passConf" name="passConf" type="password">
                        <div class="error"></div>
                    </div>
                    <div class="btn-container">
                        <button class="btn" style="margin-bottom: 5px;" type="submit" name="submitBtn">Submit</button>
                        <button class='icon-button-admin' id="clear" type='button' onclick='clearFileInput()'><i class="fa-solid fa-eraser"></i></button>
                    </div> 
                    <?php 
                        if(isset($_GET["error"])){
                            if($_GET["error"] == "emptyinput"){
                                echo "<div class='error'> Fill in all fields!</div>";
                            }
                            if($_GET["error"] == "invalidUsername"){
                                echo "<div class='error'> Choose a proper   username! </div>";
                            }
                            if($_GET["error"] == "invalidEmail"){
                                echo "<div class='error'> Choose a  proper email! </div>";
                            }
                            if($_GET["error"] == "unmatchedPassword"){
                                echo "<div class='error'> Password  doesn't match! </div>";
                            }
                            if($_GET["error"] == "stmtFailed"){
                                echo "<div class='error'> Something went wrong,  try again!</div>";
                            }
                            if($_GET["error"] == "emailTaken"){
                                echo "<div class='error'> Account already taken! </div>";
                            }
                            if($_GET["error"] == "none"){
                                echo "<div class='error'> You have signed up! </div>";
                            }
                        }
                    ?> 
                </form>
            </div>
    </section>
</main>

<script>
    function clearFileInput() {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const email = document.getElementById("email");
    const pass = document.getElementById("pass");
    const passConf = document.getElementById("passConf");
    
    fname.value = '';
    lname.value = '';
    email.value = '';
    pass.value = '';
    passConf.value = '';
  
    }
</script>
<script src="../js/api.js"></script>
<script src="../signup.js"></script>
