<?php
    include "../hf/headernav.php";
?>
<?php

	if(isset($_SESSION["userID"]) && $_SESSION["username"])
	{}
	else
	{
		header("Location: ../index.php");
	}
?>

    <main class="centerbody">
        <section class="row">
            <div class="flex-container-changeProf">
                <h3>Change Profile</h3>
                <form id="pfp-img-form" action="../includes/profile.inc.php" method="POST" enctype="multipart/form-data">
                    <label class="pfp-img" for="pfp-img">
                        <span id="file-name-pfp">Upload Image</span>
                    </label>
                    <input id="pfp-img" type="file" name="pfp-img" accept=".jpg,.jpeg,.png,.gif" onchange="showFileName(this)" required>
                    <button type="button" onclick="window.location.href='profile.php'"><i class="fas fa-arrow-left"></i> Back</button>
                    <button type="submit" name="updateImage-pfp">Update Images</button>
                    <button type="button" onclick="clearFileInput()">Clear</button>
                </form>
            </div>
        </section>
    </main>

<script>
    function showFileName(input) {
        const fileNameSpan = document.getElementById('file-name-pfp');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }

   function clearFileInput() {
        const fileInput = document.getElementById("pfp-img");
        const fileNameSpan = document.getElementById("file-name-pfp");
        fileInput.value = '';
        fileNameSpan.textContent = "Upload Image";
    }


</script>