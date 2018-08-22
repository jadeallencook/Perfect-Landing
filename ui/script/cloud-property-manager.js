/* 
    Cloud Property Manager v1.0 2018
    Developed by Onflo (www.onflo.io)
*/

(function () {
    if (!firebase) {
        console.warn('CPM: You need to install Firebase...');
    } else if (!firebaseConfig.userUID) {
        console.warn('CPM: Config firebaseConfig.userUID');
    } else {
        new Promise(function (res, rej) {
            var refURL = 'users/' + firebaseConfig.userUID + '/';
            firebase.database().ref(refURL).once('value').then((snapshot) => {
                res(snapshot.val());
            });
        }).then(function (firebaseUserData) {
            if (firebaseUserData === null) {
                console.warn('CPM: No data for ' + firebaseConfig.userUID + '...');
            } else {
                // banners
                if (firebaseUserData.banners) {
                    (function () {
                        var ids = ['big-text', 'description', 'image', 'top-text'],
                            banners = firebaseUserData.banners;
                        for (var x = 0; x < banners.length; x++) {
                            var banner = banners[x];
                            for (var y = 0; y < ids.length; y++) {
                                var id = ids[y],
                                    elem = document.getElementById('banner-' + (x + 1) + '-' + id);
                                if (elem) {
                                    if (id === 'big-text') {
                                        elem.innerText = banner.bigText;
                                    } else if (id === 'description') {
                                        elem.innerText = banner.description;
                                    } else if (id === 'image') {
                                        elem.style.backgroundImage = 'url("' + banner.image + '")';
                                        elem.style.backgroundSize = 'cover';
                                    } else if (id === 'top-text') {
                                        elem.innerText = banner.topText;
                                    }
                                }
                            }
                        }
                    })();
                }
                // blogs
                if (firebaseUserData.blogs) {}
                // links
                if (firebaseUserData.links) {}
                // featured
                if (firebaseUserData.featured) {}
            }
        });
    }
})();