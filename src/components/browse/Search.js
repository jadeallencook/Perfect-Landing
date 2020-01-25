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
                <div className="col-md-6 space-div">
                    <label>Beds</label>
                    <input min="1" max="10" className="form-control" type="number" name="bedroom" id="bedroom" placeholder="1" defaultValue={props.filters.beds} />
                </div>
                <div className="col-md-6 space-div">
                    <label>Baths</label>
                    <input min="1" max="10" className="form-control" type="number" name="bathroom" id="bathroom" placeholder="1" defaultValue={props.filters.baths} />
                </div>
                <div className="col-md-12 space-div">
                    <label>Check In</label>
                    <input className="form-control" type="date" name="checkin" id="checkin" placeholder="Check In" defaultValue={props.filters.checkin} />
                </div>
                <div className="col-md-12 space-div">
                    <label>Check Out</label>
                    <input className="form-control" type="date" name="checkout" id="checkout" placeholder="Check Out" defaultValue={props.filters.checkout} />
                    <button type="button" className="btn btn-default search-button" onClick={() => {
                        let name = document.getElementById('prop-name').value;
                        let bedroom = document.getElementById('bedroom').value; 
                        let bathroom = document.getElementById('bathroom').value; 
                        let checkin = document.getElementById('checkin').value; 
                        let checkout = document.getElementById('checkout').value; 
                        let city = document.getElementById('cities').value; 
                        bedroom = bedroom < 1 ? 1 : parseInt(bedroom);
                        bathroom = bathroom < 1 ? 1 : parseInt(bathroom);
                        props.search('name', name);
                        props.search('bedroom', bedroom);
                        props.search('bathroom', bathroom);
                        props.search('checkin', checkin);
                        props.search('checkout', checkout);
                        props.search('city', city);
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