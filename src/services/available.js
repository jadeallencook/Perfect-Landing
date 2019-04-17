function days(start, end) {
    var day = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((start.getTime() - end.getTime()) / (day)));
}

export default function (checkin, checkout, calendar, start) {
    const yesterday = new Date();
    checkin = new Date(checkin);
    checkout = new Date(checkout);
    start = new Date(start);
    checkin.setDate(checkin.getDate() + 1);
    checkout.setDate(checkout.getDate() + 1);
    start.setDate(start.getDate() + 1);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
        checkout <= checkin ||
        start > checkin || 
        checkin <= yesterday
    ) {
        return false;
    } else if (
        checkout > checkin &&
        start <= checkin &&
        checkin > yesterday
    ) {
        const num = days(start, checkin);
        const stay = days(checkin, checkout);
        calendar = calendar.split('');
        calendar = calendar.filter((avail, x) => (x <= num) ? false : true);
        for (var x = 0; x < stay; x++) {
            if (calendar[x] !== 'A') return false;
        }
        return true;
    } else {
        console.log('failed');
        return false;
    }
}