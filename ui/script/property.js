$(function () {

    var propertyCity = new String();

    // relocated window
    function relocate(url) {
        window.location = url;
    }

    // converts vrp to readable price
    function displayPrice(rate) {
        if (rate.indexOf(' Nightly') === -1) {
            var search = ' Daily';
        } else {
            var search = ' Nightly';
        }
        var price = rate.substring(rate.indexOf('$') + 1, rate.indexOf(search));
        return price;
    }

    // formatting property 
    function displayProperty(id) {
        $.ajax({
            type: 'GET',
            url: '../vrp/vrpexport/vrpexport_xprop.xml',
            dataType: 'xml',
            success: function (xml) {
                $('html, body').scrollTop(0);
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
                        photoDesc: [],
                        short: data.shortdesc['#text']
                    };
                    $.each(data.photos['#text'].split(/\|/), function (i, val) {
                        object.photos.push(val);
                    });
                    $.each(data.amenlist['#text'].split(/\|/), function (i, val) {
                        object.amenities.push(val);
                    });
                    $.each(data.photodescs['#text'].split(/\|/), function (i, val) {
                        object.photoDesc.push(val);
                    });
                    return object;
                };
                var build = {
                    cities: [],
                    amenities: [],
                    max: json.length,
                    properties: [],
                    current: 0,
                    photosURL: 'http://perfectlandingrentals.com/vrp/'
                }
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
                // main property build
                var property = $.grep(build.properties, function (properties) {
                    return properties.id == id;
                });
                // set url and property 
                property = property[0];
                if (property === undefined) relocate('../browse');
                else window.location.hash = '/' + property.id + '/' + property.name.split(' ').join('-') + '/' + property.address.split(' ').join('-') + '/' + property.city.split(' ').join('-');
                // after propery is found and url has been set..
                $('h1#property-title').text(property.name);
                $('h2#short-desc').text(property.short);
                $('span#property-price').text('$' + displayPrice(property.rate) + '/night');
                $('span#photo-description').empty().text(property.photoDesc[0]);

                // set city for things to do 
                propertyCity = property.city;

                function createPhotos() {
                    var html = '<div class="fotorama" data-width="100%" data-fit="cover" data-max-width="100%" data-nav="thumbs" data-transition="crossfade" id="property-photos">';
                    $.each(property.photos, function (x, val) {
                        html += '<img src="' + build.photosURL + val + '" />';
                    });
                    html += '</div>';
                    // prevent script error 
                    html += '<script src="../script/vendor/fotorama/fotorama.min.js"></script>';
                    return html;
                }
                $('div#property-photos').append(createPhotos());
                $('div#property-description').append(property.description);
                // photo desciption functionality
                var currentPhoto = 0;
                $('div.fotorama__arr--next').click(function () {
                    currentPhoto = currentPhoto + 1;
                    $('span#photo-description').empty().text(property.photoDesc[currentPhoto]);
                });
                $('div.fotorama__arr--prev').click(function () {
                    currentPhoto = currentPhoto - 1;
                    $('span#photo-description').empty().text(property.photoDesc[currentPhoto]);
                });

                function createDetails() {
                    var html = '';
                    $.each(property.amenities, function (x, val) {
                        html += '<div class="col-sm-4 col-xs-6">';
                        html += '<span class="detail"><i class="fa fa-square"></i> ' + val + '</span>';
                        html += '</div>';
                    });
                    return html;
                }
                $('div#property-amenities').append(createDetails());
                var other1, other2;
                other1 = Math.floor(Math.random() * build.properties.length);
                do {
                    other2 = Math.floor(Math.random() * build.properties.length);
                } while (other1 === other2);
                other1 = build.properties[other1];
                other2 = build.properties[other2];

                function buildOther(num, data) {
                    $('img#other-' + num + '-image').attr('src', build.photosURL + data.photos[0]);
                    $('a.other-' + num + '-link').attr('href', '../property/#/' + data.id).click(function () {
                        location.reload();
                    });
                    $('h3#other-' + num + '-city').text(data.city);
                    $('span#other-' + num + '-price').append('<small>$' + displayPrice(data.rate) + '/night</small>');
                }
                buildOther(1, other1);
                buildOther(2, other2);
                // place in reviews
                Tabletop.init({
                    key: '1wkiuWqORux27xf5nZOiI44G-IjVRQPzlL3yk3Xhx7yk',
                    callback: function (data, tabletop) {
                        data = data.comments.elements;
                        var validComments = [],
                            html = '';
                        $.each(data, function (x, val) {
                            if (val.id === id) {
                                html += '<div class="user-feedback">' +
                                    '<span class="name">' + val.name + '</span>' +
                                    '<span class="text">' + val.review + '</span>' +
                                    '<span class="vote">';
                                for (var y = 1; y <= 5; y++) {
                                    if (y <= val.overall) html += '<i class="fa fa-star"></i>';
                                    else html += '<i class="fa fa-star-o"></i>';
                                }
                                html += '</span></div>';
                            }
                        });
                        $('div#comments-container').empty();
                        if (html.length > 0) $('div#comments-container').append(html);
                        else $('div#comments-container').append('<h2 style="margin-left: 25px;">No reviews yet!</h2>');
                    },
                    simpleSheet: false
                });
                // place in reviews
                Tabletop.init({
                    key: '11-4D1bHoBnzSAkd-BT8OAX0yXF3dQZr8PPPe9qKoYY0',
                    callback: function (data, tabletop) {
                        $.each(data, function (x, city) {
                            if (propertyCity === city.name) {
                                var thingsToDoHTML = '<ul>';
                                $.each(data[city.name].elements, function (y, thing) {
                                    thingsToDoHTML += '<li><a href="' + thing.link + '" target="_blank">' + thing.text + '</a></li>';
                                });
                                thingsToDoHTML += '<ul>';
                                $('div#property-description').append(
                                    '<br /><br />' +
                                    '<b>Things To Do In ' + city.name + '</b>' +
                                    '<br />' +
                                    thingsToDoHTML
                                );
                            }
                        });

                    },
                    simpleSheet: false
                });
            }
        });
    }

    // get the hash and remove #
    var hash = window.location.hash;
    hash = hash.slice(2);

    // build calendar module
    $.ajax({
        type: 'GET',
        url: '../vrp/vrpexport/vrpexport_xavail.xml',
        dataType: 'xml',
        success: function (xml) {
            // cache json & xml
            var json = xmlToJson(xml),
                propID = hash[0],
                startDate = new Date(json.data['@attributes'].begdate.replace(/-/g, '/')),
                today = new Date(),
                availability = '';
            json = json.data.xavail;
            $.each(json, function (x, property) {
                if (property.propid['#text'] === propID) {
                    availability = property.avlist['#text'];
                    return false;
                }
            });
            // get difference between today and startdate
            function daysIn(day) {
                return Math.round((day - startDate) / (1000 * 60 * 60 * 24));
            }
            $('div#calendar-app').datepicker({
                inline: true,
                firstDay: 1,
                showOtherMonths: true,
                dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                beforeShowDay: function (date) {
                    var position = daysIn(date);
                    // check if date is in your array of dates
                    if (availability[position] !== 'A' && availability[position] !== undefined) {
                        // if it is return the following.
                        return [true, 'highlight'];
                    } else {
                        // default
                        return [true, ''];
                    }
                }
            });
        }
    });

    // relocate if none - else display property
    if (!hash) {
        relocate('../browse');
    } else {
        hash = hash.split('/');
        displayProperty(hash[0]);
    }

});