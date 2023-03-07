<?php

########### CONFIG ###############

## $recipient = 'tom.kuestermann75@gmail.';
$redirect = 'startPage.html';

########### CONFIG END ###########



########### Instruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST request to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];
        $message = "Hello,\n
        \nhttps://gruppe-417.developerakademie.net/join/forgotPassword/resetYourPassword.html?email-" . $email . "\n
        \nIf you didn't akt to reset your password, you can ignor this email.\n
        \nThanks,\n
        \n Your Join Team\n";


        $recipient = $email;
        $subject = "Reset your password for Join App";
        $headers = "From:  noreply@https://gruppe-417.developerakademie.net/join/login/resetYourPassword.html";

        $result = mail($recipient, $subject, $headers);
        print($result);

        ## mail($recipient, $subject, $_POST['message'], $headers);
        usleep(150);
        header("Location: " . $redirect);


        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
