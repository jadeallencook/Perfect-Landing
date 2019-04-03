import React from 'react';
import './Search.scss';
import locations from '../../information/locations.json';
import { Link } from 'react-router-dom';

const Search = props => (
    <section id="search-box" className="no-margin Search">
        <div className="container search-container fixed-map">
            <div className="search-options sample-page">
                <div className="searcher">
                    <div className="row margin-div" id="searcher-container">
                        <div className="col-sm-12 col-md-4" id="cities-container">
                            <label>Select City</label>
                            <select className="dropdown" data-settings="{&quot;cutOff&quot;: 3}" id="cities" onChange={event => {
                                props.search('city', event.target.value);
                            }} value={props.filters.city}>
                                <option value="">All Cities</option>
                                {
                                    locations.map(location => {
                                        return (
                                            <option key={location} value={location}>{location}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-6 col-md-3 margin-bottom">
                            <label>Check In</label>
                            <span id="label-checkin" data-text="Check In"></span>
                            <input className="form-control" type="date" name="checkin" id="checkin" placeholder="Check In" onChange={props.search} />
                        </div>
                        <div className="col-sm-6 col-md-3 margin-bottom">
                            <label>Check Out</label>
                            <span id="label-checkout" data-text="Check Out"></span>
                            <input className="form-control" type="date" name="checkout" id="checkout" placeholder="Check Out" onChange={props.search} />
                        </div>
                        <div className="col-sm-6 col-md-1 margin-bottom">
                            <label>Beds</label>
                            <span id="label-beds" data-text="Bedrooms"></span>
                            <input className="form-control" type="number" name="beds" id="beds" placeholder="1" onChange={event => {
                                let num = (event.target.value < 1) ? 1 : event.target.value;
                                props.search('beds', num);
                            }
                            } value={props.filters.beds} />
                        </div>
                        <div className="col-sm-6 col-md-1 margin-bottom">
                            <label>Baths</label>
                            <span id="label-baths" data-text="Bathrooms"></span>
                            <input className="form-control" type="number" name="baths" id="baths" placeholder="1" onChange={event => {
                                let num = (event.target.value < 1) ? 1 : event.target.value;
                                props.search('baths', num);
                            }
                            } value={props.filters.baths} />
                        </div>
                    </div>
                    <div className="row filter hide-filter hidden-xs hidden-sm" id="filters">
                    </div>
                    <div className="margin-div footer">
                        <Link to="/browse" type="button" className="btn btn-default search-button" id="find-rental">Find Rental</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Search;