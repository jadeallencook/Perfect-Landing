import React, { Component } from 'react';
import './Featured.scss';
import { Link } from 'react-router-dom';
import rate from '../../services/rate';
import clean from '../../services/clean';
import profile from '../../services/profile';

class Featured extends Component {
    constructor(props) {
        super(props);
        const keys = Object.keys(this.props.properties);
        let array = [];
        for (let x = 0; x < 3; x++) {
            let key = keys[Math.round(Math.random() * keys.length)];
            array.push(key);
        }
        this.state = {
            num: 0,
            random: array,
            featured: (this.props.featured) ? this.props.featured : []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            featured: [...props.featured]
        });
    }

    render() {
        return (
            <section id="recent-list" className="Featured">
                <div className="section-detail">
                    <h1>
                        <span>Check Out Our </span>
                        <span id="spinner-show">
                            <em className="current">Featured</em>
                        </span>
                        <span> Properties</span>
                    </h1>
                    <h2>Book One Of These Unique Rentals In Northern Michigan</h2>
                </div>
                <div className="container">
                    <div className="list-box-title">
                        <span><i className="icon fa fa-plus-square"></i>Featured Properties</span>
                    </div>
                    <div className="row" id="featured-list">
                        {
                            (this.state.featured.length) ? this.state.featured.map((propid, x) => {
                                const property = (this.props.properties[propid]) ? this.props.properties[propid] : this.props.properties[Object.keys(this.props.properties)[x]];
                                if (property) {
                                    return (
                                        <div className="col-md-4" key={propid}>
                                            <div className="box-featured box-home">
                                                <Link to={`/property/${propid}`} className="hover-effect image image-fill">
                                                    <span className="cover"></span>
                                                    <img alt={property.shortdesc['_text']} src={property.htppostdir['_text'] + profile(property.photos['_text'])} />
                                                    <h3 className="title">{property.propname['_text']}</h3>
                                                </Link>
                                                <span className="price">{rate(property.grppgsum['_text'])}</span>
                                                <span className="address">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>{property.city['_text']}</span>
                                                </span>
                                                <span className="description">{clean(property.longdesc['_text'])}</span>
                                                <dl className="detail">
                                                    <dt className="status">Sleeps:</dt>
                                                    <dd><span>{property.maxpersons['_text']}</span></dd>
                                                    <dt className="bed">Bedrooms:</dt>
                                                    <dd><span>{property.numbedrms['_text']}</span></dd>
                                                    <dt className="bath">Bathrooms:</dt>
                                                    <dd><span>{property.numbaths['_text']}</span></dd>
                                                    <dt className="area">Minimum Stay:</dt>
                                                    <dd><span>{property.minnights['_text']}</span></dd>
                                                </dl>
                                                <div className="footer">
                                                    <Link to={`/property/${propid}`} className="btn btn-reverse">Read now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            }) : (<div className="col-md-12"><p>Loading...</p></div>)
                        }
                    </div>
                    <div className="list-box-title">
                        <span><i className="icon fa fa-plus-square"></i>Other Listings</span>
                    </div>
                    <div className="row" id="recent-list">
                        {
                            this.state.random.map(propid => {
                                const property = this.props.properties[propid];
                                if (property) {
                                    let image = property.photos['_text'].split('|')[0];
                                    image = property.htppostdir['_text'] + image;
                                    return (
                                        <div className="col-md-4" key={propid}>
                                            <div className="box-featured box-home">
                                                <Link to={`/property/${propid}`} className="hover-effect image image-fill">
                                                    <span className="cover"></span>
                                                    <img alt={property.shortdesc['_text']} src={image} />
                                                    <h3 className="title">{property.propname['_text']}</h3>
                                                </Link>
                                                <span className="price">{rate(property.grppgsum['_text'])}</span>
                                                <span className="address">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>{property.city['_text']}</span>
                                                </span>
                                                <span className="description">{clean(property.longdesc['_text'])}</span>
                                                <dl className="detail">
                                                    <dt className="status">Sleeps:</dt>
                                                    <dd><span>{property.maxpersons['_text']}</span></dd>
                                                    <dt className="bed">Bedrooms:</dt>
                                                    <dd><span>{property.numbedrms['_text']}</span></dd>
                                                    <dt className="bath">Bathrooms:</dt>
                                                    <dd><span>{property.numbaths['_text']}</span></dd>
                                                    <dt className="area">Minimum Stay:</dt>
                                                    <dd><span>{property.minnights['_text']}</span></dd>
                                                </dl>
                                                <div className="footer">
                                                    <Link to={`/property/${propid}`} className="btn btn-reverse">Read now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Featured;
