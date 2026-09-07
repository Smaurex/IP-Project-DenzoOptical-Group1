<?php
    include "../hf/headernav.php";
?>
<?php
	if(isset($_SESSION["role"]) && $_SESSION["role"]=="doctor")
	{}
	else
	{
		header("Location: ../index.php");
	}
?>

<title>About us</title>
<main class="centerbodyAbout ">
    <section class="about-row">
        <div class='top-left-about'>
            <div class='upper-half'>
                <div class="flex-container-changeHeader">
                    <h3>Header Image</h3>
                    <form id="header-img-about-form" action="../includes/about.inc.php" method="POST" enctype="multipart/form-data">
                        <label class="upload-img-about" for="header-img-about">
                            <span id="file-name-1">Upload Image</span>
                        </label>
                        <input id="header-img-about" type="file" name="header-img-about" accept=".jpg,.jpeg,.png,.gif" onchange="showFileName1(this)" required>
                        <button class='aboutBtn' type="submit" name="updateImage-header">Update Images</button>
                        <button class='aboutBtn'type="button" onclick="clearFileInput1()">Clear</button>
                    </form>
                </div>
                <div class="doctor-img-about-patient">
                    <h3>Doctor Image</h3>
                    <form id="doctor-img-about-form" action="../includes/about.inc.php" method="POST" enctype="multipart/form-data">
                        <label class="upload-img-about"  id="file-name-2">
                            <span id="file-name-2">Upload Image</span>
                        </label>
                        <input id="doctor-img-about" type="file" name="doctor-img-about"  accept=".jpg,.jpeg,.png,.gif" onchange="showFileName2(this)" required>
                        <button class='aboutBtn'type="submit" name="updateImage-doctor">Update Images</button>
                        <button class='aboutBtn'type="button" onclick="clearFileInput2()">Clear</button>
                    </form>
                </div>
            </div>
            <div class='lower-half'>
                <div class="addressAndCreds-container">
                    <form id='doctor-cred-form'action="../includes/about.inc.php" method="POST">
                        <textarea name="credentials" placeholder="Credentials" required></textarea>
                        <button type="submit" name="updateCreds">Update Credentials</button>
                    </form>
                    <form  id='clinic-address-form' action="../includes/about.inc.php" method="POST">
                        <textarea name="address" placeholder="Address" required></textarea>
                        <button type="submit" name="updateAddress">Update Address</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="doctor-content-doctor">
            <form class='doctor-content-form'action="../includes/about.inc.php" method="POST">
                <input type="text" name="doctor-name" placeholder="Doctor Name" required>
                <button class='aboutBtn'type="submit" name="updateName">Update Name</button>
            </form>    
            <form  class='doctor-content-form' action="../includes/about.inc.php" method="POST">
                <input type="text" name="mobile" placeholder="Mobile" required>
                <button class='aboutBtn'type="submit" name="mobileBtn">submit</button>
            </form>
             <form  class='doctor-content-form' action="../includes/about.inc.php" method="POST">
                <input type="text" name="telephone" placeholder="Telephone" required>
                <button class='aboutBtn'type="submit" name="telephoneBtn">submit</button>
            </form>
        </div>
    </section>
</main>

<script>
     function showFileName1(input) {
        const fileNameSpan = document.getElementById('file-name-1');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }
    function showFileName2(input) {
        const fileNameSpan = document.getElementById('file-name-2');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }
    function clearFileInput1() {
        const fileInput = document.getElementById("header-img-about");
        fileInput.value = '';
        document.getElementById("file-name-1").textContent = "Upload Image";
    }
    function clearFileInput2() {
        const fileInput = document.getElementById("doctor-img-about");
        fileInput.value = '';
        document.getElementById("file-name-2").textContent = "Upload Image";
    }
</script>
