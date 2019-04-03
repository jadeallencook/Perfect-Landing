export default function(property, filters) {
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
        )
    ) ? false : true;
}