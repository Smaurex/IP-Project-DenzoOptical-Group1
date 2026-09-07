<?php
    include "../hf/headernav.php";
?>
<?php

	if(isset($_SESSION["userID"]) && $_SESSION["username"])
	{
        $username = $_SESSION["username"];
        $email = $_SESSION["email"];
        $role = $_SESSION["role"];
        $profile_pic = $_SESSION["profile_pic"];
    }
	else
	{
		header("Location: ../index.php");
	}
?>



    <main class="centerbody">
        <section class="row">
            <div class="flex-form-profile">
                <div id="profile-pic-container">
                    <img id="pfp_img"src="../profile_pics/<?php echo $_SESSION["profile_pic"];?>">
                </div>
                <button type="button" onclick="window.location.href='change_profile_pic.php'">Change profile</button>
                <div style="display: flex;"><?php echo $username?></div>
                <div style="display: flex;"><?php echo $email?></div>
                <div style="display: flex; color: #38E54D;"><?php echo $role?></div>
            </div>
        </section>
    </main>

