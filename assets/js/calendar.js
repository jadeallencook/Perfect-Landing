window.getPropertyCalendar = function (id) {
    $.ajax({
        type: 'GET',
        url: 'vrp/ical.xml',
        dataType: 'xml',
        success: function (xml) {
            // cache jquery
            var $forcast = $('div#prop-calendar');
            // cache json & xml
            var json = xmlToJson(xml);
            // get starting date and today
            var genesis = json.data['@attributes'].begdate,
                today = new Date();
            // set json to availability
            json = json.data.xavail;
            // convert string to date
            var from = genesis.split('-');
            genesis = new Date(parseInt(from[0]), parseInt(from[1]) - 1, parseInt(from[2]));
            // add days to genesis
            function addDays(date, days) {
                return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
            }
            // find calendar for current id
            $forcast.empty();
            $.each(json, function (index, property) {
                // when calendar is found
                if (id === property.propid['#text']) {
                    var start = Math.round((today - genesis) / (1000 * 60 * 60 * 24)) + 1,
                        schedule = property.avlist['#text'];
                    for (var x = 0; x < 31; x++) {
                        if (schedule[start + x] != 'A') var html = '<div class="calendar-day unavailable">';
                        else var html = '<div class="calendar-day">';
                        html += addDays(today, x).toDateString();
                        html += '</div>';
                        $forcast.append(html);
                    }
                }
            });
        }
    });
};