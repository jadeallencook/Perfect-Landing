$(function () {
    $.ajax({
        type: 'GET',
        url: 'vrp/rentals.xml',
        dataType: 'xml',
        success: function (xml) {
            // cache jquery
            var $app = $('div#app'),
                $name = $('h1#prop-name'),
                $images = $('div#prop-images'),
                $address = $('span#prop-address'),
                $description = $('div#prop-description'),
                $amenities = $('div#prop-amenities'),
                $id = $('span#prop-id'),
                $next = $('div#next'),
                $last = $('div#last');
            // cache json & xml
            var json = xmlToJson(xml);
            json = json.data.xprop;
            // create object for rentals
            function createProperty(data) {
                var object = {
                    name: data.propname['#text'],
                    address: data.addr1['#text'],
                    city: data.city['#text'],
                    rate: data.grppgsum['#text'],
                    description: data.longdesc['#text'],
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
            }
            // build variables 
            var build = {
                max: json.length,
                properties: [],
                current: 0,
                photosURL: 'http://perfectlandingrentals.com/vrp/',
                hash: window.location.hash,
                getProperties: function () {
                    // gets each property
                    for (var i = 0; i < build.max; i++) {
                        build.properties.push(createProperty(json[i]));
                    }
                },
                view: function () {
                    var property = build.properties[build.current];
                    $('title').empty().text('Perfect Landing - ' + property.name);
                    $id.empty().text('Property #' + (build.current + 1));
                    $name.empty().text(property.name);
                    $description.empty().append(property.description);
                    $images.empty();
                    for (var i = 0, max = property.photos.length; i < max; i++) {
                        var photo = property.photos[i];
                        if (photo != '') $images.append(
                            '<a href="' + build.photosURL + photo + '" target="_blank">' +
                            '<img src="' + build.photosURL + photo + '" />' +
                            '</a>'
                        );
                    }
                    $amenities.empty();
                    for (var i = 0, max = property.amenities.length; i < max; i++) {
                        $amenities.append('<div class="amenity">' + property.amenities[i] + '</div>');
                    }
                    $address.empty().text(property.address);
                    window.location.href = window.location.origin + window.location.pathname + '#/' + (build.current + 1);
                }
            };
            // init process
            if (build.hash) {
                build.hash = parseInt(build.hash.match(/\d+$/)[0]);
                build.current = (build.hash - 1);
            }
            build.getProperties();
            build.view();
            var listeners = {
                next: function () {
                    if (build.current >= (build.max - 1)) build.current = 0;
                    else build.current = build.current + 1;
                    build.view();
                },
                last: function () {
                    if (build.current <= 0) build.current = (build.max - 1);
                    else build.current = build.current - 1;
                    build.view();
                }
            }
            $next.click(function () {
                listeners.next();
            });
            $last.click(function () {
                listeners.last();
            });
            $(document).keydown(function (e) {
                switch (e.which) {
                case 37: // left
                    listeners.last();
                    break;
                case 39: // right
                    listeners.next();
                    break;
                default:
                    return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });
        }
    });
});