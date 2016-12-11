// building search functions
$('button#find-rental').click(function () {
    var city = $('select#cities').val().replace(/ /g, '-'),
        checkin = $('input#checkin').val(),
        checkout = $('input#checkout').val(),
        bathroom = $('input#bathroom').val(),
        bedroom = $('input#bedroom').val(),
        hash = 'city=' + city + '&checkin=' + checkin + '&checkout=' + checkout + '&bath=' + bathroom + '&bed=' + bedroom;
    if ($('input#back').val() === 'true') {
        window.location = '../browse/#' + hash;
        if ($('input#browse-page').val() === 'true') window.location.reload();
    } else {
        window.location = 'browse/#' + hash;
    }
});