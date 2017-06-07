<?php
    // make sure everything is set
    if (isset($_POST['name']) && isset($_POST['contact']) && isset($_POST['property'])) {
        // sanitize inputs 
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $contact = filter_var($_POST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $details = filter_var($_POST['details'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
        $property = filter_var($_POST['property'], FILTER_SANITIZE_URL);
        // cache email settins
        $to = 'rentals@perfectlanding.biz';
        $subject = 'New Online Request!';
        // create message
        $message = 'Heads up,<br /><br /><b>' . $name . '</b> is interested in one of your properties!<br />You can reach them at <b>' . $contact . '</b> to set everything up.<br /><br />Cheers,<br /><i>Your Web Bot</i><br />' . $property . '<br /><br />PS. Here\'s their message to you: <i>' . $details . '</i>';
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        // More headers
        $headers .= 'From: <noreply@perfectlandingrentals.com>' . "\r\n";
        // send email
        mail($to, $subject, $message, $headers);
        // post success message
        echo '<h1 style="margin-bottom: 0px;">Complete,</h1><h2>talk to you soon!</h2>';
    } else { // fail message
        echo '<h1 style="margin-bottom: 0px;">Failed,</h1><h2>please refresh and try again!</h2>';
    }

?>