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
    <link rel="stylesheet" href="../css/vendor/nouislider/nouislider.min.css">
    <!-- Slider Price -->
    <link rel="stylesheet" href="../css/vendor/easydropdown/easydropdown.css">
    <!-- Select form Style -->
    <link rel="stylesheet" href="../css/vendor/fotorama/fotorama.css">
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
                            <h1 class="title" id="property-title"></h1></div>
                        <div>
                            <h2 class="sub-title" id="short-desc"></h2></div>
                    </div>
                </div>
                <div id="breadcrumb">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="../index.php"><i class="fa fa-home"></i></a></li>
                            <li><a href="../browse/">Browse</a></li>
                            <li class="active">Details</li>
                        </ol>
                    </div>
                </div>
                <!-- /#breadcrumb -->
                <span class="cover"></span>
            </section>
            <!-- /#header -->

            <section id="property-content">

                <div class="container">
                    <div class="row">
                        <div class="col-md-9">

                            <!-- 2. Price -->
                            <span class="large-price" id="property-price"></span>

                            <!-- 1. Images gallery -->
                            <div id="property-photos">
                            </div>

                            <!-- /.Secondo Row -->
                            <div class="row">
                                <div class="col-md-12">

                                    <!-- 6. Description -->
                                    <div class="section-title line-style">
                                        <h3 class="title">Description</h3>
                                    </div>
                                    <div class="description" id="property-description">
                                    </div>

                                    <!-- 7. Details -->
                                    <div class="section-title line-style line-style">
                                        <h3 class="title">Property details</h3>
                                    </div>
                                    <div class="details">
                                        <div class="row" id="property-amenities">
                                        </div>
                                    </div>
                                    <!-- /.details -->
                                    <div class="section-title line-style line-style">
                                        <h3 class="title">Comment & Reviews</h3>
                                    </div>
                                    <div class="details">
                                        <div class="row feedback" id="comments-container">
                                            <h2 style="margin-left: 25px;">Loading...</h2>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div class="col-md-3">
                            <!-- 5. Search -->
                            <div class="section-title line-style line-style">
                                <h3 class="title">Search</h3>
                            </div>
                            <div class="search-box-page">
                                <div class="row">
                                    <input type="hidden" id="back" value="true">
                                    <div class="col-md-12 space-div" id="cities-container">

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

                            <!-- Other property -->
                            <div class="section-title line-style line-style">
                                <h3 class="title">Other Property</h3>
                            </div>

                            <div class="box-ads box-grid mini">
                                <a class="hover-effect image image-fill other-1-link">
                                    <span class="cover"></span>
                                    <img id="other-1-image">
                                    <h3 class="title" id="other-1-city"></h3>
                                </a>
                                <span class="price" id="other-1-price"></span>
                                <div class="footer">
                                    <a class="btn btn-default other-1-link">Read More</a>
                                </div>
                            </div>
                            <!-- /.box-ads -->

                            <div class="box-ads box-grid mini">
                                <a class="hover-effect image image-fill other-2-link">
                                    <span class="cover"></span>
                                    <img id="other-2-image">
                                    <h3 class="title" id="other-2-city"></h3>
                                </a>
                                <span class="price" id="other-2-price"></span>
                                <div class="footer">
                                    <a class="btn btn-default other-2-link">Read More</a>
                                </div>
                            </div>
                            <!-- /.box-ads -->

                        </div>
                    </div>
                </div>
            </section>

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
    <script src="../script/property.js"></script>
    <script src="../script/search.js"></script>
    <!-- Custom	Script -->
</body>

</html>