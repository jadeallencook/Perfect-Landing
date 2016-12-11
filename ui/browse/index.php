<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>Perfect Landing Vacation Rentals & Real Estate</title>

    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="../css/vendor/font-awesom/css/font-awesome.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../css/vendor/mmenu/jquery.mmenu.all.css" />
    <!-- Menu Responsive -->
    <link rel="stylesheet" href="../css/vendor/animate-wow/animate.css">
    <!-- Animation WOW -->
    <link rel="stylesheet" href="../css/vendor/labelauty/labelauty.css">
    <!-- Checkbox form Style -->
    <link rel="stylesheet" href="../css/vendor/nouislider/nouislider.min.css">
    <!-- Slider Price -->
    <link rel="stylesheet" href="../css/vendor/easydropdown/easydropdown.css">
    <!-- Select form Style -->
    <link rel="stylesheet" href="../css/ui-spinner.css">
    <!-- Spinner -->
    <link rel="stylesheet" href="../css/menu.css">
    <!-- Include Menu stylesheet -->
    <link rel="stylesheet" href="../css/custom.css">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="../css/media-query.css">
    <link rel="stylesheet" href="../css/template/color/F1C40F.css">
    <!-- jQuery UI -->
    <link rel="stylesheet" href="../css/jquery-ui.min.css">
    <!-- Custom Styles -->
    <link rel="stylesheet" href="../css/custom-ui.css">
    <!-- idx css -->
    <link rel="stylesheet" href="../css/idx.css">
    <!-- Use Iconifyer to generate all the favicons and touch icons you need: http://iconifier.net -->
    <link rel="shortcut icon" href="../images/favicon/favicon.png" type="image/x-icon" />
    <link rel="apple-touch-icon" href="../images/favicon/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="../images/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="../images/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="../images/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="../images/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="../images/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="../images/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="../images/favicon/apple-touch-icon-152x152.png" />

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="../https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="../https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="../script/modernizr.min.js"></script>
    <script src="../script/tabletop.js"></script>
    <script src="../script/gDoc.js"></script>
    <script src="../script/xml-to-json.js"></script>
    <!-- Modernizr -->

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
                            <a href="../submit/">
                                <button id="add-property" class="btn btn-default" type="button"><i class="icon fa fa-plus-square"></i> Add Your Property</button>
                            </a>
                            <!-- ===================== SEARCH ===================== -->
                            <div class="section-title line-style">
                                <h3 class="title">Search Box</h3>
                            </div>
                            <div class="right-box">
                                <div class="row">
                                    <input type="hidden" id="back" value="true">
                                    <input type="hidden" id="browse-page" value="true">
                                    <div class="col-md-12 space-div" id="cities-dropdown">

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
                                        <input class="form-control" type="text" name="checkin" id="checkin" value="Check In" />
                                    </div>
                                    <div class="col-md-6 space-div">
                                        <input class="form-control" type="text" name="checkout" id="checkout" value="Check Out" />
                                    </div>
                                    <!--
                                    <div class="col-md-12 space-div">
                                        <label>Price</label>
                                        <div class="slider" id="price-range"></div>
                                        <div class="price-slider price">
                                            <span id="price-value-min"></span>
                                            <span class="separator">$</span>
                                            <span id="price-value-max"></span>
                                        </div>
                                    </div>
                                    -->
                                    <div class="col-md-12 space-div">
                                        <button type="button" class="btn btn-default search-button" id="find-rental">SEARCH NOW</button>
                                    </div>
                                    <!-- ./footer -->
                                </div>
                                <!-- ./row 2 -->
                            </div>
                            <!-- ===================== filter ===================== -->
                            <div class="section-title line-style no-margin">
                                <h3 class="title">Filter</h3>
                            </div>
                            <div id="filter-box">

                            </div>
                            <!-- ./vertical-search-container -->
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
    <script src="../script/browse.js"></script>
    <script src="../script/search.js"></script>
</body>

</html>