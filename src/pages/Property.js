import React, { Component } from 'react';
import './Property.scss';
import { Link } from 'react-router-dom';
import rate from '../services/rate';
import clean from '../services/clean';
import profile from '../services/profile';
import AOIds from '../information/availability-online.json';
import Reviews from '../components/property/Reviews';

class Property extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            photo: 0,
            calendarURL: ``,
            calendarYear: date.getFullYear(),
            calendarMonth: date.getMonth() + 1,
        };
        window.ga('send', 'event', 'Property Viewed', this.props.property.city['_text'], this.props.property.propid['_text']);
    }

    setCalendar(year, month) {
        this.setState({
            calendarURL: `http://images.availabilityonline.com/api/gcal/index.php?un=perfectlanding&year=${year}&month=${month}&roomId=${AOIds[this.props.property.propid['_text']]}`,
            calendarYear: year,
            calendarMonth: month
        });
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        // photo gallery
        window.$('.fotorama').fotorama();
        // photo descriptions
        document.onclick = event => {
            const element = event.path[0];
            const isImage = (element.classList[0] === 'fotorama__img');
            const hasNum = (element.getAttribute('data-num'));
            const isArrow = (element.classList[0] === 'fotorama__arr');
            if (isImage && hasNum) {
                const num = Number(element.getAttribute('data-num'));
                this.setState({
                    photo: num
                });
            } else if (isArrow) {
                let num = (element.classList[1] === 'fotorama__arr--next') ? 1 : -1;
                this.setState({
                    photo: this.state.photo + num
                });
            }
        }
        // ao calendar
        this.setCalendar(this.state.calendarYear, this.state.calendarMonth);
        // map
        if (window.Map) {
            const mapMarker = '/assets/images/map-pin.png';
            const geocoder = new window.google.maps.Geocoder();
            const address = `${this.props.property.addr1['_text']} ${this.props.property.city['_text']}, MI ${this.props.property.zip['_text']}`;
            geocoder.geocode({
                'address': address
            }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    const latitude = results[0].geometry.location.lat();
                    const longitude = results[0].geometry.location.lng();
                    const uluru = {
                        lat: latitude,
                        lng: longitude
                    };
                    const map = new window.google.maps.Map(document.getElementById('map-canvas'), {
                        zoom: 15,
                        center: uluru
                    });
                    new window.google.maps.Marker({
                        position: uluru,
                        map: map,
                        icon: mapMarker
                    });
                }
            });
        }
    }

    render() {
        const property = this.props.property;
        const photos = this.props.property.photos['_text'].split('|').filter(photo => (photo && photo !== undefined) ? true : false);
        const descriptions = this.props.property.photodescs['_text'].split('|').filter(photo => (photo && photo !== undefined) ? true : false);
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
                                    <div className="fotorama" id="fotorama" data-auto="false" data-width="100%" data-fit="cover" data-max-width="100%" data-nav="thumbs" data-transition="crossfade">
                                        { photos.map((photo, x) => (<img src={`${this.props.property.htppostdir['_text']}${photo}`} key={x} alt={descriptions[x]} />)) }
                                    </div>
                                </div>

                                <center>
                                    <br />
                                    <span><b>Photo Description: </b><i><span id="photo-description">{descriptions[this.state.photo]}</span></i>
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
                                            <div className="row" id="comments-container">
                                                <Reviews propid={this.props.property.propid['_text']} />
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div className="col-md-3">

                                <div className="section-title line-style line-style">
                                    <h3 className="title">Property Calendar</h3>
                                </div>

                                <div>
                                    <div id="aoImageButtons" align="left">
                                        <span id="previousMonth" onClick={() => {
                                            const month = (this.state.calendarMonth === 1) ? 12 : this.state.calendarMonth - 1;
                                            const year = (this.state.calendarMonth === 1) ? this.state.calendarYear - 1 : this.state.calendarYear;
                                            this.setCalendar(year, month);
                                        }}>
                                            <font size="2">&lt;&lt; Previous</font>
                                        </span> | <span id="nextMonth" onClick={() => {
                                            const month = (this.state.calendarMonth === 12) ? 1 : this.state.calendarMonth + 1;
                                            const year = (month === 1) ? this.state.calendarYear + 1 : this.state.calendarYear;
                                            this.setCalendar(year, month);
                                        }}>
                                            <font size="2"> Next &gt;</font>
                                        </span>
                                    </div>
                                    <div id="aoLoader" className="aoLoading">
                                        <img src={this.state.calendarURL} alt="Property Availibity Calendar" />
                                    </div>
                                </div>
                                <br />
                                <form method="post" action="https://www.availabilityonline.com/reservation_form.php" id="ao_aoform4" name="ao_aoform4">
                                    <input type="hidden" name="un" value="perfectlanding" />
                                    <input type="hidden" name="assoc_referrer" value="" />
                                    <input type="hidden" name="referring_url" value="" />
                                    <input type="image" src="https://perfectlandingrentals.com/images/booknow-blue.png" border="0" alt="Submit" />
                                </form>

                                <div className="section-title line-style line-style">
                                    <h3 className="title">Other Properties</h3>
                                </div>
                                {
                                    [...[0, 1, 2, 3].map(num => this.props.properties[num])].map((property, x) => {
                                        return (property) ? (
                                            <div className="box-featured box-grid mini" key={`property-${x}`}>
                                                <Link className="hover-effect image image-fill other-1-link" to={`/#${property.propid['_text']}`}>
                                                    <span className="cover"></span>
                                                    <img alt="home" src={`${property.htppostdir['_text']}${profile(property.photos['_text'])}`} />
                                                    <h3 className="title">{property.propname['_text']}</h3>
                                                </Link>
                                                <span className="price" id="other-1-price">{rate(property.grppgsum['_text'])}</span>
                                                <div className="footer">
                                                    <Link className="btn btn-default" to={`/#${property.propid['_text']}`}>Read More</Link>
                                                </div>
                                            </div>
                                        ) : null
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Property;
