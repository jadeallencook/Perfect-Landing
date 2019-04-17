import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import convert from 'xml-js';
import App from './App';

function render(vrp, ical) {
    // get properties from vrp xml
    let properties = {};
    vrp = convert.xml2json(vrp, { compact: true, spaces: 0 });
    vrp = JSON.parse(vrp).data.xprop;
    vrp.forEach(property => {
        properties[property.propid['_text']] = property;
    });
    // get calendars from ical xml
    let calendars = {};
    ical= convert.xml2json(ical, { compact: true, spaces: 0 })
    ical = JSON.parse(ical).data;
    calendars.start = ical['_attributes'].begdate;
    ical = ical.xavail;
    ical.forEach(calendar => {
        calendars[calendar.propid['_text']] = calendar.avlist['_text'];
    });
    // react app rendeer
    ReactDOM.render(<App properties={properties} calendars={calendars} />, document.getElementById('root'));
}

// local & public fetches
fetch('/vrp/vrpexport/vrpexport_xprop.xml')
.then(vrp => vrp.text())
.then(vrp => {
    fetch('/vrp/vrpexport/vrpexport_xavail.xml')
    .then(ical => ical.text())
    .then(ical => {
        render(vrp, ical);
    })
})
.catch(error => {
    // github environment
    fetch('https://jadeallencook.github.io/Perfect-Landing/build/vrp/vrpexport/vrpexport_xprop.xml')
        .then(vrp => vrp.text())
        .then(vrp => {
            fetch('https://jadeallencook.github.io/Perfect-Landing/build/vrp/vrpexport/vrpexport_xavail.xml')
            .then(ical => ical.text())
            .then(ical => {
                render(vrp, ical);
            })
        })
});

serviceWorker.unregister();
