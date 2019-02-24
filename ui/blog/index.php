<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once '../partials/includes.php';?>
    <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js"></script>
    <script src="../script/firebase-connect.js"></script>
</head>

<body class="fixed-header">

    <div id="page-container">
        <?php include_once '../partials/navbar.php'?>
            <!-- insert here -->

            <section id="header-page" class="header-margin-base">
                <div class="skyline">
                    <div data-offset="50" class="p1 parallax"></div>
                    <div data-offset="25" class="p2 parallax"></div>
                    <div data-offset="15" class="p3 parallax"></div>
                    <div data-offset="8" class="p4 parallax"></div>
                    <span class="cover"></span>
                    <div class="container header-text">
                        <div>
                            <h1 class="title">Our Blogs</h1></div>
                        <div>
                            <h2 class="sub-title">Find out more here!</h2></div>
                    </div>
                </div>
                <div id="breadcrumb">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="../"><i class="fa fa-home"></i></a></li>
                            <li class="active">Blog</li>
                        </ol>
                    </div>
                </div>
                <!-- /#breadcrumb -->
                <span class="cover"></span>
            </section>
            <!-- /#header -->

            <section id="blog">

                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-12" id="blogs-container">
                            <div class="blog-list post-line">
                                <h2 class="title" id="blog-title-1"></h2>
                                <div class="image image-fill" id="blog-image-1" style="background-size: cover; background-position: center;"></div>
                                <div class="text" id="blog-description-1"></div>
                                <a href=""target="_blank" class="btn btn-default button-read" id="blog-link-1">Read More</a>
                            </div>
                        </div> <div class="col-sm-12 col-md-12" id="blogs-container">
                            <div class="blog-list post-line">
                                <h2 class="title" id="blog-title-2"></h2>
                                <div class="image image-fill" id="blog-image-2" style="background-size: cover; background-position: center;"></div>
                                <div class="text" id="blog-description-2"></div>
                                <a href=""target="_blank" class="btn btn-default button-read" id="blog-link-2">Read More</a>
                            </div>
                        </div> <div class="col-sm-12 col-md-12" id="blogs-container">
                            <div class="blog-list post-line">
                                <h2 class="title" id="blog-title-3"></h2>
                                <div class="image image-fill" id="blog-image-3" style="background-size: cover; background-position: center;"></div>
                                <div class="text" id="blog-description-3"></div>
                                <a href=""target="_blank" class="btn btn-default button-read" id="blog-link-3">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <?php include_once '../partials/footer.php'?>
                <?php include_once '../partials/modals.php'?>

    </div>
    <!-- /#page-container -->

    <script src="../script/jquery.min.js"></script>
    <!-- jQuery	(necessary for Bootstrap's JavaScript plugins) -->
    <script src="../script/jquery-ui.min.js"></script>
    <!-- jQuery	UI is a	curated	set	of user	interface interactions,	effects, widgets, and themes -->
    <script src="../script/bootstrap.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../script/vendor/mmenu/mmenu.min.all.js"></script>
    <!-- Menu Responsive -->
    <script src="../script/vendor/animation-wow/wow.min.js"></script>
    <!-- Animate Script	-->
    <script src="../script/vendor/labelauty/labelauty.min.js"></script>
    <!-- Checkbox Script -->
    <script src="../script/vendor/parallax/parallax.min.js"></script>
    <!-- Parallax Script -->
    <script src="../script/vendor/images-fill/imagesloaded.min.js"></script>
    <!-- Loaded	image with ImageFill -->
    <script src="../script/vendor/images-fill/imagefill.min.js"></script>
    <!-- ImageFill Script -->
    <script src="../script/vendor/easydropdown/jquery.easydropdown.min.js"></script>
    <!-- Select	list Script	-->
    <script src="../script/vendor/carousel/responsiveCarousel.min.js"></script>
    <!-- Carousel Script -->
    <script src="../script/vendor/noui-slider/nouislider.all.min.js"></script>
    <!-- Range Slider -->
    <script src="../script/custom.js"></script>
    <script src="../script/cloud-property-manager.js"></script>
    <script>
        window.cpm.init();
    </script>
    <?php include_once '../partials/ga.php'?>
</body>

</html>