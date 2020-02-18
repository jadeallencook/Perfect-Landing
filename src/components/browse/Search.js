import React from 'react';
import './Search.scss';
import locations from '../../information/locations';
import filters from '../../information/filters';

const Search = props => (
    <div className="col-md-3 col-md-pull-9">
        <div className="section-title line-style">
            <h3 className="title">Search Options</h3>
        </div>
        <div className="right-box">
            <div className="row">
                <input type="hidden" id="back" value="true" />
                <input type="hidden" id="browse-page" value="true" />
                <div className="col-md-12 space-div">
                    <input className="form-control" type="text" name="prop-name" id="prop-name" placeholder="Property Name" defaultValue={props.filters.name} />
                </div>
                <div className="col-md-12 space-div" id="cities-dropdown">
                    <select className="dropdown" id="cities" defaultValue={props.filters.city}>
                        <option value="">-- All Cities --</option>
                        {
                            locations.map(location => <option value={location} key={location}>{location}</option>)
                        }
                    </select>
                </div>
                <div className="col-md-12 space-div">
                    <label>Sleeps</label>
                    <select 
                            className="form-control"
                            id="bedroom"
                            defaultValue={props.filters.beds || 1}>
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
                <div className="col-md-12 space-div">
                    <label>Check In</label>
                    <input className="form-control" type="date" name="checkin" id="checkin" placeholder="Check In" defaultValue={props.filters.checkin} />
                </div>
                <div className="col-md-12 space-div">
                    <label>Check Out</label>
                    <input className="form-control" type="date" name="checkout" id="checkout" placeholder="Check Out" defaultValue={props.filters.checkout} />
                    <button type="button" className="btn btn-default search-button" onClick={() => {
                        let name = document.querySelector('input#prop-name');
                        let bedroom = document.querySelector('select#bedroom'); 
                        let bathroom = document.querySelector('input#bathroom'); 
                        let checkin = document.querySelector('input#checkin'); 
                        let checkout = document.querySelector('input#checkout'); 
                        let city = document.querySelector('select#cities'); 
                        props.search('name', name ? name.value : '');
                        props.search('beds', bedroom ? Number(bedroom.value) : null);
                        props.search('baths', bathroom ? Number(bathroom.value) : null);
                        props.search('checkin', checkin ? checkin.value : null);
                        props.search('checkout', checkout ? checkout.value : null);
                        props.search('city', city ? city.value : null);
                    }}>APPLY FILTERS</button>
                </div>
            </div>
        </div>
        <div className="section-title line-style no-margin">
            <h3 className="title">Filters</h3>
        </div>
        <div id="filter-box">
            {
                filters.map(filter => {
                    return <div className="filter" key={filter} data-value={filter} onClick={event => {
                        const filter = event.target.getAttribute('data-value');
                        let amenities = (props.filters.amenities.length > 0) ? props.filters.amenities : [];
                        amenities = (amenities.indexOf(filter) === -1) ? [...amenities, filter] : amenities.filter(amenity => (amenity !== filter) ? true : false);
                        props.search('amenities', amenities);
                    }} style={(props.filters.amenities.indexOf(filter) === -1) ? {
                        opacity: '0.75'
                    } : {
                            opacity: '1'
                        }
                    }>{filter}</div>
                })
            }
        </div>
        <small><b><i>Click Filter To Apply</i></b></small>
    </div>
);

export default Search;