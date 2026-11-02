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
<main class="centerbodyAbout " id="about-editor">
    <div class="error" id="aboutApiError" role="alert"></div>
    <section class="about-row">
        <div class='top-left-about'>
            <div class='upper-half'>
                <div class="flex-container-changeHeader">
                    <h3>Header Image</h3>
                    <form id="header-img-about-form" enctype="multipart/form-data">
                        <label class="upload-img-about" for="header-img-about">
                            <span id="file-name-1" data-file-name>Upload Image</span>
                        </label>
                        <input id="header-img-about" type="file" name="header-img" accept=".jpg,.jpeg,.png,.gif" onchange="showFileName1(this)" required>
                        <div class="error" role="alert"></div>
                        <button class='aboutBtn' type="submit" name="updateImage-header">Update Images</button>
                        <button class='aboutBtn'type="button" onclick="clearFileInput1()">Clear</button>
                    </form>
                </div>
                <div class="doctor-img-about-patient">
                    <h3>Doctor Image</h3>
                    <form id="doctor-img-about-form" enctype="multipart/form-data">
                        <label class="upload-img-about"  id="file-name-2">
                            <span data-file-name>Upload Image</span>
                        </label>
                        <input id="doctor-img-about" type="file" name="doctor-img"  accept=".jpg,.jpeg,.png,.gif" onchange="showFileName2(this)" required>
                        <div class="error" role="alert"></div>
                        <button class='aboutBtn'type="submit" name="updateImage-doctor">Update Images</button>
                        <button class='aboutBtn'type="button" onclick="clearFileInput2()">Clear</button>
                    </form>
                </div>
            </div>
            <div class='lower-half'>
                <div class="addressAndCreds-container">
                    <form id='doctor-cred-form' data-about-field="credentials">
                        <textarea name="credentials" placeholder="Credentials" required></textarea>
                        <button type="submit" name="updateCreds">Update Credentials</button>
                        <div class="error" role="alert"></div>
                    </form>
                    <form  id='clinic-address-form' data-about-field="address">
                        <textarea name="address" placeholder="Address" required></textarea>
                        <button type="submit" name="updateAddress">Update Address</button>
                        <div class="error" role="alert"></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="doctor-content-doctor">
            <form class='doctor-content-form' data-about-field="doctorName">
                <input type="text" name="doctorName" placeholder="Doctor Name" required>
                <button class='aboutBtn'type="submit" name="updateName">Update Name</button>
                <div class="error" role="alert"></div>
            </form>    
            <form  class='doctor-content-form' data-about-field="mobile">
                <input type="text" name="mobile" placeholder="Mobile" required>
                <button class='aboutBtn'type="submit" name="mobileBtn">submit</button>
                <div class="error" role="alert"></div>
            </form>
             <form  class='doctor-content-form' data-about-field="telephone">
                <input type="text" name="telephone" placeholder="Telephone" required>
                <button class='aboutBtn'type="submit" name="telephoneBtn">submit</button>
                <div class="error" role="alert"></div>
            </form>
        </div>
    </section>
</main>

<script>
     function showFileName1(input) {
         const fileNameSpan = input.form.querySelector('[data-file-name]');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }
    function showFileName2(input) {
        const fileNameSpan = input.form.querySelector('[data-file-name]');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }
    function clearFileInput1() {
        const fileInput = document.getElementById("header-img-about");
        fileInput.value = '';
        document.querySelector("#header-img-about-form [data-file-name]").textContent = "Upload Image";
    }
    function clearFileInput2() {
        const fileInput = document.getElementById("doctor-img-about");
        fileInput.value = '';
        document.querySelector("#doctor-img-about-form [data-file-name]").textContent = "Upload Image";
    }
</script>
<script src="../js/api.js"></script>
<script src="../js/about-profile.js"></script>
