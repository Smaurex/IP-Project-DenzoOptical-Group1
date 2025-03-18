<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <script defer src="index.js"></script>
    <title>Login Page</title>
</head>
<body>
    <table class="center">
        <tr>
            <td></td>
            <td>
                <div class="left">
                    <form id="form" action="compare.php" method="post">
                        <div class="input-control">
                            <label for="fname"><b>First Name</b></label>
                            <input id="fname" name="fname" type="text"><br>
                            <div class="error"></div>
                        </div>
                        
                        <div class="input-control">
                            <label for="lname"><b>Last Name</b></label>
                            <input id="lname" name="lname" type="text"><br>
                            <div class="error"></div>
                        </div>

                        <div class="input-control">
                            <label for="email"><b>Email</b></label>
                            <input id="email" name="email" type="text"><br>
                            <div class="error"></div>
                        </div>

                        <div class="input-control">
                            <label for="pass1"><b>Password 1</b></label>
                            <input id="pass1" name="pass1" type="password"><br>
                            <div class="error"></div>
                        </div>
                        <button type="submit">Submit</button>
                        <button id="clear" type="button">Clear</button>
                    </form>
                </div>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
    </table>
</body>
</html>