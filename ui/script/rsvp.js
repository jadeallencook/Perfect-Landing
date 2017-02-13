$('button#rsvp-property').click(function () {
    // cache values 
    let name = $('input#rsvp-name').val(),
        contact = $('input#rsvp-contact').val(),
        details = $('input#rsvp-details').val();
    // validator functions
    function phonenumber(inputtxt) {
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (inputtxt.match(phoneno)) return true;
        else return false;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    // main build
    if (name.length > 0) {
        $('input#rsvp-name').css({
            border: '1px solid #E5E5E5'
        });
        if (contact.length > 0) {
            if (phonenumber(contact) || validateEmail(contact)) {
                $('input#rsvp-contact').css({
                    border: '1px solid #E5E5E5'
                });
                $.ajax({
                    method: 'POST',
                    url: '../php/rsvp.php',
                    data: {
                        name: name,
                        contact: contact,
                        property: window.location.href,
                        details: details
                    }
                }).success(function (data) {
                    $('div#rsvp-wrapper').empty().append(data);
                }).fail(function () {
                    $('div#rsvp-wrapper').empty().append('<h1 style="margin-bottom: 0px;">Failed,</h1><h2>please refresh and try again!</h2>');
                });
            } else {
                $('input#rsvp-contact').css({
                    border: 'solid thin red'
                });
            }
        } else {
            $('input#rsvp-contact').css({
                border: 'solid thin red'
            });
        }
    } else {
        $('input#rsvp-name').css({
            border: 'solid thin red'
        });
    }
});