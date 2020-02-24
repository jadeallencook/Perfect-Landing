import React from 'react';
import './Results.scss';
import { Link } from 'react-router-dom';
import profile from '../../services/profile';
import clean from '../../services/clean';
import rate from '../../services/rate';
import filter from '../../services/filter';

const Results = props => {
    const properties = Object.keys(props.properties).reduce((accumulator, key) => {
        if (filter(
            props.properties[key],
            props.filters,
            props.calendars[key],
            props.calendars['start']
        )) {
            let property = props.properties[key];
            property.key = key;
            accumulator.push(property);
        }
        return accumulator;
    }, []);
    return (
        <div className="col-md-9 col-md-push-3 Results" id="properties-container">
            <h3>
                <b>
                    {(properties.length > 0) ? properties.length : null}
                    {(properties.length > 1) ? ' Results' : (properties.length === 0) ? 'No Results' : ' Result'}
                </b>
            </h3>
            {
                properties.map(property => {
                    const calendar = props.calendars[property.key];
                    return (filter(property, props.filters, calendar, props.calendars['start'])) ? (
                        <div className="box-featured box-list" key={property.key}>
                            <Link to={`/property/${property.key}`} className="hover-effect image image-fill">
                                <span className="cover"></span>
                                <img src={property.htppostdir['_text'] + profile(property.photos['_text'])} alt={`${property.propname['_text']}`} />
                                <h3 className="title">{property.propname['_text']}</h3>
                            </Link>
                            <span className="price">{rate(property.grppgsum['_text'])}</span>
                            <span className="address"><i className="fa fa-map-marker"></i> {property.city['_text']}</span>
                            <span className="description">{clean(property.longdesc['_text'])}</span>
                            <dl className="detail">
                                <dt className="area">Nights:</dt>
                                <dd><span>{property.minnights['_text']}</span></dd>
                                <dt className="bed">Beds:</dt>
                                <dd><span>{property.numbedrms['_text']}</span></dd>
                                <dt className="bath">Baths:</dt>
                                <dd><span>{property.numbaths['_text']}</span></dd>
                                <dt className="status">Sleeps:</dt>
                                <dd><span>{property.maxpersons['_text']}</span></dd>
                            </dl>
                        </div>
                    ) : null
                })
            }
        </div>)
}

export default Results;