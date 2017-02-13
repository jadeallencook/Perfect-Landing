// init datepicker
$('input#checkin').datepicker({
    minDate: 0
});
$('input#checkout').datepicker({
    minDate: 0
});

// building search functions
$('button#find-rental').click(function () {

    // redirect for browse page
    function redirect() {
        if ($('input#back').val() === 'true') {
            window.location = '../browse/#' + hash;
            if ($('input#browse-page').val() === 'true') window.location.reload();
        } else {
            window.location = 'browse/#' + hash;
        }
    }

    // days between two dates
    function getDays(date1, date2) {
        date1Array = date1.split('/');
        date2Array = date2.split('/');
        date1 = new Date(date1Array[2], date1Array[0] - 1, date1Array[1]);
        date2 = new Date(date2Array[2], date2Array[0] - 1, date2Array[1]);
        return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    }

    // cache search critera
    var city = $('select#cities').val().replace(/ /g, '-'),
        checkin = $('input#checkin').val(),
        checkout = $('input#checkout').val(),
        bathroom = $('input#bathroom').val(),
        bedroom = $('input#bedroom').val(),
        name = $('input#prop-name').val(),
        hash = 'city=' + city + '&checkin=' + checkin + '&checkout=' + checkout + '&bath=' + bathroom + '&bed=' + bedroom + '&name=' + name;

    // check the dates for useability
    function dateCheck() {
        // normailize inputs
        $('input#checkout').css('border', '1px solid #E5E5E5');
        $('input#checkout').css('border', '1px solid #E5E5E5');
        // if neither are set
        if (checkin.length === 0 && checkout.length === 0) {
            // browse all
            redirect();
        } else if (checkin.length > 0 && checkout.length === 0) {
            // if checkout isn't set
            $('input#checkout').css('border', 'solid thin red');
        } else if (checkout.length > 0 && checkin.length === 0) {
            // if checkin isn't set
            $('input#checkin').css('border', 'solid thin red');
        } else {
            // if both are set check days apart 
            if (getDays(checkin, checkout) < 1) {
                $('input#checkout').css('border', 'solid thin red');
            } else { // if positive amount of days execute
                redirect();
            }
        }
    }

    // init date check
    dateCheck();
});