$(function () {

    // main variables
    var PROPERTIES = [],
        CALENDAR = [],
        CITIES = [];

    // days between two dates
    function getDays(date1, date2) {
        date1Array = date1.split('/');
        date2Array = date2.split('/');
        date1 = new Date(date1Array[2], date1Array[0] - 1, date1Array[1]);
        date2 = new Date(date2Array[2], date2Array[0] - 1, date2Array[1]);
        return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    }

    // get data
    $.ajax({
        type: 'GET',
        url: '../vrp/rentals.xml',
        dataType: 'xml',
        success: function (xml) {
            // cache json & xml
            var json = xmlToJson(xml);
            json = json.data.xprop;
            // create object for rentals
            function createProperty(data) {
                var object = {
                    pets: data.nopets['#text'],
                    beds: parseInt(data.numbedrms['#text']),
                    baths: parseInt(data.numbaths['#text']),
                    id: data.propid['#text'],
                    name: data.propname['#text'],
                    address: data.addr1['#text'],
                    city: data.city['#text'],
                    rate: data.grppgsum['#text'],
                    description: data.longdesc['#text'],
                    zip: parseInt(data.zip['#text']),
                    amenities: [],
                    fees: [],
                    photos: [],
                };
                $.each(data.photos['#text'].split(/\|/), function (i, val) {
                    object.photos.push(val);
                });
                $.each(data.amenlist['#text'].split(/\|/), function (i, val) {
                    object.amenities.push(val);
                });
                return object;
            };

            function remove_tags(html) {
                var html = html.replace("<br>", "||br||");
                var tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                html = tmp.textContent || tmp.innerText;
                return html.replace("||br||", "<br>");
            }

            function displayPrice(rate) {
                if (rate.indexOf(' Nightly') === -1) {
                    var search = ' Daily';
                } else {
                    var search = ' Nightly';
                }
                var price = rate.substring(rate.indexOf('$') + 1, rate.indexOf(search));
                return price;
            }
            // build variables 
            var build = {
                cities: [],
                amenities: [],
                max: json.length,
                properties: [],
                current: 0,
                photosURL: 'http://perfectlandingrentals.com/vrp/',
                hash: window.location.hash,
                getProperties: function () {
                    // gets each property
                    for (var i = 0; i < build.max; i++) {
                        build.properties.push(createProperty(json[i]));
                        if ($.inArray(build.properties[i].city, build.cities) == -1) {
                            build.cities.push(build.properties[i].city);
                            $.each(build.properties[i].amenities, function (x, val) {
                                if ($.inArray(val, build.amenities) == -1) {
                                    build.amenities.push(val);
                                }
                            });
                        }
                    }
                    // insert cities into options
                    if ($('div#cities-container')) {
                        var html = '<select class="dropdown" data-settings=\'{"cutOff": 3}\' id="cities">"';
                        html += '<option value="">-- All Cities --</option>';
                        $.each(build.cities, function (x, val) {
                            html += '<option value="' + val + '">' + val + '</option>';
                        });
                        html += '</select>';
                        $('div#cities-container').append(html);
                    }
                    // insert amenities
                    if ($('div#filters')) {
                        var html = '<div class="col-xs-6 col-sm-4 col-md-3" id="amenities">';
                        $.each(build.amenities, function (x, val) {
                            html += '<input class="labelauty" type="checkbox" data-labelauty="' + val + '">';
                        });
                        html += '</div>';
                        $('div#filters').append(html);
                        $(".labelauty").labelauty();
                    }
                }
            };
            // set build data
            build.getProperties();
            PROPERTIES = build.properties;
            CITIES = build.cities;
            // building variables
            var currentPage = 0,
                $properties = $('div#properties-container'),
                $filters = $('div#filter-box'),
                $cities = $('div#cities-dropdown');
            // btn listers 
            if ($('a#last-btn')) {
                $('a#last-btn').click(function () {
                    currentPage = currentPage - 10;
                    displayProperties();
                    $('html, body').scrollTop(0);
                });
            }
            if ($('a#next-btn')) {
                $('a#next-btn').click(function () {
                    currentPage = currentPage + 10;
                    displayProperties();
                    $('html, body').scrollTop(0);
                });
            }
            // display properties for current view
            function displayProperties() {
                if (currentPage <= 9) $('a#last-btn').hide();
                else $('a#last-btn').show();
                if ((currentPage + 10) > PROPERTIES.length) $('a#next-btn').hide();
                else $('a#next-btn').show();
                $properties.empty();
                if (PROPERTIES.length > 0) {
                    for (var i = currentPage, max = i + 10; i < max; i++) {
                        if (PROPERTIES[i]) {
                            var pets = PROPERTIES[i].pets;
                            if (pets !== 'true') pets = 'Allowed';
                            else pets = 'Not Allowed';
                            var html = '<div class="box-ads box-list">' +
                                '<a href="../property/#/' + PROPERTIES[i].id + '" class="hover-effect image image-fill">' +
                                '<span class="cover"></span>' +
                                '<img src="' + build.photosURL + PROPERTIES[i].photos[0] + '" alt="Sample images" />' +
                                '<h3 class="title">' + PROPERTIES[i].name + '</h3>' +
                                '</a>' +
                                '<span class="price">$' + displayPrice(PROPERTIES[i].rate) + '/night</span>' +
                                '<span class="address"><i class="fa fa-map-marker"></i> ' + PROPERTIES[i].city + '</span>' +
                                '<span class="description">' + remove_tags(PROPERTIES[i].description) + '</span>' +
                                '<dl class="detail">' +
                                '<dt class="area">Pets:</dt>' +
                                '<dd><span>' + pets + '</span></dd>' +
                                '<dt class="bed">Beds:</dt>' +
                                '<dd><span>' + PROPERTIES[i].beds + '</span></dd>' +
                                '<dt class="bath">Baths:</dt>' +
                                '<dd><span>' + PROPERTIES[i].baths + '</span></dd>' +
                                '</dl>' +
                                '</div>';
                            $properties.append(html);
                        }
                    }
                } else {
                    $properties.append('<h1>No results found...</h1>');
                }
            }
            function buildCities() {
                var html = '<select class="dropdown" id="cities" data-settings=\'{"cutOff": 5}\'>';
                html += '<option value="">-- All Cities --</option>';
                $.each(build.cities, function (x, val) {
                    html += '<option value="' + val + '">' + val + '</option>';
                });
                html += '</select>';
                $cities.append(html);
            }
            buildCities();
            // browse all properties
            if (window.location.hash.length === 0) {
                displayProperties();
            } else {
                // remove properties without criterea
                var tempProperties = [];
                // converts hash to object
                function parseParms(str) {
                    var pieces = str.split("&"),
                        data = {},
                        i, parts;
                    // process each query pair
                    for (var i = 0, max = pieces.length; i < max; i++) {
                        parts = pieces[i].split("=");
                        if (parts.length < 2) {
                            parts.push("");
                        }
                        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    }
                    return data;
                }
                var hash = window.location.hash.substr(1);
                hash = parseParms(hash);
                // create {} for filters
                var filters = {},
                    availIDs = [];
                // set bath 
                if (hash.bath.length > 0 && hash.bath.length < 10) filters.bath = parseInt(hash.bath);
                else filters.bath = 1;
                // set bed
                if (hash.bed.length > 0 && hash.bed.length < 10) filters.bed = parseInt(hash.bed);
                else filters.bed = 1;
                // set checkin 
                if (hash.checkin.length > 0) filters.checkin = new Date(hash.checkin);
                else filters.checkin = 0;
                // set checkout 
                if (hash.checkout.length > 0) filters.checkout = new Date(hash.checkout);
                else filters.checkout = 0;
                // set city
                if (hash.city.length > 0) filters.city = hash.city.replace('-', ' ');
                else filters.city = 0;
                // auto fill form data to match 
                console.log(filters);
                if (filters.city.length > 0) $('select#cities').val(filters.city);
                $('input#bathroom').val(filters.bath);
                $('input#bedroom').val(filters.bed);
                if (filters.checkin > 0) $('input#checkin').val((filters.checkin.getMonth() + 1) + '/' + filters.checkin.getDate() + '/' + filters.checkin.getFullYear());
                if (filters.checkout > 0) $('input#checkout').val((filters.checkout.getMonth() + 1) + '/' + filters.checkout.getDate() + '/' + filters.checkout.getFullYear());
                $('#grid-content > div:nth-child(1) > div > div.col-md-3.col-md-pull-9 > div.right-box > div > div:nth-child(4) > span > span > span').text(filters.bath);
                $('#grid-content > div:nth-child(1) > div > div.col-md-3.col-md-pull-9 > div.right-box > div > div:nth-child(5) > span > span > span').text(filters.bed);
                // remove properties that don't match filter
                $.each(build.properties, function (x, val) {
                    var test = true;
                    if (filters.city !== val.city) test = false;
                    if (filters.city === 0) test = true;
                    if (filters.bath > parseInt(val.baths)) test = false;
                    if (filters.bed > parseInt(val.beds)) test = false;
                    if (test) {
                        tempProperties.push(val);
                        availIDs.push(val.id);
                    }
                });
                PROPERTIES = tempProperties;
                $.ajax({
                    type: 'GET',
                    url: '../vrp/ical.xml',
                    dataType: 'xml',
                    success: function (ical) {
                        // days between two dates
                        function getDays(date1, date2) {
                            date1Array = date1.split('/');
                            date2Array = date2.split('/');
                            date1 = new Date(date1Array[2], date1Array[0] - 1, date1Array[1]);
                            date2 = new Date(date2Array[2], date2Array[0] - 1, date2Array[1]);
                            return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
                        }
                        // vrp start date
                        var startDate = xmlToJson(ical).data['@attributes'].begdate;
                        startDate = startDate.split('-');
                        startDate = startDate[1] + '/' + startDate[2] + '/' + startDate[0];
                        // today's date 
                        var today = new Date();
                        var todayMonth = today.getMonth() + 1;
                        var todayDay = today.getDate();
                        today = (todayMonth < 10 ? '0' : '') + todayMonth + '/' +
                            (todayDay < 10 ? '0' : '') + todayDay + '/' +
                            today.getFullYear();
                        if (hash.checkin.length > 0) var startPosition = getDays(startDate, hash.checkin);
                        else var startPosition = getDays(startDate, today);
                        // get days between checkin/checkout
                        if (hash.checkin.length > 0 && hash.checkout.length > 0) var days = getDays(hash.checkin, hash.checkout);
                        else var days = 0;
                        // check is schedule is open
                        function validate(data) {
                            var validator = true;
                            if (hash.checkin.length > 0 && hash.checkout.length > 0) {
                                for (var x = 0; x < days; x++) {
                                    if (data[x] !== 'A') validator = false;
                                }
                            }
                            return validator;
                        }
                        ical = xmlToJson(ical).data.xavail;
                        // reset temp props for use 
                        function removeUnavailable() {
                            tempProperties = [];
                            $.each(ical, function (x, val) {
                                if ($.inArray(val.propid['#text'], availIDs) !== -1) {
                                    if (validate(val.avlist['#text'])) {
                                        tempProperties.push(val.propid['#text']);
                                    }
                                }
                            });
                            var tempProperties2 = [];
                            $.each(PROPERTIES, function (x, val) {
                                if ($.inArray(val.id, tempProperties) !== -1) {
                                    tempProperties2.push(val);
                                }
                            });
                            return tempProperties2;
                        }
                        PROPERTIES = removeUnavailable();
                        displayProperties();
                    }
                });
            }
            // filter event listers
            var activeFilters = [],
                allProperties = PROPERTIES;
            $('div.filter').click(function () {
                var value = $(this).attr('data-value'),
                    tmpProperties = [];
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').css({
                        opacity: 1
                    });
                    activeFilters = $.grep(activeFilters, function (x) {
                        return x != value;
                    });
                } else {
                    $(this).addClass('active').css({
                        opacity: 0.5
                    });
                    activeFilters.push(value);
                }
                $.each(allProperties, function(x, property) {
                    var check = true;
                    $.each(activeFilters, function(y, filter){
                        if ($.inArray(filter, property.amenities) === -1) check = false;
                    });
                    if (check) tmpProperties.push(property);
                });
                PROPERTIES = tmpProperties;
                displayProperties();
            });
        }
    });

});