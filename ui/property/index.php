<!DOCTYPE html>
<html lang="en">

<head>
  <?php require_once('../partials/includes.php'); ?>
  <link rel="stylesheet" href="../css/calendar.css">
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
            <h1 class="title" id="property-title"></h1>
          </div>
          <div>
            <h2 class="sub-title" id="short-desc"></h2>
          </div>
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

            <center>
              <br />
              <span style="background-color: #E37C19; padding: 5px 10px; border-radius: 3px; color: #FFF;"><b>Photo Description: </b><i><span id="photo-description"></span></i>
              </span>
            </center>

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
                <div class="section-title line-style">
                  <h3 class="title">Find this property on map</h3>
                </div>
                <div class="map-container" id="map-canvas"></div>
                <br />
                <span id="property-address"></span>
                <!-- /.details -->
                <div class="section-title line-style line-style">
                  <h3 class="title">Comment & Reviews</h3>
                </div>
                <div class="details">
                  <div class="row feedback" id="comments-container">
                    <h2 style="margin-left: 25px;">Loading...</h2>
                  </div>
                  <a href="../review/" class="btn btn-default">Click Here To Leave A Review</a>
                </div>

              </div>
            </div>


          </div>

          <div class="col-md-3">

            <!-- calendar app -->
            <div class="section-title line-style line-style" style="margin-top: 0px;">
              <h3 class="title">Property Calendar</h3>
            </div>

            <div style="width:172px;">
		          <div id="aoImageButtons" align="center" style="margin-right:auto;margin=left:auto;">
                <a id="previousMonth" href="#calendartop">&lt;&lt; <font size="2">Previous</a> | <a id="nextMonth" href="#calendartop"><font size="2">Next &gt;></a></font></font>
              </div>
              <div id="aoLoader" class="aoLoading"></div>
            </div>
            <br />
            <form method="post" action="https://www.availabilityonline.com/reservation_form.php" id="ao_aoform4" name="ao_aoform4">
              <input type="hidden" name="un" value="perfectlanding" />
              <input type="hidden" name="assoc_referrer" value="" />
              <input type="hidden" name="referring_url" value="" />
              <input type="image" src="../images/booknow-blue.png" style="cursor: pointer;" border="0" alt="Submit" />
    	      </form>

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
                <div class="col-md-12 space-div">
                  <button type="button" class="btn btn-default search-button" id="find-rental">SEARCH NOW</button>
                </div>
                <!-- ./footer -->
              </div>
              <!-- ./row 2 -->
            </div>

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
  <script src="../script/rsvp.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaErVBbKLoW7w577NHxwQ4eN2ptWrp49A" type="text/javascript"></script>
  <?php include_once('../partials/ga.php') ?>
</body>

</html>
