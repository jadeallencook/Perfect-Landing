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
                        <div className="col-sm-12 col-md-12 margin-bottom" id="prop-name-search">
                            <label>Property Name</label>
                            <span id="label-checkin" data-text="Property Name"></span>
                            <input className="form-control" type="text" name="prop-name" id="prop-name" placeholder={
                                props.properties[Object.keys(props.properties)[Object.keys(props.properties).length * Math.random() << 0]].propname['_text']
                            } onChange={event => props.search('name', event.target.value)} value={props.filters.name} />
                        </div>
                        <div className="col-sm-12 col-md-3" id="cities-container">
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
                            <input className="form-control" type="date" name="checkin" id="checkin" placeholder="Check In" onChange={event => props.search('checkin', event.target.value)} value={props.filters.checkin} />
                        </div>
                        <div className="col-sm-6 col-md-3 margin-bottom">
                            <label>Check Out</label>
                            <span id="label-checkout" data-text="Check Out"></span>
                            <input className="form-control" type="date" name="checkout" id="checkout" placeholder="Check Out" onChange={event => props.search('checkout', event.target.value)} value={props.filters.checkout} />
                        </div>
                        <div className="col-sm-6 col-md-3 margin-bottom">
                            <label>Guests</label>
                            <span id="label-beds" data-text="Bedrooms"></span>
                            <select 
                            className="form-control"
                            onChange={event => {
                                let num = (event.target.value < 1) ? 1 : event.target.value;
                                props.search('beds', num);
                            }}
                            defaultValue={props.filters.baths}>
                                {
                                    [{
                                        text: '1-4',
                                        value: 1
                                    }, {
                                        text: '5-8',
                                        value: 5
                                    }, {
                                        text: '9-12',
                                        value: 9
                                    }, {
                                        text: '13+',
                                        value: 13
                                    }].map(object => {
                                        return <option key={object.text} value={object.value}>{object.text} Guests</option>
                                    })
                                }
                            </select>
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