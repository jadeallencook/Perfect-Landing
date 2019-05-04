// return first image in photoset

export default function (photos) {
    let image = photos.split('|')[0];
    return image;
}