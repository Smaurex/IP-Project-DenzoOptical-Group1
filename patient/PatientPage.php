<?php
    include "../hf/headernav.php";
?>
<?php
	
	if(isset($_SESSION["role"]) && $_SESSION["role"]=="patient")
	{}
	else
	{
		header("Location: ../index.php");
	}
?>



<main class="centerbody">
        <section class="row-patient">
            <div class="flex-container-announcement" > 
                <div style="display: flex; width: 100%; height: 9%; border: 1px solid green; justify-content: center; align-items: center;">Announcement</div>
                <div id="displayAnnouncements"></div>
                <div class="error" id="announcementApiError" role="alert"></div>
            </div>
            <div class="error" id="itemApiError" role="alert"></div>
            <div class="flex-container-patient" style="width: 65vw;" data-item-view="patient" data-image-base="../item_pics/">
            </div>
        </section>
    </main>

<script src="../js/api.js"></script>
<script src="../js/items-announcements.js"></script>
<?php
    include "../hf/footer.php";
?>