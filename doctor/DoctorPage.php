<?php
    include '../hf/headernav.php';
    require_once '../includes/dbh.inc.php';
    require_once '../includes/functions.inc.php';
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
                                                    <button class='item-changePfp-btn icon-button' type='button' onclick=\"window.location.href='change_item_pic.php?itemID=$itemID'\"><i class='fa-solid fa-image'></i></button>
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
        <div class='admin-panel-container'>
                <div class='admin-form-container'>
                    <form class='item-img-form-doctor' action='../includes/item.inc.php' method='POST' enctype='multipart/form-data'>
                            <h3> Add Item </h3>
                            <label class='item-img-2' for='item-img-doctor'>
                                <span id='file-name-item-doctor'>Upload Image</span>
                                <input id='item-img-doctor' type='file' name='item-img-2' accept='.jpg,.jpeg,.png,.gif' onchange='showFileName(this)' required>
                            </label>
                            <input id='item-quantity-doctor' type='number' name='quantity' placeholder='Quantity'required>
                            <div>
                                <button class='icon-button-admin'type='submit' name='insert-item'><i class="fa-solid fa-paper-plane"></i></button>
                                <button class='icon-button-admin' type='button' onclick='clearFileInput()'><i class="fa-solid fa-eraser"></i></button>
                            </div>
                    </form>
                </div>
                <div  class='admin-announcement-container'>
                    <form class='announcement-form' action='../includes/announcement.inc.php' method='POST'>
                        <textarea id='msgTextArea'name='message' placeholder='Message'></textarea>
                        <div style='display: flex; justify-content: space-between; height: 10%; width: 98%;'>
                            <button class='icon-button-admin'type='submit' name='send-announcement'><i class="fa-solid fa-paper-plane"></i></button>
                            <?php
                                if(isset($_GET["error"])){
                                    if($_GET["error"] == "messageEmpty"){
                                        echo "<span class='error'> Fill in all fields!</span>";
                                    }
                                }
                            ?>
                        </div>
                    </form>
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
<?php
    include '../hf/footer.php';
?>
