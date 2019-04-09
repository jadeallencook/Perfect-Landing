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
                                                    property.amenlist['_text'].split('|').map((amenity, x) => {
                                                        if (amenity[amenity.length - 1] !== ':') {
                                                            return <div class="col-sm-4 col-xs-6"><span class="detail"><i class="fa fa-square"></i> {amenity}</span></div>
                                                        }
                                                    })
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

                                <div className="box-ads box-grid mini">
                                    <a className="hover-effect image image-fill other-1-link">
                                        <span className="cover"></span>
                                        <img id="other-1-image" />
                                        <h3 className="title" id="other-1-city"></h3>
                                    </a>
                                    <span className="price" id="other-1-price"></span>
                                    <div className="footer">
                                        <a className="btn btn-default other-1-link">Read More</a>
                                    </div>
                                </div>

                                <div className="box-ads box-grid mini">
                                    <a className="hover-effect image image-fill other-2-link">
                                        <span className="cover"></span>
                                        <img id="other-2-image" />
                                        <h3 className="title" id="other-2-city"></h3>
                                    </a>
                                    <span className="price" id="other-2-price"></span>
                                    <div className="footer">
                                        <a className="btn btn-default other-2-link">Read More</a>
                                    </div>
                                </div>

                                <div className="section-title line-style line-style">
                                    <h3 className="title">Search</h3>
                                </div>
                                <div className="search-box-page">
                                    <div className="row">
                                        <input type="hidden" id="back" value="true" />
                                        <div className="col-md-12 space-div" id="cities-container">

                                        </div>
                                        <div className="col-md-6 space-div">
                                            <label>Bathroom</label>
                                            <input className="form-control" type="text" name="bathroom" id="bathroom" value="1" />
                                        </div>
                                        <div className="col-md-6 space-div">
                                            <label>Bedroom</label>
                                            <input className="form-control" type="text" name="bedroom" id="bedroom" value="1" />
                                        </div>
                                        <div className="col-md-12 space-div">
                                            <button type="button" className="btn btn-default search-button" id="find-rental">SEARCH NOW</button>
                                        </div>
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
