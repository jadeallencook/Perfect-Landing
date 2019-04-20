const reviews = require('./reviews.json');
const fs = require('fs');
const keys = Object.keys(reviews);
let obj = {};

function uuidv4() {
    return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


for (let x = 0, max = keys.length; x < max; x++) {
    const key = keys[x];
    const review = reviews[key];
    let property = (obj[review.id]) ? obj[review.id] : {};
    property[uuidv4()] = {
        date: review['date_time'],
        name: review.name,
        id: review.id,
        response: review.response,
        review: (Array.isArray(review.review)) ? review.review.join(' ') : review.review,
        overall: Number(review.overall)
    }
    obj[review.id] = property;
}

fs.writeFile('./export.json', JSON.stringify(obj), function(err) {
    (err) ? console.log(err) : console.log('success');
}); 