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
        $subject = 'New RSVP Request!';
        // create message
        $message = 'Hello,\n\n' . $name . ' is interested in one of your properties, you can reach them at ' . $contact . ' to RSVP!\n\nCheers,\n\nYour Web Bot\n\n' . $property . '\n\nPS. ' . $details;
        // send email
        mail($to, $subject, $message);
        // post success message
        echo '<h1 style="margin-bottom: 0px;">Complete,</h1><h2>talk to you soon!</h2>';
    } else { // fail message
        echo '<h1 style="margin-bottom: 0px;">Failed,</h1><h2>please refresh and try again!</h2>';
    }

?>