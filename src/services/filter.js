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
                !(
                    (
                        filters.beds <= 4 && 
                        filters.beds > 0 && 
                        Number(property.maxsleeps['_text']) >= 1 &&
                        Number(property.maxsleeps['_text']) <= 4 
                    ) || (
                        filters.beds <= 8 && 
                        filters.beds > 4 && 
                        Number(property.maxsleeps['_text']) >= 5 &&
                        Number(property.maxsleeps['_text']) <= 8 
                    ) || (
                        filters.beds <= 12 && 
                        filters.beds > 8 && 
                        Number(property.maxsleeps['_text']) >= 9 &&
                        Number(property.maxsleeps['_text']) <= 12 
                    ) ||  (
                        filters.beds >= 13 && 
                        Number(property.maxsleeps['_text']) >= 13
                    )
                )
        ) || (
            filters.amenities.length > 0 &&
            filters.amenities.map(amenity => amenlist.indexOf(amenity)).indexOf(-1) !== -1
        ) || isBooked
    ) ? false : true;
}