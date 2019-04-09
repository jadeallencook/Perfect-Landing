import React from 'react';
import './Results.scss';
import { Link } from 'react-router-dom';
import profile from '../../services/profile';
import clean from '../../services/clean';
import rate from '../../services/rate';
import filter from '../../services/filter';

const Results = props => (
    <div className="col-md-9 col-md-push-3" id="properties-container">
        {
            Object.keys(props.properties).map(key => {
                const property = props.properties[key];
                return (filter(property, props.filters)) ? (
                    <div className="box-featured box-list" key={key}>
                        <Link to={`/property/${key}`} className="hover-effect image image-fill">
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
                            <dd><span>{property.maxsleeps['_text']}</span></dd>
                        </dl>
                    </div>
                ) : null
            })
        }
    </div>
);

export default Results;