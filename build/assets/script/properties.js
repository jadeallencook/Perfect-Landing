$.ajax({
    type: 'GET',
    url: 'vrp/vrpexport/vrpexport_xprop.xml',
    dataType: 'xml',
    success: function (xml) {

        var json = xmlToJson(xml);
        json = json.data.xprop;

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
                sleeps: parseInt(data.maxpersons['#text']),
                min: parseInt(data.minnights['#text']),
                amenities: [],
                fees: [],
                photos: [],
            };
            if (object.pets.toLowerCase() === 'true') {
                object.pets = true;
            } else {
                object.pets = false;
            }
            var search = ' Nightly';
            if (object.rate.indexOf(' Nightly') === -1) {
                search = ' Daily';
            }
            object.rate = '$' + object.rate.substring(object.rate.indexOf('$') + 1, object.rate.indexOf(search)) + '/night';
            $.each(data.photos['#text'].split(/\|/), function (i, val) {
                if (val) {
                    object.photos.push('http://perfectlandingrentals.com/vrp/' + val);
                }
            });
            $.each(data.amenlist['#text'].split(/\|/), function (i, val) {
                val = val.replace(':', '');
                if (val.toLowerCase() !== 'amenities') {
                    object.amenities.push(val);
                }
            });
            (function () {
                html = object.description;
                html = html.replace("<br>", "||br||");
                var tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                html = tmp.textContent || tmp.innerText;
                object.description = html.replace("||br||", "<br>");
            })();
            return object;
        }

        (function () {
            var temp = {};
            $.each(json, function (x, property) {
                var obj = createProperty(property),
                    id = obj.id;
                delete obj['id'];
                temp[id] = obj;
            });
            json = temp;
        })();

        window.cpm.init(json, function() {
            $('div#loading-container').delay(2200).fadeOut('slow');
        });
    }
});