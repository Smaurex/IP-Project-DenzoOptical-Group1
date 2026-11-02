<?php
    include '../hf/headernav.php';
?>
<?php
	if(isset($_SESSION['role']) && $_SESSION['role']=='doctor')
	{}
	else
	{
		header('Location: ../index.php');
	}
?>

<title>Doctor</title>
<main class='centerbody'>
    <section class='row'>
        <div class='item-list-container'>
            <div class='item-list-title'>Item List:</div>
            <div class="error" id="itemApiError" role="alert"></div>
            <div class='item-container' data-item-view="admin" data-image-base="../item_pics/"></div>
        </div>
        <div class='admin-panel-container'>
                <div class='admin-form-container'>
                    <form class='item-img-form-doctor' data-item-create enctype='multipart/form-data'>
                            <h3> Add Item </h3>
                            <label class='item-img-2' for='item-img-doctor'>
                                <span id='file-name-item-doctor' data-file-name>Upload Image</span>
                                <input id='item-img-doctor' type='file' name='item-img-2' accept='.jpg,.jpeg,.png,.gif' onchange='showFileName(this)' required>
                            </label>
                            <input id='item-quantity-doctor' type='number' name='quantity' placeholder='Quantity' min='0' step='1' required>
                            <div class="error" id="itemCreateError" role="alert"></div>
                            <div>
                                <button class='icon-button-admin'type='submit' name='insert-item'><i class="fa-solid fa-paper-plane"></i></button>
                                <button class='icon-button-admin' type='button' onclick='clearFileInput()'><i class="fa-solid fa-eraser"></i></button>
                            </div>
                    </form>
                </div>
                <div  class='admin-announcement-container'>
                    <form class='announcement-form' data-announcement-create>
                        <textarea id='msgTextArea'name='message' placeholder='Message'></textarea>
                        <div style='display: flex; justify-content: space-between; height: 10%; width: 98%;'>
                            <button class='icon-button-admin'type='submit' name='send-announcement'><i class="fa-solid fa-paper-plane"></i></button>
                            <span class="error" id="announcementApiError" role="alert"></span>
                        </div>
                    </form>
                    <div id="displayAnnouncements"></div>
                </div>
        </div>
    </section>
</main>
<script>
 

    //form 2
    function showFileName(input) {
        const fileNameSpan = document.getElementById('file-name-item-doctor');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }


    function clearFileInput() {
    const fileInput = document.getElementById("item-img-doctor");
    const quantityInput = document.getElementById("item-quantity-doctor");
    const fileNameSpan = document.getElementById("file-name-item-doctor");

    // Clear the file input
    fileInput.value = '';
    
    // Reset quantity
    quantityInput.value = '';

    // Force change event to ensure the UI updates
    fileNameSpan.textContent = "Upload Image";
}

    
</script>
<script src="../js/api.js"></script>
<script src="../js/items-announcements.js"></script>
<?php
    include '../hf/footer.php';
?>
