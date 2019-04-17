/*
    false: property meets search criterea
    true: property does not match filters
    (return true if criterea is met)
*/

import available from './available';

export default function(property, filters, calendar, start) {
    const isBooked = (
        (filters.checkin && filters.checkout) &&
        !available(filters.checkin, filters.checkout, calendar, start)
    ) ? true : false;
    const amenlist = property.amenlist['_text'].split('|');
    return (
        (
            filters.name &&
            property.propname['_text'].toLowerCase().indexOf(filters.name.toLowerCase()) === -1
        ) || (
            filters.city &&
            property.city['_text'] !== filters.city
        ) || (
            filters.baths &&
            Number(property.numbaths['_text']) < filters.baths
        ) || (
            filters.beds &&
            Number(property.numbedrms['_text']) < filters.beds
        ) || (
            filters.amenities.length > 0 &&
            filters.amenities.map(amenity => amenlist.indexOf(amenity)).indexOf(-1) !== -1
        ) || isBooked
    ) ? false : true;
}