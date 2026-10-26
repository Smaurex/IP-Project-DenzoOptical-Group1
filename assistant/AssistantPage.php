<?php
    include "../hf/headernav.php";
?>
<?php
	if(isset($_SESSION["role"]) && $_SESSION["role"]=="assistant")
	{}
	else
	{
		header("Location: ../index.php");
	}
?>

<title>Assistant</title>
<main class='centerbody'>
    <section class='row'>
        <div class='item-list-container'>
            <div class='item-list-title'>Item List:</div>
            <div class="error" id="itemApiError" role="alert"></div>
            <div class='item-container' data-item-view="admin" data-image-base="../item_pics/"></div>
            
        </div>
        <div class='admin-panel-container-assistant'>
            <form class='item-img-form-assistant' data-item-create enctype='multipart/form-data'>
                    <h3> Add Item </h3>
                    <label class='item-img-2' for='item-img-assistant'>
                        <span id='file-name-item-assistant' data-file-name>Upload Image</span>
                    </label>
                    <input id='item-img-assistant' type='file' name='item-img-2' accept='.jpg,.jpeg,.png,.gif' onchange='showFileNameAssistant(this)' required>
                    <input id='item-quantity-assistant' type='number' name='quantity' placeholder='Quantity' min='0' step='1' required>
                    <div class="error" id="itemCreateError" role="alert"></div>
                    <div>
                        <button type='submit' name='insert-item'>Add item</button>
                        <button type='button' onclick='clearFileInputAssistant()'>Clear</button>
                    </div>    
            </form>
            <div class="flex-container-announcement"> 
                <div style="display: flex; width: 100%; height: 9%; border: 1px solid green; justify-content: center; align-items: center;">Announcement</div>
                <div id="displayAnnouncements"></div>
                <div class="error" id="announcementApiError" role="alert"></div>
            </div>
        </div>
    </section>
</main>
<script>
 

    //form 2
    function showFileNameAssistant(input) {
        const fileNameSpan = document.getElementById('file-name-item-assistant');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }


    function clearFileInputAssistant() {
    const fileInput = document.getElementById("item-img-assistant");
    const quantityInput = document.getElementById("item-quantity-assistant");
    const fileNameSpan = document.getElementById("file-name-item-assistant");

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