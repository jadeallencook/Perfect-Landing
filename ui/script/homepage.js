/* gDoc.js */
$(function () {
    // set all layout info
    gDoc('1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4', 'layout');
    Tabletop.init({
        key: '1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4',
        callback: function (data, tabletop) {
            data = data.homepage.elements;
            // set for 3 banners
            for (var i = 1; i < 4; i++) {
                // set each background
                $('figure#banner-' + i).css({
                    backgroundImage: 'url("' + data[(i - 1)].image + '")',
                    backgroundSize: 'cover'
                });
                // and all the text
                $('figure#banner-' + i + ' div.content h2').text(data[(i - 1)].small);
                $('figure#banner-' + i + ' div.content h1').text(data[(i - 1)].large);
                $('figure#banner-' + i + ' div.content h3').text(data[(i - 1)].description);
            }
        },
        simpleSheet: false
    });
    $.ajax({
        type: 'GET',
        url: 'vrp/vrpexport/vrpexport_xprop.xml',
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
                    max: parseInt(data.maxpersons['#text']),
                    minNights: parseInt(data.minnights['#text']),
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
                var price = rate.substring(property.rate.indexOf('$') + 1, rate.indexOf(search));
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
                },
                property: function (property) {
                    if (property.pets === 'true') var pets = 'Not Allowed';
                    else var pets = 'Allowed';
                    var html = "";
                    html += "<div class=\"col-md-4\">";
                    html += "<div class=\"box-ads box-home\">";
                    html += "<a class=\"hover-effect image image-fill\" href=\"property/#/" + property.id + "\">";
                    html += "<span class=\"cover\"><\/span>";
                    html += "<img alt=\"Sample images\" src=\"" + build.photosURL + property.photos[0] + "\">";
                    html += "<h3 class=\"title\">" + property.name + "<\/h3>";
                    html += "<\/a>";
                    html += "<span class=\"price\">$" + displayPrice(property.rate) + "/night<\/span>";
                    html += "<span class=\"address\"><i class=\"fa fa-map-marker\"><\/i> " + property.city + ", " + property.zip + "<\/span>";
                    html += "<span class=\"description\">" + remove_tags(property.description) + "<\/span>";
                    html += "<dl class=\"detail\">";
                    html += "<dt class=\"status\">Sleeps:<\/dt>";
                    html += "<dd><span>" + property.max + "<\/span><\/dd>";
                    html += "<dt class=\"bed\">Bedrooms:<\/dt>";
                    html += "<dd><span>" + property.beds + "<\/span><\/dd>";
                    html += "<dt class=\"bath\">Bathrooms:<\/dt>";
                    html += "<dd><span>" + property.baths + "<\/span><\/dd>";
                    html += "<dt class=\"area\">Minimum Stay:<\/dt>";
                    html += "<dd><span>" + property.minNights + "<\/span><\/dd>";
                    html += "<\/dl>";
                    html += "<div class=\"footer\">";
                    html += "<a class=\"btn btn-reverse\" href=\"property/#/" + property.id + "\">Read now<\/a>";
                    html += "<\/div><\/div><\/div>";
                    return html;
                }
            };
            build.getProperties();
            // set homepage banner info
            Tabletop.init({
                key: '1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4',
                callback: function (data, tabletop) {
                    var featured = data.featured.elements,
                        featuredArray = [],
                        allID = [],
                        urls = data.urls.elements,
                        domain = document.domain;
                    $.each(featured, function (x, val) {
                        featuredArray.push(val.id);
                    });
                    $.each(build.properties, function (x, val) {
                        allID.push(val.id);
                    });
                    $('div#featured-list').append(build.property(build.properties[allID.indexOf(featuredArray[0])]));
                    $('div#featured-list').append(build.property(build.properties[allID.indexOf(featuredArray[1])]));
                    $('div#featured-list').append(build.property(build.properties[allID.indexOf(featuredArray[2])]));
                    $.each(urls, function (x, val) {
                        var url = val.url;
                        if (url === domain) {
                            $('div#featured-list').empty();
                            $('div#featured-list').append(build.property(build.properties[allID.indexOf(val.prop1)]));
                            $('div#featured-list').append(build.property(build.properties[allID.indexOf(val.prop2)]));
                            $('div#featured-list').append(build.property(build.properties[allID.indexOf(val.prop3)]));
                        }
                    });
                },
                simpleSheet: false
            });
            // init process
            if (build.hash) {
                build.hash = parseInt(build.hash.match(/\d+$/)[0]);
                build.current = (build.hash - 1);
            }
            var MAX = build.properties.length - 1;
            // build homepage properties
            for (var i = 0; i < 3; i++) {
                var property = build.properties[MAX - i];
                $('div#recent-list').append(build.property(property));
                if (i === 2) {
                    $('div#loading-container').delay(2200).fadeOut('slow');
                }
            }
        }
    });

});