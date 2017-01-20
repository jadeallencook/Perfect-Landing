$(function () {
    gDoc('1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4', 'layout');
    Tabletop.init({
        key: '1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4',
        callback: function (data, tabletop) {
            // cache blog data
            const blogs = data.blog.elements;
            // build componet
            function buildBlog(blog) {
                let html = '<div class=" blog-list post-line">' +
                    '<h2 class="title"><a target="_blank" href="' + blog.link + '">' + blog.title + '</a></h2>' +
                    '<div class="image image-fill" style="background-image: url(' + blog.image + '); background-size: cover; background-position: center;">' +
                    '</div>' +
                    '<h3 class="subtitle"></h3>' +
                    '<div class="text">' + blog.description + '</div>' +
                    '<a href="' + blog.link + '" target="_blank" class="btn btn-default button-read">Read More</a>' +
                    '</div>';
                return html;
            }
            // cache jquery
            const $container = $('#blogs-container');
            let first = true;
            // add all the blogs
            $.each(blogs, function(x, blog){
                if (first === true) {
                    $container.empty();
                    first = false;
                }
                $container.append(buildBlog(blog));
            });

        },
        simpleSheet: false
    });
});