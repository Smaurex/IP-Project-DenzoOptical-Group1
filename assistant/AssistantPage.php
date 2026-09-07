<?php
    include "../hf/headernav.php";
    require_once '../includes/dbh.inc.php';
    require_once '../includes/functions.inc.php';
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
            <div class='item-container'>
                <?php
                    $sql = 'SELECT * FROM item';
                    $result = mysqli_query($conn, $sql);

                    if ($result && mysqli_num_rows($result) > 0) {
                        $items = mysqli_fetch_all($result, MYSQLI_ASSOC); // Get all rows as associative array

                        foreach ($items as $item) {
                            $itemID = $item['itemID'];
                            $itemQty = $item['quantity'];
                            $itemImg = $item['item_pic_id'];

                            echo "  
                                        <div class='item-edit-form-container'>
                                            <div class='item-pfp-btn-container'>
                                                <div class='item-pfp-container'>
                                                    <img class='item-img-pfp' src='../item_pics/$itemImg'>
                                                </div>
                                                <div class='item-changePfp-btn-container'>
                                                    <button class='item-changePfp-btn icon-button' type='button' onclick=\"window.location.href='../doctor/change_item_pic.php?itemID=$itemID'\"><i class='fa-solid fa-image'></i></button>
                                                </div>
                                            </div>
                                            <div class='item-quantity-container'>
                                                <div>Item ID: $itemID</div>
                                                <form action='../includes/item.inc.php' method='POST'>
                                                    <div>Quantity: </div>
                                                    <input id='item-quantity-1' type='number' name='quantity' value='$itemQty' required>
                                                    <input type='hidden' name='itemID' value='$itemID'>
                                                    <button type='submit' name='updateQty-item'>Change</button>
                                                </form>
                                            </div>
                                            <div class='delete-btn-container'>
                                                <form action='../includes/item.inc.php' method='POST'>
                                                    <input type='hidden' name='itemID' value='$itemID'>
                                                    <button class='icon-button'type='submit' name='deleteForm'><i class='fa-regular fa-trash-can'></i></button>
                                                </form>
                                            </div>
                                        
                                    </div>
                                ";

                        }
                    } else {
                        echo '<p>No items found.</p>';
                    }
                ?>
            </div>
            
        </div>
        <div class='admin-panel-container-assistant'>
            <form class='item-img-form-assistant' action='../includes/item.inc.php' method='POST' enctype='multipart/form-data'>
                    <h3> Add Item </h3>
                    <label class='item-img-2' for='item-img-assistant'>
                        <span id='file-name-item-assistant'>Upload Image</span>
                    </label>
                    <input id='item-img-assistant' type='file' name='item-img-2' accept='.jpg,.jpeg,.png,.gif' onchange='showFileNameAssistant(this)' required>
                    <input id='item-quantity-assistant' type='number' name='quantity' placeholder='Quantity'required>
                    <div>
                        <button type='submit' name='insert-item'>Add item</button>
                        <button type='button' onclick='clearFileInputAssistant()'>Clear</button>
                    </div>    
            </form>
            <div class="flex-container-announcement"> 
                <div style="display: flex; width: 100%; height: 9%; border: 1px solid green; justify-content: center; align-items: center;">Announcement</div>
                <div id="displayAnnouncements">
                    <?php
                        $sql = "SELECT * FROM announcement";
                        $result = mysqli_query($conn, $sql);

                        if ($result && mysqli_num_rows($result) > 0) {
                            $announcments = mysqli_fetch_all($result, MYSQLI_ASSOC); // Get all rows as associative array

                            foreach ($announcments as $announcment) {
                                $announcementID = $announcment['announcementID'];
                                $message = nl2br(htmlspecialchars($announcment['message']));

                                echo "
                                    <div class='message-card' id='$announcementID'>
                                        <p>$message</p>
                                    </div>
                                ";
                            }
                        } else {
                            echo "<p>No items found.</p>";
                        }
                    ?>
                </div>
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