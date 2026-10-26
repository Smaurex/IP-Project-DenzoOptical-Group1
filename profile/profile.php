<?php
    include "../hf/headernav.php";
?>
<?php

	if(isset($_SESSION["userID"]) && $_SESSION["username"])
	{
    }
	else
	{
		header("Location: ../index.php");
	}
?>



    <main class="centerbody">
        <section class="row">
            <div class="flex-form-profile" id="profile-page">
                <div id="profile-pic-container">
                    <img id="pfp_img" src="../profile_pics/default_pfp.jpg" alt="Profile picture">
                </div>
                <button type="button" onclick="window.location.href='change_profile_pic.php'">Change profile</button>
                <div style="display: flex;" data-profile="username"></div>
                <div style="display: flex;" data-profile="email"></div>
                <div style="display: flex; color: #38E54D;" data-profile="role"></div>
                <div class="error" id="profileApiError" role="alert"></div>
            </div>
        </section>
    </main>

<script src="../js/api.js"></script>
<script src="../js/about-profile.js"></script>
