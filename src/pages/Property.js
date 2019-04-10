import React, { Component } from 'react';
import './Property.scss';
import { Link } from 'react-router-dom';
import rate from '../services/rate';
import clean from '../services/clean';

class Property extends Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        window.$('.fotorama').fotorama();
    }

    render() {
        const property = this.props.property;
        return (
            <div className="Property">
                <section id="header-page" className="header-margin-base">
                    <div className="skyline">
                        <div data-offset="50" className="p1 parallax"></div>
                        <div data-offset="25" className="p2 parallax"></div>
                        <div data-offset="15" className="p3 parallax"></div>
                        <div data-offset="8" className="p4 parallax"></div>
                        <span className="cover"></span>
                        <div className="container header-text">
                            <div>
                                <h1 className="title" id="property-title">{property.propname['_text']}</h1>
                            </div>
                            <div>
                                <h2 className="sub-title" id="short-desc">{property.shortsum['_text']}</h2>
                            </div>
                        </div>
                    </div>
                    <div id="breadcrumb">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                                <li className="active">Details</li>
                            </ol>
                        </div>
                    </div>
                    <span className="cover"></span>
                </section>

                <section id="property-content">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">
                                <span className="large-price" id="property-price">{rate(property.grppgsum['_text'])}</span>

                                <div id="property-photos">
                                    <div className="fotorama" data-auto="false" data-width="100%" data-fit="cover" data-max-width="100%" data-nav="thumbs" data-transition="crossfade">
                                        <img src="https://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" alt="Home" />
                                        <img src="https://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" alt="Home" />
                                        <img src="https://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" alt="Home" />
                                        <img src="https://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" alt="Home" />
                                    </div>
                                </div>

                                <center>
                                    <br />
                                    <span><b>Photo Description: </b><i><span id="photo-description"></span></i>
                                    </span>
                                </center>

                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="section-title line-style">
                                            <h3 className="title">Description</h3>
                                        </div>
                                        <div className="description" id="property-description">
                                            {clean(property.longdesc['_text'])}
                                        </div>

                                        <div className="section-title line-style line-style">
                                            <h3 className="title">Amenities</h3>
                                        </div>
                                        <div className="details">
                                            <div className="row" id="property-amenities">
                                                {
                                                    property.amenlist['_text'].split('|').map((amenity, x) => (amenity[amenity.length - 1] !== ':') ? (<div className="col-sm-4 col-xs-6" key={`amenity-${x}`}><span className="detail"><i className="fa fa-square"></i> {amenity}</span></div>) : null)
                                                }
                                            </div>
                                        </div>
                                        <div className="section-title line-style">
                                            <h3 className="title">Map</h3>
                                        </div>
                                        <div className="map-container" id="map-canvas"></div>
                                        <br />
                                        <span id="property-address"></span>
                                        <div className="section-title line-style line-style">
                                            <h3 className="title">Reviews</h3>
                                        </div>
                                        <div className="details">
                                            <div className="row feedback" id="comments-container">
                                                <h2>Loading...</h2>
                                            </div>
                                            <a href="../review/" className="btn btn-default">Click Here To Leave A Review</a>
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div className="col-md-3">

                                <div className="section-title line-style line-style">
                                    <h3 className="title">Property Calendar</h3>
                                </div>

                                <div>
                                    <div id="aoImageButtons" align="center">
                                        <a id="previousMonth" href="#calendartop">
                                            <font size="2">&lt;&lt; Previous</font></a> |
                                            <a id="nextMonth" href="#calendartop"><font size="2">Next &gt;</font>
                                        </a>
                                    </div>
                                    <div id="aoLoader" className="aoLoading"></div>
                                </div>
                                <br />
                                <form method="post" action="https://www.availabilityonline.com/reservation_form.php" id="ao_aoform4" name="ao_aoform4">
                                    <input type="hidden" name="un" value="perfectlanding" />
                                    <input type="hidden" name="assoc_referrer" value="" />
                                    <input type="hidden" name="referring_url" value="" />
                                    <input type="image" src="../images/booknow-blue.png" border="0" alt="Submit" />
                                </form>

                                <div className="section-title line-style line-style">
                                    <h3 className="title">Other Property</h3>
                                </div>

                                <div className="box-featured box-grid mini">
                                    <Link className="hover-effect image image-fill other-1-link" to="/property">
                                        <span className="cover"></span>
                                        <img alt="home" src="http://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" />
                                        <h3 className="title">Property</h3>
                                    </Link>
                                    <span className="price" id="other-1-price">$100</span>
                                    <div className="footer">
                                        <Link className="btn btn-default" to="/property">Read More</Link>
                                    </div>
                                </div>

                                <div className="box-featured box-grid mini">
                                    <Link className="hover-effect image image-fill other-1-link" to="/property">
                                        <span className="cover"></span>
                                        <img alt="home" src="http://perfectlandingrentals.com/vrp/prop1019_img_1919_1920w.jpg" />
                                        <h3 className="title">Property</h3>
                                    </Link>
                                    <span className="price" id="other-2-price">$100</span>
                                    <div className="footer">
                                        <Link className="btn btn-default" to="/property">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Property;
