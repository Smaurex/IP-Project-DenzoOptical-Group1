<?php
    include "../hf/headernav.php";
?>
<title>About us</title>
<main class="centerbodyAbout">
    <div class="error" id="aboutApiError" role="alert"></div>
    <section class="about-row-top">
        <img id="about-header-img" class="header-img-patient" alt="Clinic header">
    </section>
    <section class="about-row-mid">
        <div  class="doctor-img-patient">
            <img id="about-doctor-img" class="header-img-patient" alt="Doctor">
        </div>
        <div  class="doctor-content-patient">
            <div class="doctor-content-child">
                <div><b>Name: </b><span data-about="doctorName"></span></div>
                <div><b>Telephone Number:</b> <span data-about="telephone"></span></div>
                <div><b>Mobile Number:</b> <span data-about="mobile"></span></div>
                <div><b>Gmail:</b> <span data-about="email"></span></div>
            </div>
        </div>
    </section>
    <section class="about-row-bot">
        <div id="doctor-credentials-patient">
            <div class="CredTitle">Credentials</div>
            <div class="cred-content" data-about="credentials"></div>
        </div>
        <div class="MapContainer">
            <div class="map-responsive">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.375706463279!2d123.98048357479912!3d10.391704889734628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bd31b4029889%3A0xcd5679be1b68beb0!2sPink%20Me%20Up%20JKRM%20Store!5e0!3m2!1sen!2sph!4v1747069544386!5m2!1sen!2sph" width="600" height="450" style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <div id="doctor-address-patient">
                <div><b>Address:</b> <span data-about="address"></span></div>
            </div>
        </div>
    </section>
</main>
<script src="../js/api.js"></script>
<script src="../js/about-profile.js"></script>
