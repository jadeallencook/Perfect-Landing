// converts rate string into readable format

export default function(rate) {
    rate = rate.split(' ')[0];
    rate = rate.toLowerCase();
    rate = rate.replace('.00', '');
    rate = rate + '/night'
    return rate;
}