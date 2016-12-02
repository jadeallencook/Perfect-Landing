$(function () {

    // main variables
    var PROPERTIES = [],
        CALENDAR = [],
        CITIES = [];

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
            // verifier function
            function verify() {

            }
            // building variables
            var currentPage = 0,
                $properties = $('div#properties-container'),
                $filters = $('div#filter-box'),
                $cities = $('div#cities-dropdown');
            // display properties for current view
            function displayProperties() {
                $properties.empty();
                for (var i = currentPage, max = i + 10; i < max; i++) {
                    var html = '<div class="box-ads box-list">' +
                        '<a href="property-detail.html" class="hover-effect image image-fill">' +
                        '<span class="cover"></span>' +
                        '<img src="' + build.photosURL + PROPERTIES[i].photos[0] + '" alt="Sample images" />' +
                        '<h3 class="title">' + PROPERTIES[i].address + '</h3>' +
                        '</a>' +
                        '<span class="price">$' + displayPrice(PROPERTIES[i].rate) + '/night</span>' +
                        '<span class="address">' + PROPERTIES[i].name + '</span>' +
                        '<span class="description">' + remove_tags(PROPERTIES[i].description) + '</span>' +
                        '<dl class="detail">' +
                        '<dt class="status">Status:</dt>' +
                        '<dd><span>Available</span></dd>' +
                        '<dt class="bed">Beds:</dt>' +
                        '<dd><span>' + PROPERTIES[i].beds + '</span></dd>' +
                        '<dt class="bath">Baths:</dt>' +
                        '<dd><span>' + PROPERTIES[i].baths + '</span></dd>' +
                        '</dl>' +
                        '<div class="footer">' +
                        '<i class="fa fa-map-marker"></i> ' + PROPERTIES[i].address + '' +
                        '<a href="property-detail.html" class="btn btn-default">Read now</a>' +
                        '</div>' +
                        '</div>';
                    $properties.append(html);
                }
            }
            // append all filters 
            $.each(build.amenities, function (x, val) {
                $filters.append('<a href="#" class="filter">' + val + '</a>');
            });
            // append all cities
            function buildCities() {
                var html = '<select class="dropdown" data-settings=\'{"cutOff": 5}\'>';
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
            }
        }
    });

});