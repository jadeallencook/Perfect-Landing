<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once('../partials/includes.php'); ?>
    <link rel="stylesheet" href="../css/jquery-ui.min.css">
</head>

<body class="fixed-header">

    <div id="page-container">
        <?php include_once('../partials/navbar.php') ?>
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
                            <h1 class="title">Browse Properties</h1></div>
                        <div>
                            <h2 class="sub-title">Take a minute to check out some of our locations</h2></div>
                    </div>
                </div>
                <div id="breadcrumb">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="../index.php"><i class="fa fa-home"></i></a></li>
                            <li><a href="#">Browse</a></li>
                        </ol>
                    </div>
                </div>
                <!-- /#breadcrumb -->
                <span class="cover"></span>
            </section>
            <!-- /#header -->

            <section id="grid-content">
                <div class="container">
                    <div class="row">
                        <div class="col-md-9 col-md-push-3" id="properties-container">
                            <h1>Loading...</h1>
                        </div>
                        <!-- ./col-md-9 -->
                        <div class="col-md-3 col-md-pull-9">
                            <div class="section-title line-style" style="margin-top: 0px;">
                                <h3 class="title">Search Box</h3>
                            </div>
                            <div class="right-box">
                                <div class="row">
                                    <input type="hidden" id="back" value="true">
                                    <input type="hidden" id="browse-page" value="true">
                                    <div class="col-md-12 space-div" id="cities-dropdown">

                                    </div>
                                    <div class="col-md-12 space-div">
                                        <input class="form-control" type="text" name="prop-name" id="prop-name" placeholder="Property Name" />
                                    </div>
                                    <div class="col-md-6 space-div">
                                        <label>Bathroom</label>
                                        <input class="form-control" type="text" name="bathroom" id="bathroom" value="1" />
                                    </div>
                                    <div class="col-md-6 space-div">
                                        <label>Bedroom</label>
                                        <input class="form-control" type="text" name="bedroom" id="bedroom" value="1" />
                                    </div>
                                    <div class="col-md-6 space-div">
                                        <input class="form-control" type="text" name="checkin" id="checkin" placeholder="Check In" />
                                    </div>
                                    <div class="col-md-6 space-div">
                                        <input class="form-control" type="text" name="checkout" id="checkout" placeholder="Check Out" />
                                    </div>
                                    <div class="col-md-12 space-div">
                                        <button type="button" class="btn btn-default search-button" id="find-rental">SEARCH NOW</button>
                                    </div>
                                    <!-- ./footer -->
                                </div>
                                <!-- ./row 2 -->
                            </div>
                            <div class="section-title line-style no-margin">
                                <h3 class="title">Filters</h3>
                            </div>
                            <div id="filter-box">
                                <div class="filter" data-value="On Lake Huron">On Lake Huron</div>
                                <div class="filter" data-value="Lake Huron Access">Lake Huron Access</div>
                                <div class="filter" data-value="River">River</div>
                                <div class="filter" data-value="Near Public Beach">Near Public Beach</div>
                                <div class="filter" data-value="Inland Lake">Inland Lake</div>
                                <div class="filter" data-value="Pets Considered">Pets Considered</div>
                                <div class="filter" data-value="Wi-Fi">Wi-Fi</div>
                                <div class="filter" data-value="Air Conditioning">Air Conditioning</div>
                                <div class="filter" data-value="Washer/Dryer">Washer/Dryer</div>
                                <div class="filter" data-value="Dishwasher">Dishwasher</div>
                                <div class="filter" data-value="Fireplace">Fireplace</div>
                                <div class="filter" data-value="Fire pit">Fire pit</div>
                                <div class="filter" data-value="Hot Tub">Hot Tub</div>
                                <div class="filter" data-value="Sauna">Sauna</div>
                            </div>
                            <small><b><i>Click Filter To Apply</i></b></small>
                        </div>
                        <!-- ./col-md-3 -->

                    </div>
                    <!-- ./row -->
                </div>
                <!-- ./container -->
                <!-- pagination -->
                <div class="container" id="pagination">
                    <div class="row">
                        <div class="col-md-9 col-md-offset-3 text-right">
                            <ul class="pagination">
                                <li><a id="last-btn"><i class="fa fa-chevron-left"></i> LAST</a></li>
                                <small><b>Page: </b><span id="page-number">1</span></small>
                                <li><a id="next-btn" style="margin-right: 5px;">NEXT <i class="fa fa-chevron-right"></i> </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- ./container -->
            </section>
            <!-- /.#masonry-content -->


            <?php include_once('../partials/footer.php') ?>
                <?php include_once('../partials/modals.php') ?>

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
    <!-- Custom	Script -->
    <script src="../script/search.js"></script>
    <script src="../script/browse.js"></script>
    <?php include_once('../partials/ga.php') ?>
</body>

</html>