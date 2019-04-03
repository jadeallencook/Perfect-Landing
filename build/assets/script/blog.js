$(function(){
    gDoc('1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4', 'layout');
    Tabletop.init({
        key: '1jmx69ezkmKHqKb5MlUttTpL8pkt8i-ThFeXWMQzNRT4',
        callback: function (data, tabletop) {
            var blogs = data.blog.elements;
            function insertBlog(num, blog) {
                $('div#blog-image-' + num).css({
                    backgroundImage: 'url("' + blog.image + '")'
                });
                $('h3#blog-title-' + num).text(blog.title);
                $('div#blog-desc-' + num).append(blog.description);
                $('a#blog-link-' + num).attr('href', blog.link);
            }
            for (var x = 0; x < 3; x++) {
                insertBlog((x + 1), blogs[x]);
            }
        },
        simpleSheet: false
    });
});