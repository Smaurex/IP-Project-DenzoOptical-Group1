<?php
    include "../hf/headernav.php";
    
    require_once '../includes/dbh.inc.php';
    require_once '../includes/functions.inc.php';
?>
<?php
	
	if(isset($_SESSION["role"]) && $_SESSION["role"]=="patient")
	{}
	else
	{
		header("Location: ../index.php");
	}
    $email = $_SESSION["email"];
?>



<main class="centerbody">
        <section class="row-patient">
            <div class="flex-container-announcement" > 
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
            <div class="flex-container-patient" style="width: 65vw;">   
                <?php
                    $sql = "SELECT * FROM item";
                    $result = mysqli_query($conn, $sql);
                    
                    if ($result && mysqli_num_rows($result) > 0) {
                        $items = mysqli_fetch_all($result, MYSQLI_ASSOC); // Get all rows as associative array

                        foreach ($items as $item) {
                            $itemID = $item['itemID'];
                            $itemQty = $item['quantity'];
                            $itemImg = $item['item_pic_id'];

                            echo "
                            <div class='item-card' id='$itemID'>
                                <div style='height: 70%'class='item-content-img'>
                                    <img style='display: flex; height: 100%; height: 100%;flex: 1 1 0;' src='../item_pics/$itemImg' alt='$itemID'>
                                </div>
                                <div style='height: 15%'class='item-content'>
                                    <div>
                                        <p>Item ID: $itemID</p>
                                        <p>Quantity: $itemQty</p>
                                    </div>";
                                    
                                    if($itemQty != 0){
                                      echo  "<p style='color: green;'>available</p>";
                                    }
                                    else{
                                      echo  "<p style='color: red;'>unavailable</p>";
                                    }
                             echo "
                             </div>
                                <div style='height: 15%'class='item-content'>
                                    <p>inquire: </p>
                                    <div style='display: flex; height:90%;'>
                                        <a href='https://mail.google.com/mail/?view=cm&fs=1&to=maurismattio@gmail.com&su=Inquire%20ITEM%20ID:%20$itemID&body=Hello%20there!%0AI%20Would%20like%20to%20inquire%20the%20item%20with%20the%20ID%20$itemID' target='_blank'>
                                            <i class='fas fa-envelope'></i>
                                        </a>
                                        <a href='https://www.facebook.com/profile.php?id=100064047673782'>
                                            <i class='fa-brands fa-facebook'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ";
                        }
                    } else {
                        echo "<p>No items found.</p>";
                    }
                ?>
            </div>
        </section>
    </main>

<?php
    include "../hf/footer.php";
?>