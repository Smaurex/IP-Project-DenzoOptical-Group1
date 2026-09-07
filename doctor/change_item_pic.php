<?php
    include "../hf/headernav.php";
    require_once '../includes/dbh.inc.php';
    require_once '../includes/functions.inc.php';
?>
<?php
	if(isset($_SESSION['role']) && $_SESSION['role']=='doctor' || isset($_SESSION['role']) && $_SESSION['role']=='assistant')
	{}
	else
	{
		header('Location: ../index.php');
	}
    $itemID = $_GET['itemID'];
?>



    <main class="centerbody">
        <section class="row">
            <div class="flex-container-changeItemIMG">
                <h3>Change Item Image</h3>
                <form id="item-edit-img-form" action="../includes/item.inc.php" method="POST" enctype="multipart/form-data">
                    <label class="upload-img" for="item-edit-img">
                        <span id="file-name-item-edit">Upload Image</span>
                        <input id="item-edit-img" type="file" name="item-edit-img" accept=".jpg,.jpeg,.png,.gif" onchange="showFileName(this)" required>
                    </label>
                    <input type='hidden' name='itemID' value= '<?php echo $itemID; ?>'>
                    <?php
                        if ($_SESSION['role'] == 'doctor') {
                            echo '<button type="button" onclick="window.location.href=\'DoctorPage.php\'"> <i class="fas fa-arrow-left"></i> Back</button>';
                        } 
                        else if ($_SESSION['role'] == 'assistant') {
                            echo '<button type="button" onclick="window.location.href=\'../assistant/AssistantPage.php\'"> <i class="fas fa-arrow-left"></i> Back</button>';
                        }
                    ?>
                    <button type="submit" name="update-item">Update Image</button>
                    <button type="button" onclick="clearFileInput()">Clear</button>
                </form>
            </div>
        </section>
    </main>

<script>
    function showFileName(input) {
        const fileNameSpan = document.getElementById('file-name-item-edit');
        if (input.files.length > 0) {
            fileNameSpan.textContent = input.files[0].name;
        } else {
            fileNameSpan.textContent = 'Upload Image';
        }
    }

   function clearFileInput() {
        const fileInput = document.getElementById("item-edit-img");
        fileInput.value = '';
        document.getElementById("file-name-item-edit").textContent = "Upload Image";
    }


</script>